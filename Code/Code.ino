#include <SPI.h>
#include <MFRC522.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <TinyGPS++.h>
#include <HTTPClient.h>
#include <HardwareSerial.h>
#include <WiFi.h>
#include <deque>

#define SS_PIN   5
#define RST_PIN  22
#define BUZZER_PIN 2
#define LED_PIN  13

MFRC522 mfrc522(SS_PIN, RST_PIN);

#define I2C_ADDR 0x27
#define LCD_COLS 16
#define LCD_ROWS 2

LiquidCrystal_I2C lcd(I2C_ADDR, LCD_COLS, LCD_ROWS);

TinyGPSPlus gps;
HardwareSerial gpsSerial(1);

const char* ssid = "AST";
const char* password = "34567890";

bool cardAlreadyRead = false;
struct RFIDData {
  String tagUID;
  String gpsLocation;
  float latitude;
  float longitude;
};

std::deque<RFIDData> requestQueue;
bool retryMessageDisplayed = false;
unsigned long retryInterval = 1000;
const unsigned long maxRetryInterval = 60000;
unsigned long lastRetryTime = 0;

void setup() {
  SPI.begin();
  mfrc522.PCD_Init();

  Wire.begin(21, 22);
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("RFID Reader Init");

  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);

  ledcSetup(0, 1000, 8);
  ledcAttachPin(BUZZER_PIN, 0);

  gpsSerial.begin(9600, SERIAL_8N1, 16, 17);

  connectToWiFi();
  waitForGPSFix();
}

void updateLED() {
  if (WiFi.status() == WL_CONNECTED && gps.location.isValid()) {
    digitalWrite(LED_PIN, HIGH);
  } else {
    digitalWrite(LED_PIN, LOW);
  }
}

void connectToWiFi() {
  lcd.clear();
  lcd.setCursor(3, 0);
  lcd.print("Connecting");
  lcd.setCursor(4, 1);
  lcd.print("WiFi....");

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    ledcWriteTone(0, 1000);
    delay(250);
    ledcWriteTone(0, 0);
    delay(250);

    if (WiFi.status() == WL_CONNECT_FAILED) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("WiFi Connect");
      lcd.setCursor(0, 1);
      lcd.print("Failed!");
      delay(2000);
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Retrying...");
      WiFi.begin(ssid, password);
    }
  }

  lcd.clear();
  lcd.setCursor(1, 0);
  lcd.print("WiFi Connected");
  delay(2000);
  lcd.clear();
  lcd.setCursor(1, 0);
  lcd.print("Scan Next Card");

  updateLED();
}

void waitForGPSFix() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Searching GPS...");

  while (!gps.location.isValid()) {
    while (gpsSerial.available() > 0) {
      gps.encode(gpsSerial.read());
    }
    delay(500);
  }

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("GPS is connected");
  delay(2000);
  lcd.clear();
  lcd.setCursor(1, 0);
  lcd.print("Scan Next Card");

  updateLED();

}
void loop() {
  while (gpsSerial.available() > 0) {
    gps.encode(gpsSerial.read());
  }

  if (!cardAlreadyRead && mfrc522.PICC_IsNewCardPresent()) {
    if (mfrc522.PICC_ReadCardSerial()) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Tag UID: ");
      String tagUID = "";
      for (byte i = 0; i < mfrc522.uid.size; i++) {
        lcd.print(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
        lcd.print(mfrc522.uid.uidByte[i], HEX);
        tagUID += String(mfrc522.uid.uidByte[i], HEX);
      }

      String gpsLocation = "";
      float latitude = 0.0;
      float longitude = 0.0;
      if (gps.location.isValid()) {
        latitude = gps.location.lat();
        longitude = gps.location.lng();
        gpsLocation = "Lat: " + String(latitude, 6) + " Lon: " + String(longitude, 6);
      } else {
        gpsLocation = "Location Invalid";
      }

      lcd.setCursor(0, 1);
      lcd.print(gpsLocation.substring(0, 16));

      RFIDData newData = { tagUID, gpsLocation, latitude, longitude };
      requestQueue.push_back(newData);

      lcd.clear();
      lcd.setCursor(3, 0);
      lcd.print("Thank You!");
      lcd.setCursor(1, 1);
      lcd.print("Scan Next Card");

      cardAlreadyRead = true;
    }
  }

  if (cardAlreadyRead && !mfrc522.PICC_IsNewCardPresent()) {
    cardAlreadyRead = false;
    lcd.clear();
    lcd.setCursor(3, 0);
    lcd.print("Thank You!");
  }

  if (WiFi.status() != WL_CONNECTED) {
    connectToWiFi();
  }

  if (!requestQueue.empty() && WiFi.status() == WL_CONNECTED) {
    unsigned long currentTime = millis();
    if (currentTime - lastRetryTime >= retryInterval) {
      RFIDData data = requestQueue.front();
      HTTPClient http;
      http.begin("https://webhook.site/025d7081-f9e0-4f53-9746-f780514e4a6f");
      http.addHeader("Content-Type", "application/json");

      String jsonPayload = "{\"TagUID\":\"" + data.tagUID + "\",\"Latitude\":\"" + String(data.latitude, 6) + "\",\"Longitude\":\"" + String(data.longitude, 6) + "\",\"Vehicle_ID\":\"" + String("ND-8740") + "\"}";
      int httpResponseCode = http.POST(jsonPayload);

      if (httpResponseCode == 200) {
        ledcWriteTone(0, 1000);
        delay(300);
        ledcWriteTone(0, 0);
        requestQueue.pop_front();
        retryMessageDisplayed = false;
        retryInterval = 1000;
        lcd.clear();
        lcd.setCursor(1, 0);
        lcd.print("Scan Next Card");
      } else {
        if (httpResponseCode == 429) {
          retryInterval = min(retryInterval * 2, maxRetryInterval);
        }

        if (!retryMessageDisplayed) {
          lcd.clear();
          lcd.setCursor(4, 0);
          lcd.print("Retry");
          retryMessageDisplayed = true;
        }
      }

      http.end();
      lastRetryTime = currentTime;
    }
  }
}
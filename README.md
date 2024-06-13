# Journey-Flex

<H1>RFID and GPS Tracking System</H1>

This project uses an RFID reader, GPS module, and WiFi to track the location of scanned RFID tags. The system displays information on an LCD and sends data to a specified server.

<H3>Components Used</H3>
<ul>
  <li>RFID Reader (MFRC522)</li>
  <li>GPS Module (TinyGPS++)</li>
  <li>LCD Display (LiquidCrystal_I2C)</li>
  <li>ESP32 Development Board</li>
  <li>Buzzer</li>
  <li>LED</li>
  <li>WiFi connection</li>
</ul>

<H3>Libraries Required</H3>
Ensure you have the following Arduino libraries installed:
<ul>
  <li>`SPI`</li>
  <li>`MFRC522`</li>
  <li>`Wire`</li>
  <li>`LiquidCrystal_I2C`</li>
  <li>`TinyGPS++`</li>
  <li>`HTTPClient`</li>
  <li>`WiFi`</li>
  <li>`deque`</li>
</ul>

<H3>Setup Instructions</H3>
<H4>1. Connections</H4>

![Picture1](https://github.com/codEvent-23/Journey-Flex/assets/123743742/cdda4526-ec59-4152-827c-250961465d90)

![Picture2](https://github.com/codEvent-23/Journey-Flex/assets/123743742/927f004d-4df2-403f-921f-2e6a81a92fc9)

![Picture3](https://github.com/codEvent-23/Journey-Flex/assets/123743742/4bfbce30-d873-4759-8a9b-ea1565409ab4)

<H4>2. Code Configuration</H4>
<H5>2.1 WiFi Credentials</H5>
Set your WiFi SSID and password:

const char* ssid = "Your_SSID";
const char* password = "Your_PASSWORD";


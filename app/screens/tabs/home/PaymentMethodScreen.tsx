import {Image, SafeAreaView, Text, TouchableOpacity, View, Alert} from "react-native";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import PayHere from '@payhere/payhere-mobilesdk-reactnative';
import SCREENS from "../../index";

const PaymentMethodScreen = () => {
    const navigation = useNavigation();

    function handleCardPayment() {
        if (!PayHere) {
            console.error('PayHere is not defined');
            return;
        }

        const paymentObject = {
            "sandbox": true,
            "merchant_id": "1227731",
            "notify_url": "http://sample.com/notify",
            "order_id": "ItemNo12345",
            "items": "Hello from React Native!",
            "amount": "50.00",
            "currency": "LKR",
            "first_name": "Saman",
            "last_name": "Perera",
            "email": "samanp@gmail.com",
            "phone": "0771234567",
            "address": "No.1, Galle Road",
            "city": "Colombo",
            "country": "Sri Lanka",
            "delivery_address": "No. 46, Galle road, Kalutara South",
            "delivery_city": "Kalutara",
            "delivery_country": "Sri Lanka",
            "custom_1": "",
            "custom_2": ""
        };

        PayHere.startPayment(
            paymentObject,
            (paymentId) => {
                console.log("Payment Completed", paymentId);
            },
            (errorData) => {
                Alert.alert("PayHere Error", errorData);
            },
            () => {
                console.log("Payment Dismissed");
            }
        );
    }

    return (
        <SafeAreaView className='flex-1 bg-background px-8'>
            <View className='mt-8'>
                <TouchableOpacity
                    className='flex flex-row w-full h-16 justify-between items-center bg-gray-200 rounded-2xl px-8 mb-6'
                    onPress={handleCardPayment}
                >
                    <Text className='text-lg'>Debit / Credit card</Text>
                    <Image source={require('../../../../assets/images/payment-debit-card.png')}/>
                </TouchableOpacity>
                <TouchableOpacity className='flex flex-row w-full h-16 justify-between items-center bg-gray-200 rounded-2xl px-8 mb-6'>
                    <Text className='text-lg'>Internet Banking</Text>
                    <Image source={require('../../../../assets/images/payment-internet-banking.png')}/>
                </TouchableOpacity>
                <TouchableOpacity className='flex flex-row w-full h-16 justify-between items-center bg-gray-200 rounded-2xl px-8 mb-6'>
                    <Text className='text-lg'>Google Pay</Text>
                    <Image source={require('../../../../assets/images/payment-google-pay.png')}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default PaymentMethodScreen;

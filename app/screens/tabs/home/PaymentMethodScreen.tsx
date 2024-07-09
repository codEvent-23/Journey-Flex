import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import SCREENS from "../../index";

const PaymentMethodScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    function handleCardPayment() {
        navigation.navigate(SCREENS.CARDPAYMENT);
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

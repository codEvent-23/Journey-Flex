import {Image, SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, Alert} from "react-native";
import React, {useState} from "react";
import {Picker} from "@react-native-picker/picker";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import {useUser} from "../../../context/UserContext";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import SCREENS from "../../index";

const CardPaymentScreen = () => {
    const [cardType, setCardType] = useState<string | null>(null);
    const [cardNumber, setCardNumber] = useState('');
    const [cvn, setCVN] = useState('');
    const [amount, setAmount] = useState<number | null>(null);
    const [expirationMonth, setExpirationMonth] = useState('');
    const [expirationYear, setExpirationYear] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {refreshUserData} = useUser();

    const validateInputs = () => {
        if (!cardType) {
            Alert.alert('Validation Error', 'Please select a card type.');
            return false;
        }
        if (!cardNumber || cardNumber.length !== 16) {
            Alert.alert('Validation Error', 'Please enter a valid 16-digit card number.');
            return false;
        }
        if (!cvn || cvn.length !== 3) {
            Alert.alert('Validation Error', 'Please enter a valid 3-digit CVN.');
            return false;
        }
        if (!expirationMonth || !expirationYear) {
            Alert.alert('Validation Error', 'Please select a valid expiration date.');
            return false;
        }
        if (!amount || amount <= 0) {
            Alert.alert('Validation Error', 'Please enter a valid amount.');
            return false;
        }
        return true;
    };

    const user = auth().currentUser;

    const handlePayment = async () => {
        if (!validateInputs()) {
            return;
        }

        try {
            const userQuerySnapshot = await firestore()
                .collection("users")
                .where("userId", "==", user?.uid)
                .get();

            if (!userQuerySnapshot.empty) {
                const userDoc = userQuerySnapshot.docs[0];
                const userData = userDoc.data();

                const newTopUpBalance = userData.topUpBalance + (amount || 0);

                await firestore()
                    .collection("users")
                    .doc(userDoc.id)
                    .update({
                        topUpBalance: newTopUpBalance
                    });

                await firestore()
                    .collection("payments")
                    .add({
                        amount: amount,
                        cardNumber: cardNumber,
                        cvn: cvn,
                        expirationMonth: expirationMonth,
                        expirationYear: expirationYear,
                        userId: user?.uid
                    })
                refreshUserData();

                Alert.alert('Payment Successful', `Rs.${amount} have added to your account.`);
                navigation.navigate(SCREENS.TABS)
            } else {
                console.log('No user found with this userId');
                Alert.alert('Payment Failed', 'User not found.');
            }
            Alert.alert('Payment Successful');
        }catch (err){
            console.log('Error saving payment :', err);
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-background px-8'>
            <View className='mt-8'>
                <Text className='text-lg font-semibold mb-4'>Card Type *</Text>
                <View className='flex-row justify-between mb-4'>
                    <TouchableOpacity
                        className={`flex flex-row items-center p-2 border ${cardType === 'Visa' ? 'border-primary' : 'border-gray-300'} rounded mr-2`}
                        onPress={() => setCardType('Visa')}
                    >
                        <Image source={require('../../../../assets/images/payment-visa.png')}/>
                        <Text className={`ml-2 ${cardType === 'Visa' ? 'text-primary' : ''}`}>Visa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`flex flex-row items-center p-2 border ${cardType === 'MasterCard' ? 'border-primary' : 'border-gray-300'} rounded`}
                        onPress={() => setCardType('MasterCard')}
                    >
                        <Image source={require('../../../../assets/images/payment-mastercard.png')}/>
                        <Text className={`ml-2 ${cardType === 'MasterCard' ? 'text-primary' : ''}`}>MasterCard</Text>
                    </TouchableOpacity>
                </View>

                <Text className='text-lg font-semibold mb-2'>Card Number *</Text>
                <TextInput
                    className='border border-gray-300 rounded p-2 mb-4'
                    placeholder="Card Number"
                    keyboardType="numeric"
                    onChangeText={setCardNumber}
                />

                <View className='flex-row justify-between mb-4'>
                    <View className='flex-1 mr-2'>
                        <Text className='text-lg font-semibold mb-2'>Expiration Month *</Text>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={expirationMonth}
                                onValueChange={(itemValue) => setExpirationMonth(itemValue)}
                            >
                                <Picker.Item label="Month" value="" />
                                {[...Array(12)].map((_, index) => (
                                    <Picker.Item key={index} label={`${index + 1}`} value={`${index + 1}`} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View className='flex-1 ml-2'>
                        <Text className='text-lg font-semibold mb-2'>Expiration Year *</Text>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={expirationYear}
                                onValueChange={(itemValue) => setExpirationYear(itemValue)}
                                className='border border-gray-300 rounded p-2'
                            >
                                <Picker.Item label="Year" value="" />
                                {[...Array(10)].map((_, index) => (
                                    <Picker.Item key={index} label={`${new Date().getFullYear() + index}`} value={`${new Date().getFullYear() + index}`} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>

                <Text className='text-lg font-semibold mb-2'>CVN *</Text>
                <TextInput
                    className='border border-gray-300 rounded p-2 mb-4'
                    placeholder="CVN"
                    keyboardType="numeric"
                    onChangeText={setCVN}
                />

                <Text className='text-lg font-semibold mb-4'>Your Subscription</Text>
                <View className='flex-row justify-between items-center border-t border-b border-gray-300 py-4'>
                    <Text className='text-lg'>Total amount</Text>
                    <TextInput
                        className='border border-gray-300 rounded p-2 w-1/2'
                        placeholder='Amount'
                        keyboardType='numeric'
                        onChangeText={(text) => setAmount(parseFloat(text))}
                    />
                </View>

                <TouchableOpacity className='bg-blue-500 rounded p-4 mt-4' onPress={handlePayment}>
                    <Text className='text-center text-white text-lg font-semibold'>Confirm Payment</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    picker: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: '#d5d5d5',
    },
});

export default CardPaymentScreen;

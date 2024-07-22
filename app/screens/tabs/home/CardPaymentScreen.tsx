import {Image, SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import React, {useState} from "react";
import {Picker} from "@react-native-picker/picker";

const CardPaymentScreen = () => {
    const [cardType, setCardType] = useState<string | null>(null);
    const [expirationMonth, setExpirationMonth] = useState('');
    const [expirationYear, setExpirationYear] = useState('');

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
                <TextInput className='border border-gray-300 rounded p-2 mb-4' placeholder="Card Number" keyboardType="numeric" />

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
                <TextInput className='border border-gray-300 rounded p-2 mb-4' placeholder="CVN" keyboardType="numeric" />

                <Text className='text-lg font-semibold mb-4'>Your Subscription</Text>
                <View className='flex-row justify-between items-center border-t border-b border-gray-300 py-4'>
                    <Text className='text-lg'>Total amount</Text>
                    <Text className='text-lg font-bold'>4000.00 RS</Text>
                </View>

                <TouchableOpacity className='bg-blue-500 rounded p-4 mt-4'>
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

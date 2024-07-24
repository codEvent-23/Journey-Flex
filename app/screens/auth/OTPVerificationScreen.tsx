import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import NextButton from "../../components/NextButton";
import OTPTextInput from "react-native-otp-textinput";
import React, { useState, useEffect, useRef } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const OTPVerificationScreen = () => {

    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
    const [code, setCode] = useState<string>("");
    const [timer, setTimer] = useState<number>(30);
    const otpInput = useRef(null);

    const signInWithPhoneNumber = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber("+94" + phoneNumber);
            setConfirm(confirmation);
            setTimer(30); // Reset timer
        } catch (error) {
            console.log("Error sending code: ", error);
        }
    };

    const confirmCode = async () => {
        try {
            const userCredential = await confirm?.confirm(code);
            const user = userCredential?.user;

            // const userQuerySnapshot = await firestore()
            //     .collection('users')
            //     .where('phoneNumber', '==', phoneNumber)
            //     .get();
            // if (!userQuerySnapshot.empty) {
            //     const userDoc = userQuerySnapshot.docs[0];
            //     console.log('User data:', userDoc.data());
            //
            //     // if (userDoc.exists) {
            //     //     /* User is existing, navigate to Dashboard*/
            //     //     navigation.navigate(SCREENS.TABS);
            //     // } else {
            //     //     /* User is new, navigate to Details Page*/
            //     //     navigation.navigate(SCREENS.PROFILECREATION, {phoneNumber: phoneNumber});
            //     // }
            // } else {
            //     console.log('No user found with this phone number');
            //     return null;
            // }

        } catch (error) {
            console.log("Invalid Code.", error);
        }
    }

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-background">
            {!confirm ?
                <View className="w-10/12">
                    <Text className="text-center text-2xl mb-8">Enter your mobile number</Text>
                    <View className="flex-row items-center border border-primary bg-[#1877F21A] rounded p-2 mb-6">
                        <Image
                            source={require('../../../assets/images/flag.png')}
                            className="w-8 h-8 mr-2"
                        />
                        <Text className="text-lg">+94</Text>
                        <TextInput
                            placeholder="Your number"
                            keyboardType="phone-pad"
                            className="flex-1 ml-2"
                            value={phoneNumber}
                            onChangeText={(text) => setPhoneNumber(text)}
                        />
                    </View>
                    <View className="flex-row justify-center items-center mb-6">
                        <Image
                            source={require('../../../assets/images/policy.png')}
                            className="w-6 h-6 mr-2"
                        />
                        <View>
                            <Text className="text-xs text-gray-500">This site is protected by CodeEvent and Google's</Text>
                            <View className='flex-row'>
                                <TouchableOpacity>
                                    <Text className="text-xs text-blue-500"> Privacy Policy </Text>
                                </TouchableOpacity>
                                <Text className="text-xs text-gray-500">and</Text>
                                <TouchableOpacity>
                                    <Text className="text-xs text-blue-500"> Terms and Conditions</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <NextButton title='Next' handler={signInWithPhoneNumber} />
                </View>
                :
                <View className="w-10/12">
                    <Text className="text-center text-2xl mb-8">Verify Your Number</Text>
                    <View className='shadow-lg rounded-lg flex-row items-center mb-6 justify-center pt-4'>
                        <View className="flex-row justify-between">
                            <OTPTextInput
                                ref={otpInput}
                                inputCount={6}
                                handleTextChange={(text) => setCode(text)}
                                containerStyle={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}
                                textInputStyle={styles.inputStyle}
                                tintColor='#1877F2'
                            />
                        </View>
                    </View>
                    <Text className='text-center mb-6 px-16'>Please enter the code we sent to your phone</Text>
                    <Text className='text-center mb-6 px-16'>{timer > 0 ? `Resend code in ${timer}s` : 'You can now resend the code'}</Text>
                    {timer === 0 && (
                        <TouchableOpacity onPress={signInWithPhoneNumber}>
                            <Text className="text-center text-blue-500 mt-4">Resend Code</Text>
                        </TouchableOpacity>
                    )}
                    <NextButton title='Next' handler={confirmCode} />
                    <TouchableOpacity onPress={() => setConfirm(null)}>
                        <Text className="text-center text-blue-500 mt-4">Back</Text>
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputStyle: {
        borderWidth: 1,
        borderRadius: 8,
        width: 40,
        height: 40,
        fontSize: 18,
        textAlign: 'center'
    },
});

export default OTPVerificationScreen;

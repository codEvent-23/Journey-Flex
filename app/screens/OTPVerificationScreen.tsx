import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import NextButton from "../components/NextButton";
import OTPTextInput from "react-native-otp-textinput";
import {useRef, useState} from "react";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

const OTPVerificationScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [confirm, setConfirm] = useState(false);
    const [code, setCode] = useState('');
    const otpInput = useRef(null);

    function handleMobileNumberSubmit() {
        setConfirm(true);
    }

    function handleVerifyCodeSubmit() {
        console.log(code);
        navigation.navigate('ProfileCreationScreen');
    }

    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-white">
            {!confirm ?
                <View className="w-10/12">
                    <Text className="text-center text-2xl mb-8">Enter your mobile number</Text>
                    <View className="flex-row items-center border border-primary bg-[#1877F21A] rounded p-2 mb-6">
                        <Image
                            source={require('../../assets/flag.png')}
                            className="w-8 h-8 mr-2"
                        />
                        <Text className="text-lg">+94</Text>
                        <TextInput
                            placeholder="Your number"
                            keyboardType="phone-pad"
                            className="flex-1 ml-2"
                        />
                    </View>
                    <View className="flex-row justify-center items-center mb-6">
                        <Image
                            source={require('../../assets/policy.png')}
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
                    <NextButton title='Next' handler={handleMobileNumberSubmit}/>
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
                    <NextButton title='Next' handler={handleVerifyCodeSubmit}/>
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

import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import NextButton from "../components/NextButton";

const OTPVerificationScreen = () => {

    function handleMobileNumberSubmit() {

    }

    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-white">
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
        </SafeAreaView>
    );
}

export default OTPVerificationScreen;

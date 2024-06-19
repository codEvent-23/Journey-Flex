import React, { useState } from "react";
import {View, Image, Text, TouchableOpacity, SafeAreaView} from "react-native";

const EmailConfirmationScreen = () => {
    const [email, setEmail] = useState('email@gmail.com');

    return (
        <SafeAreaView className="flex-1 bg-white px-5 py-12">
            <View className="items-center my-16">
                <Image
                    source={require('../../assets/images/email.png')}
                    className="w-64 h-48 mr-2"
                    resizeMode="contain"
                />
            </View>
            <View className="items-center">
                <Text className="text-4xl text-center text-primary font-bold mb-4">Confirm your E-mail</Text>
                <Text className="text-base text-gray-500 mb-3 text-center px-12">We sent an email with a confirmation link to your email</Text>
                <Text className="text-lg mb-3">{email}</Text>
                <Text className="text-base text-gray-500 mb-3 text-center px-12">Check your email and click on the confirmation link to the continue</Text>
            </View>
            <View className="absolute bottom-12 w-full items-center pl-12">
                <Text className="text-base text-gray-600">Didn't get a confirmation?</Text>
                <View className="flex-row items-center">
                    <TouchableOpacity>
                        <Text className="text-base text-blue-500">Change email</Text>
                    </TouchableOpacity>
                    <Text className="text-base text-gray-600 mx-2">or</Text>
                    <TouchableOpacity>
                        <Text className="text-base text-blue-500">Resend</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default EmailConfirmationScreen;

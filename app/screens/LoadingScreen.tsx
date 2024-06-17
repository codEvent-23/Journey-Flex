import React, {useEffect} from 'react';
import { View, Image, Text } from 'react-native';
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

const LoadingScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('OTPScreen');
        }, 3000);
    }, []);

    return (
        <View className="flex-1 justify-center items-center bg-primary">
            <Image
                source={require('../../assets/favicon.png')}
                className="w-96 h-69"
                resizeMode="contain"
            />
            <Text className="absolute bottom-10 text-sm text-white">
                All rights 2024 @Journey Flex
            </Text>
        </View>
    );
};

export default LoadingScreen;

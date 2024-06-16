import React, {useEffect} from 'react';
import { View, Image, Text } from 'react-native';
import {useNavigation} from "@react-navigation/native";

const LoadingScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            // navigation.navigate('Contact');
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

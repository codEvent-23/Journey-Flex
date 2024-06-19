import React, {useEffect, useRef} from 'react';
import {Image, Text, SafeAreaView, View} from 'react-native';
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import LottieView from 'lottie-react-native';
import SCREENS from "../index";

const LoadingScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const animation = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate(SCREENS.OTP);
        }, 3000);
    }, []);

    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-primary">
            <Image
                source={require('../../../assets/images/favicon.png')}
                className="w-96 h-69"
                resizeMode="contain"
            />
            <View className='absolute bottom-28'>
                <LottieView
                    autoPlay
                    loop={true}
                    ref={animation}
                    style={{
                        width: 150,
                        height: 200,
                    }}
                    source={require('../../../assets/animations/loading-animation.json')}
                />
            </View>
            <Text className="absolute bottom-10 text-sm text-white">
                All rights 2024 @Journey Flex
            </Text>
        </SafeAreaView>
    );
};

export default LoadingScreen;

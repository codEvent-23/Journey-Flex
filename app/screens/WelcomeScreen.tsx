import {Image, SafeAreaView, Text, View} from "react-native";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useEffect} from "react";

const WelcomeScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('HomeScreen');
        }, 2000);
    }, []);

    return(
        <SafeAreaView className='flex-1 justify-center items-center bg-primary'>
            <View className='flex justify-center items-center mb-48'>
                <Image className='mb-20' source={require('../../assets/images/favicon.png')}/>
                <Text className='text-white text-5xl mb-10'>Welcome !</Text>
                <Text className='text-white text-center text-sm px-20'>Get ready to experience the Journey Flex travel solutions.</Text>
            </View>
            <Image className='absolute bottom-0' source={require('../../assets/images/welcomeScreenBg.png')}/>
        </SafeAreaView>
    )
}

export default WelcomeScreen;

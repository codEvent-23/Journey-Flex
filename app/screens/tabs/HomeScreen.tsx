import {Image, SafeAreaView, Text, View} from "react-native";
import {useState} from "react";
import ImageSlider from "../../components/ImageSlider";

const HomeScreen = () => {

    const [username, setUsername] = useState('Nimna');
    const [greet, setGreet] = useState('Good morning');

    return (
        <SafeAreaView className='w-full h-full bg-background'>
            <View className='flex-1 bg-primary px-4'>
                <View className='flex-row justify-between items-center mt-12 mb-8'>
                    <View>
                        <Text className='text-3xl text-white'>Hello {username} !</Text>
                        <Text className='text-lg text-white'>{greet}</Text>
                    </View>
                    <Image source={require('../../../assets/images/notification.png')}/>
                </View>
                <ImageSlider/>
            </View>
            <View className='flex-1 justify-center items-center bg-background'></View>
        </SafeAreaView>
    )
}

export default HomeScreen;

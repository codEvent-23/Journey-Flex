import {Image, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import auth from '@react-native-firebase/auth';

interface HomeHeader {
    username: string;
    notificationHandler: () => void;
}

const HomeHeader = (props: HomeHeader) => {

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return 'Good morning';
        } else if (currentHour < 18) {
            return 'Good afternoon';
        } else if (currentHour < 21) {
            return 'Good evening';
        } else {
            return 'Good night';
        }
    };

    const user = auth().currentUser;

    const fullName = user?.displayName || 'Sample Name';
    const username = fullName.split(' ')[0];

    return (
        <View className='flex bg-primary px-4'>
            <View className='flex-row justify-between items-center mt-12 mb-6 px-3'>
                <View>
                    <Text className='text-3xl text-white'>Hello {username} !</Text>
                    <Text className='text-lg text-white'>{getGreeting()}</Text>
                </View>
                <TouchableOpacity onPress={props.notificationHandler}>
                    <Image source={require('../../assets/images/notification.png')} className='w-8 h-8'/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeHeader;

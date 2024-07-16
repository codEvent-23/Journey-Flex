import {Image, Text, TouchableOpacity, View} from "react-native";

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

    return (
        <View className='flex bg-primary px-4'>
            <View className='flex-row justify-between items-center mt-12 mb-6 px-3'>
                <View>
                    <Text className='text-3xl text-white'>Hello {props.username} !</Text>
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

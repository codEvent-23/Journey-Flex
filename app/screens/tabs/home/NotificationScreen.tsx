import {Alert, Button, Image, SafeAreaView, ScrollView, Text, ToastAndroid, View} from "react-native";
import NotificationItem from "../../../components/NotificationItem";
import {useState} from "react";
import AppNotification from "../../../interfaces/AppNotification";

const NotificationScreen = () => {

    const [notifications, setNotifications] = useState<AppNotification[]>([]);

    return (
        <SafeAreaView className='flex-1 justify-center items-center bg-background px-8'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {notifications.length > 0 ?
                    notifications.map((notification) => (
                        <NotificationItem text={notification.text}/>
                    )) : (
                        <View className='flex-1 justify-center items-center'>
                            <Image source={require('../../../../assets/images/notification-clear.png')}/>
                            <Text className='text-xl mb-2'>You are all up to date</Text>
                            <Text className='text-md text-secondary text-center px-12'>
                                No new notifications available at the moment - come back soon to discover new offers
                            </Text>
                        </View>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default NotificationScreen;

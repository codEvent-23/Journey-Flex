import {Text, View} from "react-native";

interface NotificationItemProps{
    text: string;
}

const NotificationItem = (props:NotificationItemProps) => {

    return (
        <View className='w-full flex items-center py-4 border-b-2 border-gray-300'>
            <Text>{props.text}</Text>
        </View>
    )
}

export default NotificationItem;

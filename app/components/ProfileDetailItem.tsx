import {Image, Text, TouchableOpacity, View} from "react-native";

interface ProfileDetailItemProps {
    title: string;
    value: string;
    handler?: () => void;
}

const ProfileDetailItem = (props: ProfileDetailItemProps) => {
    return (
        <TouchableOpacity className="flex-row items-center justify-between py-4 mt-2 bg-background border-b-2 border-gray-200" onPress={props.handler}>
            <Text className='text-sm text-secondary'>{props.title}</Text>
            <View className='flex-row justify-between items-center'>
                <Text className="text-lg">{props.value}</Text>
                <Image source={require('../../assets/images/profile-arrow.png')} className='w-8 h-8 ml-1'/>
            </View>
        </TouchableOpacity>
    )
}

export default ProfileDetailItem;

import {Image, ImageSourcePropType, Text, TouchableOpacity, View} from "react-native";

interface MenuItemProps {
    title: string;
    icon: ImageSourcePropType;
    handler: () => void;
}

const MenuItem = (props: MenuItemProps) => (
    <TouchableOpacity className="flex-row items-center justify-between p-3 mt-2 bg-background" onPress={props.handler}>
        <View className='flex-row items-center'>
            <Image source={props.icon} className='w-8 h-8'/>
            <Text className="text-xl text-secondary ml-4">{props.title}</Text>
        </View>
        <Image source={require('../../assets/images/profile-arrow.png')} className='w-8 h-8'/>
    </TouchableOpacity>
);

export default MenuItem;

import {Image, Text, TouchableOpacity, View} from "react-native";

interface TourPlanCardProps {
    title: string;
    subText: string;
    handler?: () => void;
}

const TourPlanCard = (props: TourPlanCardProps) => {

    return (
        <TouchableOpacity
            className='w-full h-fit bg-blue-200 flex-row items-center px-4 py-6 mb-4 rounded-2xl'
            onPress={props.handler}
        >
            <Image source={require('../../assets/images/transportPlan-bus.png')}/>
            <View className='ml-3'>
                <Text className='text-primary text-xl'>{props.title}</Text>
                <Text className='text-secondary text-lg'>{props.subText}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default TourPlanCard;

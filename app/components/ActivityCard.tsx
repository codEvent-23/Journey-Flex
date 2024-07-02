import {Image, Text, View} from "react-native";
import Activity from "../interfaces/Activity";

const ActivityCard = (props: Activity) => {
    return (
        <View className='bg-white w-full h-fit border border-gray-300 rounded-2xl p-4 mb-2'>
            <View className='flex-row justify-between items-center mb-2'>
                <Text className='text-xl'>{props.startLocation} to {props.destinationLocation}</Text>
                <Text className='text-gray-500 text-lg'>{props.busNumber}</Text>
            </View>
            <View className='flex-row justify-between items-center mb-2'>
                <Text className='text-sm'>{props.startTime}</Text>
                <Text className='text-sm'>{props.endTime}</Text>
            </View>
            <View className='flex-row justify-between items-center'>
                <View className='flex-row justify-center items-center bg-gray-200 px-2 py-1 rounded-2xl'>
                    <Image className='mr-3' source={require('../../assets/images/calander-activity.png')}/>
                    <Text className='text-sm'>{props.date}</Text>
                </View>
                <View className='flex-row justify-center items-center bg-gray-200 px-2 py-1 rounded-2xl'>
                    <Image className='mr-3' source={require('../../assets/images/watch-activity.png')}/>
                    <Text className='text-sm'>{props.duration} Min</Text>
                </View>
            </View>
        </View>
    )
}

export default ActivityCard;

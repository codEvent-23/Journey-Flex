import {Image, Text, TouchableOpacity, View} from "react-native";
import HighwayPackage from "../interfaces/HighwayPackage";

const HighwayPackageCard = (props: HighwayPackage) => {

    return (
        <View className='flex-row border border-gray-300 rounded-2xl mb-2'>
            <View className='flex-1 bg-white rounded-l-2xl p-4'>
                <Text className='text-lg font-medium'>{props.startingLocation} to {props.destination}</Text>
                <View className='flex-row items-center mt-2'>
                    <Image source={require('../../assets/images/highway-duration.png')}/>
                    <Text className='text-sm text-blue-200 ml-1'>{props.duration} min</Text>
                    <Image source={require('../../assets/images/highway-distance.png')}
                           className='ml-2'/>
                    <Text className='text-sm text-blue-200 ml-1'>{props.distance}km</Text>
                </View>
                <Text className='text-sm mt-1'>{props.activeTime} Day</Text>
            </View>
            <TouchableOpacity className='items-center justify-center bg-blue-200 rounded-r-2xl py-4 px-8'>
                <Text className='text-primary text-lg'>Activate</Text>
                <Text className='text-black text-xl mt-2'>RS.{props.price}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HighwayPackageCard;

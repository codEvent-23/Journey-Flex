import {Text, View} from "react-native";
import React from "react";

interface SummaryItemProps {
    title: string;
    value: string;
}

const SummaryItem = (props: SummaryItemProps) => {
    return (
        <View className='w-full'>
            <View className='w-full h-20 flex-row justify-between items-center px-6 border-b-2 border-gray-300'>
                <Text className='text-secondary text-lg'>{props.title}</Text>
                <Text className='text-lg'>{props.value}</Text>
            </View>
        </View>
    )
}

export default SummaryItem;

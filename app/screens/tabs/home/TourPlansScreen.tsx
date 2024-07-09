import React, { useState } from 'react';
import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import TourPlanCard from "../../../components/TourPlanCard";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import SCREENS from "../../index";

const TourPlansScreen = () => {
    const [activeButton, setActiveButton] = useState<string>('available');
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const handlePress = (button: string) => {
        setActiveButton(button);
    };

    function handleCustomPress() {
        navigation.navigate(SCREENS.CUSTOMIZE);
    }

    function handleHighwayPress() {
        navigation.navigate(SCREENS.HIGHWAY);
    }

    return (
        <SafeAreaView className='bg-background w-full h-full px-6'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className='flex-row justify-center items-center gap-4 mt-1'>
                    <TouchableOpacity
                        className={activeButton === 'available' ? 'bg-primary w-24 h-8 rounded-lg flex justify-center items-center' : 'bg-gray-300 w-24 h-8 rounded-lg flex justify-center items-center'}
                        onPress={() => handlePress('available')}
                    >
                        <Text className={activeButton === 'available' ? 'text-white' : 'text-black'}>Available</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={activeButton === 'active' ? 'bg-primary w-24 h-8 rounded-lg flex justify-center items-center' : 'bg-gray-300 w-24 h-8 rounded-lg flex justify-center items-center'}
                        onPress={() => handlePress('active')}
                    >
                        <Text className={activeButton === 'active' ? 'text-white' : 'text-black'}>Active</Text>
                    </TouchableOpacity>
                </View>

                <View className='bg-white px-4 py-3 mt-4 rounded-xl'>
                    <View className='flex-row items-center gap-2 mb-2'>
                        <Image source={require('../../../../assets/images/tourPlan-package.png')}/>
                        <Text className='text-lg text-secondary'>Package Details</Text>
                    </View>

                    {activeButton === 'available' ?
                        (
                            <>
                                <TourPlanCard title='Highway Bus Packages' subText='Package Details' handler={handleHighwayPress}/>
                                <TourPlanCard title='Custom Pacakge' subText='Package Details' handler={handleCustomPress}/>
                            </>
                        ) : (
                            <>
                                <TourPlanCard title='Kalutara - Panadura' subText='3 days'/>
                            </>
                        )
                    }

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TourPlansScreen;

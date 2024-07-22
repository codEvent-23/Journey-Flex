import {Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import ImageSlider from "../../../components/ImageSlider";
import RoundedButton from "../../../components/RoundedButton";
import QuickTopUpCard from "../../../components/QuickTopUpCard";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import SCREENS from "../../index";

const HomeScreen = () => {

    const [balance, setBalance] = useState('0');

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    function handleAddTransportPlans() {
        navigation.navigate(SCREENS.TOURPLAN);
    }

    function handleMoney(){

    }

    function handleActive(){

    }

    function handleBuy(){
        navigation.navigate(SCREENS.PAYMENTMETHOD)
    }

    function handleTopUpHistory(){

    }

    return (
        <SafeAreaView className='w-full h-full bg-background'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className='flex-1 bg-background px-4 pt-4'>
                    <ImageSlider />
                    <View className='flex-row justify-around items-center w-full bg-white mt-4 py-8 rounded-2xl'>
                        <View>
                            <Text className='text-2xl font-bold'>Transport Plans</Text>
                            <Text className='text-base'>packages details</Text>
                        </View>
                        <RoundedButton title='Add' fontSize='2xl' handler={handleAddTransportPlans}/>
                    </View>
                    <View className='w-full bg-white mt-4 py-4 px-6 rounded-2xl'>
                        <View className='flex-row'>
                            <RoundedButton title='Money' fontSize='sm' handler={handleMoney} marginRight='2'/>
                            <RoundedButton title='Active' fontSize='sm' handler={handleActive} marginRight='2'/>
                        </View>
                        <View className='flex-row justify-between items-center py-4 border-b-2 border-gray-600'>
                            <View>
                                <Text className='text-3xl font-bold mb-2'>Balance</Text>
                                <View className='flex-row items-end'>
                                    <Text className='text-base'>RS.</Text>
                                    <Text className='text-3xl'>{balance}</Text>
                                </View>
                            </View>
                            <RoundedButton title='Buy' fontSize='2xl' handler={handleBuy}/>
                        </View>
                        <View className='py-4'>
                            <TouchableOpacity onPress={handleTopUpHistory}>
                                <Text className='text-lg text-primary'>Top Up History</Text>
                            </TouchableOpacity>
                            <Text className='text-4xl my-3'>Quick Top Up</Text>
                            <View className='flex-row justify-around mt-2'>
                                <QuickTopUpCard value={1000} />
                                <QuickTopUpCard value={2000} />
                                <QuickTopUpCard value={3000} />
                                <QuickTopUpCard value={4000} />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;

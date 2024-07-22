import {SafeAreaView, Text, View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../../../navigation/HomeStackNavigation";
import React from "react";
import SummaryItem from "../../../components/SummaryItem";
import RoundedButton from "../../../components/RoundedButton";

type SummaryScreenRouteProp = RouteProp<RootStackParamList, 'Summary'>;

type Props = {
    route: SummaryScreenRouteProp;
};

const CustomPackageSummaryScreen: React.FC<Props> = ({route}) => {
    const {startingLocation, destination, busType, travelDistance, routesCount} = route.params;

    const BASE_PRICE: number = 40
    const offer: number = 5;

    function calculatePrice(): number {
        return (((travelDistance - 8) * 2) + BASE_PRICE) * parseInt(routesCount);
    }

    function calculateTotal(): number {
        let discountedPrice = ((calculatePrice() * 30) * offer) / 100;
        return (calculatePrice() * 30) - discountedPrice;
    }

    function handleBuyBtn() {

    }

    return (
        <SafeAreaView className='flex-1 bg-background px-4 justify-between'>
            <View>
                <SummaryItem title='KM Per Route' value={`${travelDistance.toFixed(1)} KM`}/>
                <SummaryItem title='Amount Per Day' value={`Rs. ${calculatePrice().toFixed(0)}`}/>
                <SummaryItem title='Monthly Cost' value={`Rs. ${(calculatePrice() * 30).toFixed(0)}`}/>
                <SummaryItem title='Offers' value={`${offer}%`}/>
                <View className='w-full h-20 flex-row justify-between items-center px-6'>
                    <Text className='text-primary text-2xl'>Total</Text>
                    <Text className='text-primary text-2xl'>Rs. {calculateTotal().toFixed(0)}</Text>
                </View>
            </View>
            <RoundedButton title='Buy Now' fontSize='xl' marginBottom='6' handler={handleBuyBtn}/>
        </SafeAreaView>
    )
}

export default CustomPackageSummaryScreen;

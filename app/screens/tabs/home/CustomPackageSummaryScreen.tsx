import {Alert, SafeAreaView, Text, View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../../../navigation/HomeStackNavigation";
import React from "react";
import SummaryItem from "../../../components/SummaryItem";
import RoundedButton from "../../../components/RoundedButton";
import {useUser} from "../../../context/UserContext";
import HighwayPackage from "../../../interfaces/HighwayPackage";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

type SummaryScreenRouteProp = RouteProp<RootStackParamList, 'Summary'>;

type Props = {
    route: SummaryScreenRouteProp;
};

const CustomPackageSummaryScreen: React.FC<Props> = ({route}) => {
    const {startingLocation, destination, busType, travelDistance, routesCount} = route.params;
    const { topUpBalance, refreshUserData } = useUser();
    const user = auth().currentUser;

    const BASE_PRICE: number = 40
    const offer: number = 5;

    function calculatePrice(): number {
        return (travelDistance <= 8) ? 40 : (((travelDistance - 8) * 2) + BASE_PRICE) * parseInt(routesCount);
    }

    function calculateTotal(): number {
        let discountedPrice = ((calculatePrice() * 30) * offer) / 100;
        return (calculatePrice() * 30) - discountedPrice;
    }

    const savePurchase = async () => {
        const userQuerySnapshot = await firestore()
            .collection("users")
            .where("userId", "==", user?.uid)
            .get();

        if (!userQuerySnapshot.empty) {
            const userDoc = userQuerySnapshot.docs[0];
            const userData = userDoc.data();

            const newTopUpBalance = userData.topUpBalance - calculateTotal();

            await firestore()
                .collection("users")
                .doc(userDoc.id)
                .update({
                    topUpBalance: newTopUpBalance
                });

            const customPackage = await firestore()
                .collection("customPackages")
                .add({
                    startingLocation: startingLocation.description.split(',')[0],
                    startingLocationLat: startingLocation.latitude,
                    startingLocationLon: startingLocation.longitude,
                    destination: destination.description.split(',')[0],
                    destinationLat: destination.latitude,
                    destinationLon: destination.longitude,
                    busType: busType,
                    travelDistance: travelDistance,
                    routesCountPerDay: routesCount,
                    userId: user?.uid
                })

            await firestore()
                .collection("packagePurchase")
                .add({
                    packageId: customPackage.id,
                    userId: user?.uid,
                    date: firestore.Timestamp.fromDate(new Date())
                })
            refreshUserData();

            Alert.alert('Activation Successful', 'You have successfully activated the package.');
        } else {
            console.log('No user found with this userId');
            Alert.alert('Activation Failed', 'User not found.');
        }
    }

    function handleBuyBtn() {
        if (topUpBalance >= calculateTotal()) {
            Alert.alert(
                'Activation Confirmation',
                'Are you sure you want to activate?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Activation cancelled'),
                        style: 'cancel',
                    },
                    {
                        text: 'Activate',
                        onPress: async () => {
                            await savePurchase();
                        },
                    },
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert('Invalid Balance', 'please recharge your account to activate this package.');
        }
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
            <RoundedButton title='Activate Now' fontSize='xl' marginBottom='6' handler={handleBuyBtn}/>
        </SafeAreaView>
    )
}

export default CustomPackageSummaryScreen;

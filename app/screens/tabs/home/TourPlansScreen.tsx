import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import TourPlanCard from "../../../components/TourPlanCard";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import SCREENS from "../../index";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import {ActivityIndicator} from "nativewind/dist/preflight";

const TourPlansScreen = () => {
    const [activeButton, setActiveButton] = useState<string>('available');
    const [activatedPackages, setActivatedPackages] = useState([]);
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const user = auth().currentUser;

    const getPackagesPurchasedByUserId = async (userId: any) => {
        try {
            // Step 1: Fetch all package purchases by the user
            const purchaseSnapshot = await firestore()
                .collection("packagePurchase")
                .where("userId", "==", userId)
                .get();

            const purchases = purchaseSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Step 2: Fetch package details for each purchase
            const packageDetailsPromises = purchases.map(async purchase => {
                const highwayPackageData = await firestore()
                    .collection("highwayPackages")
                    .doc(purchase.packageId)
                    .get();

                if (!highwayPackageData.exists){
                    const customPackageData = await firestore()
                        .collection("customPackages")
                        .doc(purchase.packageId)
                        .get();

                    return {
                        purchaseId: purchase.id,
                        purchaseDate: purchase.date,
                        packageId: purchase.packageId,
                        packageDetails: customPackageData.data(),
                    };
                }

                return {
                    purchaseId: purchase.id,
                    purchaseDate: purchase.date,
                    packageId: purchase.packageId,
                    packageDetails: highwayPackageData.data(),
                };
            });

            // Wait for all package details to be fetched
            const packagesWithDetails = await Promise.all(packageDetailsPromises);

            return packagesWithDetails;
        } catch (error) {
            console.error("Error fetching purchases and package details: ", error);
            throw error;
        }
    };

    const handlePress = (button: string) => {
        setActiveButton(button);
    };

    function handleCustomPress() {
        navigation.navigate(SCREENS.CUSTOMIZE);
    }

    function handleHighwayPress() {
        navigation.navigate(SCREENS.HIGHWAY);
    }

    useEffect(() => {
        getPackagesPurchasedByUserId(user?.uid).then(packages => {
            setActivatedPackages(packages)
            console.log("Packages purchased by user: ", packages);
        }).catch(error => {
            console.error("Error: ", error);
        });
    }, []);

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
                            activatedPackages.length === 0 ?
                                activatedPackages.map((value, index) => (
                                    <TourPlanCard
                                        key={index}
                                        title={`${value.packageDetails.startingLocation} - ${value.packageDetails.destination}`}
                                        subText={`${value.packageDetails.activeTime} days`}/>
                                ))

                                :

                                <View className='w-full h-full flex justify-center items-center'>
                                    <Text>No Activated tours</Text>
                                </View>
                        )
                    }

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TourPlansScreen;

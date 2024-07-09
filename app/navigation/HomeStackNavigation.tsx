import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SCREENS from "../screens";
import HomeScreen from "../screens/tabs/home/HomeScreen";
import NotificationScreen from "../screens/tabs/home/NotificationScreen";
import BackBtn from "../components/BackBtn";
import TourPlansScreen from "../screens/tabs/home/TourPlansScreen";
import CustomPackageCustomizationScreen from "../screens/tabs/home/CustomPackageCustomizationScreen";
import CustomPackageSummaryScreen from "../screens/tabs/home/CustomPackageSummaryScreen";
import React from "react";
import LocationWithName from "../interfaces/LocationWithName";
import HighwayPackagesScreen from "../screens/tabs/home/HighwayPackagesScreen";

export type RootStackParamList = {
    Home: undefined;
    Notification: undefined;
    TourPlan: undefined;
    Customize: undefined;
    Summary: {
        startingLocation: LocationWithName;
        destination: LocationWithName;
        busType: string | undefined;
        travelDistance: number;
        routesCount: string;
    };
    Highway: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={SCREENS.HOME} component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen
                name={SCREENS.NOTIFICATION}
                component={NotificationScreen}
                options={{
                    title: 'Notifications',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTintColor: '#1877F2',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#F5F7FA',
                    },
                    headerTitleStyle: {
                        fontSize: 24,
                    },
                    headerLeft: () => (
                        <BackBtn screen={SCREENS.HOME} image={require('../../assets/images/back-arrow-blue.png')}/>
                    ),
                }}
            />
            <Stack.Screen
                name={SCREENS.TOURPLAN}
                component={TourPlansScreen}
                options={{
                    title: 'Tour Plans',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTintColor: '#1877F2',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#F5F7FA',
                    },
                    headerTitleStyle: {
                        fontSize: 24,
                    },
                    headerLeft: () => (
                        <BackBtn screen={SCREENS.HOME} image={require('../../assets/images/back-arrow-blue.png')}/>
                    ),
                }}
            />
            <Stack.Screen
                name={SCREENS.CUSTOMIZE}
                component={CustomPackageCustomizationScreen}
                options={{
                    title: 'Customize Your Journey',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTintColor: '#FFFFFF',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#1877F2',
                    },
                    headerTitleStyle: {
                        fontSize: 24,
                    },
                    headerLeft: () => (
                        <BackBtn screen={SCREENS.TOURPLAN} image={require('../../assets/images/back-arrow-white.png')}/>
                    ),
                }}
            />
            <Stack.Screen
                name={SCREENS.SUMMARY}
                component={CustomPackageSummaryScreen}
                options={{
                    title: 'Summary',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTintColor: '#FFFFFF',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#1877F2',
                    },
                    headerTitleStyle: {
                        fontSize: 24,
                    },
                    headerLeft: () => (
                        <BackBtn screen={SCREENS.CUSTOMIZE} image={require('../../assets/images/back-arrow-white.png')}/>
                    ),
                }}
            />
            <Stack.Screen
                name={SCREENS.HIGHWAY}
                component={HighwayPackagesScreen}
                options={{
                    title: 'Highway Bus Packages',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTintColor: '#FFFFFF',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#1877F2',
                    },
                    headerTitleStyle: {
                        fontSize: 24,
                    },
                    headerLeft: () => (
                        <BackBtn screen={SCREENS.TOURPLAN} image={require('../../assets/images/back-arrow-white.png')}/>
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

export default HomeStackNavigator;

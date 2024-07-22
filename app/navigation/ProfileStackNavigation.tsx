import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SCREENS from "../screens";
import ViewProfileScreen from "../screens/tabs/profile/ViewProfileScreen";
import ProfileScreen from "../screens/tabs/profile/ProfileScreen";
import FeedbackScreen from "../screens/tabs/profile/FeedbackScreen";
import BackBtn from "../components/BackBtn";
import React from "react";
import AboutUsScreen from "../screens/tabs/profile/AboutUsScreen";

const Stack = createNativeStackNavigator();

const ProfileStackNavigation = () => {

    return (
        <Stack.Navigator initialRouteName={SCREENS.PROFILE}>
            <Stack.Screen name={SCREENS.PROFILE} component={ProfileScreen} options={{headerShown: false}}/>
            <Stack.Screen name={SCREENS.VIEWPROFILE} component={ViewProfileScreen} options={{headerShown: false}}/>
            <Stack.Screen
                name={SCREENS.FEEDBACK}
                component={FeedbackScreen}
                options={{
                    title: 'Feedback',
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
                        <BackBtn screen={SCREENS.PROFILE} image={require('../../assets/images/back-arrow-blue.png')}/>
                    ),
                }}
            />
            <Stack.Screen
                name={SCREENS.ABOUTUS}
                component={AboutUsScreen}
                options={{
                    title: 'About Us',
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
                        <BackBtn screen={SCREENS.PROFILE} image={require('../../assets/images/back-arrow-blue.png')}/>
                    ),
                }}
            />
        </Stack.Navigator>
    )
}

export default ProfileStackNavigation;

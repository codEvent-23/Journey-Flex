import {createNativeStackNavigator} from "@react-navigation/native-stack";
import OTPVerificationScreen from "../screens/auth/OTPVerificationScreen";
import ProfileCreationScreen from "../screens/auth/ProfileCreationScreen";
import EmailConfirmationScreen from "../screens/auth/EmailConfirmationScreen";
import WelcomeScreen from "../screens/intro/WelcomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import SCREENS from "../screens";
import {useEffect, useState} from "react";
import TabNavigation from "./TabNavigation";
import LoadingScreen from "../screens/intro/LoadingScreen";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const [user, setUser] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <NavigationContainer>
            {isLoading ? (
                <LoadingScreen/>
            ) : (
                <Stack.Navigator>
                    {!user ? (
                        <>
                            <Stack.Screen name={SCREENS.OTP} component={OTPVerificationScreen} options={{headerShown: false}}/>
                            <Stack.Screen name={SCREENS.PROFILECREATION} component={ProfileCreationScreen} options={{headerShown: false}}/>
                            <Stack.Screen name={SCREENS.EMAIL} component={EmailConfirmationScreen} options={{headerShown: false}}/>
                        </>
                    ) : (
                        <>
                            <Stack.Screen name={SCREENS.WELCOME} component={WelcomeScreen} options={{headerShown: false}}/>
                            <Stack.Screen name={SCREENS.TABS} component={TabNavigation} options={{headerShown: false}}/>
                        </>
                    )}
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}

export default AppNavigation;

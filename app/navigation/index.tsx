import {createNativeStackNavigator} from "@react-navigation/native-stack";
import OTPVerificationScreen from "../screens/auth/OTPVerificationScreen";
import ProfileCreationScreen from "../screens/auth/ProfileCreationScreen";
import EmailConfirmationScreen from "../screens/auth/EmailConfirmationScreen";
import WelcomeScreen from "../screens/intro/WelcomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import SCREENS from "../screens";
import React, {useEffect, useState} from "react";
import TabNavigation from "./TabNavigation";
import LoadingScreen from "../screens/intro/LoadingScreen";
import BackBtn from "../components/BackBtn";
import PaymentMethodScreen from "../screens/tabs/home/PaymentMethodScreen";
import CardPaymentScreen from "../screens/tabs/home/CardPaymentScreen";
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {UserProvider} from "../context/UserContext";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedUser, setIsLoggedUser] = useState(false);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            setUser(user)
            if (user?.email){
                setIsLoggedUser(true)
            }else {
                setIsLoggedUser(false)
            }
            console.log('logged user: ', isLoggedUser)
        })
    }, []);

    return (
        <NavigationContainer>
            <UserProvider>
            {isLoading ? (
                <LoadingScreen/>
            ) : (
                <Stack.Navigator>
                    {!user ? (
                        <>
                            <Stack.Screen name={SCREENS.OTP} component={OTPVerificationScreen} options={{headerShown: false}}/>
                        </>
                    ) : (
                        isLoggedUser ?
                            <>
                                <Stack.Screen name={SCREENS.WELCOME} component={WelcomeScreen} options={{headerShown: false}}/>
                                <Stack.Screen name={SCREENS.TABS} component={TabNavigation} options={{headerShown: false}}/>
                                <Stack.Screen
                                    name={SCREENS.PAYMENTMETHOD}
                                    component={PaymentMethodScreen}
                                    options={{
                                        title: 'Payment Method',
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
                                    name={SCREENS.CARDPAYMENT}
                                    component={CardPaymentScreen}
                                    options={{
                                        title: 'Payment Details',
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
                                            <BackBtn screen={SCREENS.PAYMENTMETHOD} image={require('../../assets/images/back-arrow-blue.png')}/>
                                        ),
                                    }}
                                />
                            </>

                            :

                            <>
                                <Stack.Screen name={SCREENS.PROFILECREATION} component={ProfileCreationScreen} options={{headerShown: false}}/>
                                <Stack.Screen name={SCREENS.EMAIL} component={EmailConfirmationScreen} options={{headerShown: false}}/>
                                <Stack.Screen name={SCREENS.TABS} component={TabNavigation} options={{headerShown: false}}/>
                                <Stack.Screen name={SCREENS.WELCOME} component={WelcomeScreen} options={{headerShown: false}}/>
                                <Stack.Screen
                                    name={SCREENS.PAYMENTMETHOD}
                                    component={PaymentMethodScreen}
                                    options={{
                                        title: 'Payment Method',
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
                                    name={SCREENS.CARDPAYMENT}
                                    component={CardPaymentScreen}
                                    options={{
                                        title: 'Payment Details',
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
                                            <BackBtn screen={SCREENS.PAYMENTMETHOD} image={require('../../assets/images/back-arrow-blue.png')}/>
                                        ),
                                    }}
                                />
                            </>
                    )}
                </Stack.Navigator>
            )}
            </UserProvider>
        </NavigationContainer>
    );
}

export default AppNavigation;

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import LoadingScreen from "../screens/intro/LoadingScreen";
import OTPVerificationScreen from "../screens/auth/OTPVerificationScreen";
import ProfileCreationScreen from "../screens/auth/ProfileCreationScreen";
import EmailConfirmationScreen from "../screens/auth/EmailConfirmationScreen";
import WelcomeScreen from "../screens/intro/WelcomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "../screens/tabs/HomeScreen";
import ActivityScreen from "../screens/tabs/ActivityScreen";
import SCREENS from "../screens";
import ProfileScreen from "../screens/tabs/ProfileScreen";
import {Image} from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigation = () => {
     return (
         <NavigationContainer>
             <Stack.Navigator initialRouteName={SCREENS.LOAD} screenOptions={{headerShown: false}}>
                 <Stack.Screen name={SCREENS.LOAD} component={LoadingScreen}/>
                 <Stack.Screen name={SCREENS.OTP} component={OTPVerificationScreen}/>
                 <Stack.Screen name={SCREENS.PROFILECREATION} component={ProfileCreationScreen}/>
                 <Stack.Screen name={SCREENS.EMAIL} component={EmailConfirmationScreen}/>
                 <Stack.Screen name={SCREENS.WELCOME} component={WelcomeScreen}/>
                 <Stack.Screen name={SCREENS.TABS} component={TabNavigation}/>
             </Stack.Navigator>
         </NavigationContainer>
     )
}

const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName={SCREENS.HOME}
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 10,
                    backgroundColor: '#F5F7FA'
                }
            }}
        >
            <Tab.Screen
                name={SCREENS.HOME}
                component={HomeScreen}
                options={{
                    title: 'Home',
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={
                                focused ?
                                    require('../../assets/images/tabIcons/home-focused.png') :
                                    require('../../assets/images/tabIcons/home.png')
                            }
                            style={{
                                height: 30,
                                width: 30,
                                tintColor: focused ? '#1877F2' : '#757575',
                            }}
                        />
                    ),
                    tabBarActiveTintColor: '#1877F2',
                    tabBarInactiveTintColor: '#757575'
                }}
            />
            <Tab.Screen
                name={SCREENS.ACTIVITY}
                component={ActivityScreen}
                options={{
                    title: 'Activities',
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={
                                focused ?
                                    require('../../assets/images/tabIcons/activity-focused.png') :
                                    require('../../assets/images/tabIcons/activity.png')
                            }
                            style={{
                                height: 30,
                                width: 30,
                            }}
                        />
                    ),
                    tabBarActiveTintColor: '#1877F2',
                    tabBarInactiveTintColor: '#757575'
                }}
            />
            <Tab.Screen
                name={SCREENS.PROFILE}
                component={ProfileScreen}
                options={{
                    title: 'Profile',
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={
                                focused ?
                                    require('../../assets/images/tabIcons/profile-focused.png') :
                                    require('../../assets/images/tabIcons/profile.png')
                            }
                            style={{
                                height: 30,
                                width: 30,
                                tintColor: focused ? '#1877F2' : '#757575',
                            }}
                        />
                    ),
                    tabBarActiveTintColor: '#1877F2',
                    tabBarInactiveTintColor: '#757575'
                }}
            />
        </Tab.Navigator>
    )
}

export default AppNavigation;

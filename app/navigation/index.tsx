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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigation = () => {
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
        <Tab.Navigator initialRouteName={SCREENS.HOME}>
            <Tab.Screen name={SCREENS.HOME} component={HomeScreen}/>
            <Tab.Screen name={SCREENS.ACTIVITY} component={ActivityScreen}/>
        </Tab.Navigator>
    )
}

export default StackNavigation;

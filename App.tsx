import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import LoadingScreen from "./app/screens/LoadingScreen";
import OTPVerificationScreen from "./app/screens/OTPVerificationScreen";
import ProfileCreationScreen from "./app/screens/ProfileCreationScreen";
import EmailConfirmationScreen from "./app/screens/EmailConfirmationScreen";

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='LoadingScreen' component={LoadingScreen}/>
            <Stack.Screen name='OTPScreen' component={OTPVerificationScreen}/>
            <Stack.Screen name='ProfileCreationScreen' component={ProfileCreationScreen}/>
            <Stack.Screen name='EmailScreen' component={EmailConfirmationScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

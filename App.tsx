import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import LoadingScreen from "./app/screens/LoadingScreen";
import OTPVerificationScreen from "./app/screens/OTPVerificationScreen";

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='LoadingScreen' component={LoadingScreen}/>
            <Stack.Screen name='OTPScreen' component={OTPVerificationScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SCREENS from "../screens";
import HomeScreen from "../screens/tabs/home/HomeScreen";
import NotificationScreen from "../screens/tabs/home/NotificationScreen";
import NotificationBackBtn from "../components/NotificationBackBtn";

const Stack = createNativeStackNavigator();

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
                        <NotificationBackBtn/>
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

export default HomeStackNavigator;

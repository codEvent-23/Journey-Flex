import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import SCREENS from "../screens";
import {Image, TouchableOpacity} from "react-native";
import ActivityScreen from "../screens/tabs/ActivityScreen";
import ProfileScreen from "../screens/tabs/ProfileScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigation";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return (
        <Tab.Navigator
            initialRouteName='HomeTab'
            screenOptions={{
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 10,
                    backgroundColor: '#F5F7FA'
                }
            }}
        >
            <Tab.Screen
                name='HomeTab'
                component={HomeStackNavigator}
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
                                marginBottom: 5,
                            }}
                        />
                    ),
                    tabBarLabelStyle: {
                        fontSize: 14
                    },
                    tabBarActiveTintColor: '#1877F2',
                    tabBarInactiveTintColor: '#757575',
                    headerShown: false
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
                                marginBottom: 5,
                            }}
                        />
                    ),
                    tabBarLabelStyle: {
                        fontSize: 14
                    },
                    tabBarActiveTintColor: '#1877F2',
                    tabBarInactiveTintColor: '#757575',
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerTintColor: '#1877F2',
                    headerStyle: {
                        backgroundColor: '#F5F7FA',
                        height: 100
                    },
                    headerTitleStyle: {
                        fontSize: 24
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.HOME)}>
                            <Image
                                source={require('../../assets/images/back-arrow-blue.png')}
                                style={{ width: 28, height: 28, marginLeft: 15 }}
                            />
                        </TouchableOpacity>
                    )
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
                                marginBottom: 5,
                            }}
                        />
                    ),
                    tabBarLabelStyle: {
                        fontSize: 14
                    },
                    tabBarActiveTintColor: '#1877F2',
                    tabBarInactiveTintColor: '#757575',
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigation;

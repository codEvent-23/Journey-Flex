import {SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity, Alert, Button} from "react-native";
import MenuItem from "../../../components/MenuItem";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import auth from '@react-native-firebase/auth';
import SCREENS from "../../index";
import {useUser} from "../../../context/UserContext";

const ProfileScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {firstname,lastname,email} = useUser();

    const signOutUser = async () => {
        try {
            await auth().signOut();

            console.log('User signed out!');
            // You can navigate the user to the login screen or perform other actions here
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    const handleViewProfile = () => {
        navigation.navigate(SCREENS.VIEWPROFILE);
    }

    const handlePayment = () => {
        navigation.navigate(SCREENS.PAYMENTMETHOD);
    }

    const handleFeedback = () => {
        navigation.navigate(SCREENS.FEEDBACK);
    }

    const handleHelp = () => {

    }

    const handleAbout = () => {
        navigation.navigate(SCREENS.ABOUTUS);
    }

    const handleLogout = () => {
        Alert.alert(
            'Logout Confirmation',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Logout cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'LOGOUT',
                    onPress: () => {
                        signOutUser();
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="bg-primary h-36 justify-center items-center">
                    <Image source={require('../../../../assets/images/profilePicPlaceholder.png')} className="w-24 h-24 rounded-full mt-48" />
                    <Text className="text-primary text-2xl mt-4">{`${firstname} ${lastname}`}</Text>
                    <Text className="text-gray-600 m-2">{email}</Text>
                </View>
                <View className="px-4 mt-32">
                    <MenuItem icon={require('../../../../assets/images/profile-view-profile.png')} title="View Profile" handler={handleViewProfile}/>
                    <MenuItem icon={require('../../../../assets/images/profile-payment.png')} title="Payment" handler={handlePayment}/>
                    <MenuItem icon={require('../../../../assets/images/profile-feedback.png')} title="Feedback" handler={handleFeedback}/>
                    <MenuItem icon={require('../../../../assets/images/profile-help.png')} title="Help and Support" handler={handleHelp}/>
                    <MenuItem icon={require('../../../../assets/images/profile-about.png')} title="About Us" handler={handleAbout}/>
                    <MenuItem icon={require('../../../../assets/images/profile-logout.png')} title="Log Out" handler={handleLogout}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen;

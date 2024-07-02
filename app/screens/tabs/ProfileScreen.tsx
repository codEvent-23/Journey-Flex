import {SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity} from "react-native";
import MenuItem from "../../components/MenuItem";

const ProfileScreen = () => {

    const handleViewProfile = () => {

    }

    const handlePayment = () => {

    }

    const handleFeedback = () => {

    }

    const handleHelp = () => {

    }

    const handleAbout = () => {

    }

    const handleLogout = () => {

    }

    return (
        <SafeAreaView className="bg-background">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="bg-primary h-36 justify-center items-center">
                    <Image source={require('../../../assets/images/profilePicPlaceholder.png')} className="w-24 h-24 rounded-full mt-48" />
                    <Text className="text-primary text-2xl mt-4">Hello Nimna</Text>
                    <Text className="text-gray-600 m-2">nimna@gmail.com</Text>
                </View>
                <View className="px-4 mt-32">
                    <MenuItem icon={require('../../../assets/images/profile-view-profile.png')} title="View Profile" handler={handleViewProfile}/>
                    <MenuItem icon={require('../../../assets/images/profile-payment.png')} title="Payment" handler={handlePayment}/>
                    <MenuItem icon={require('../../../assets/images/profile-feedback.png')} title="Feedback" handler={handleFeedback}/>
                    <MenuItem icon={require('../../../assets/images/profile-help.png')} title="Help and Support" handler={handleHelp}/>
                    <MenuItem icon={require('../../../assets/images/profile-about.png')} title="About Us" handler={handleAbout}/>
                    <MenuItem icon={require('../../../assets/images/profile-logout.png')} title="Log Out" handler={handleLogout}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen;

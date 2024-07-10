import {Image, SafeAreaView, Text, View} from "react-native";
import ProfileDetailItem from "../../../components/ProfileDetailItem";

const ViewProfileScreen = () => {

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="bg-primary h-36 justify-center items-center">
                <Image source={require('../../../../assets/images/profilePicPlaceholder.png')}
                       className="w-24 h-24 rounded-full mt-32"/>
            </View>
            <View className='mt-16 px-8'>
                <Text className='text-primary text-2xl'>Your Info</Text>
                <ProfileDetailItem title='Full Name' value='Nimna Sekara'/>
                <ProfileDetailItem title='Email Address' value='nimna@gmail.com'/>
                <ProfileDetailItem title='Mobile Number' value='Nimna Sekara'/>
                <ProfileDetailItem title='Additional Settings' value='Account'/>
            </View>
        </SafeAreaView>
    )
}

export default ViewProfileScreen;

import {Image, SafeAreaView, View} from "react-native";
import NextButton from "../components/NextButton";
import StyledTextInput from "../components/StyledTextInput";
import {useState} from "react";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

const ProfileCreationScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    function handleProfileDetailsSubmit() {
        navigation.navigate('EmailScreen');
    }

    return (
        <SafeAreaView className='flex-1'>
            <Image
                className='absolute top-12'
                source={require('../../assets/images/profileScreenBg.png')}/>
            <View className='flex-1 justify-center items-center'>
                <Image
                    className='w-32 h-32'
                    source={require('../../assets/images/profilePicPlaceholder.png')}/>
            </View>
            <View className='flex-1 px-8'>
                <StyledTextInput title='Your First Name' placeholder='Enter your first name' value={firstName} onChange={setFirstName}/>
                <StyledTextInput title='Your Last Name' placeholder='Enter your last name' value={lastName} onChange={setLastName}/>
                <StyledTextInput title='Your Email' placeholder='Enter your email' value={email} onChange={setEmail}/>
                <NextButton title='Done' handler={handleProfileDetailsSubmit} />
            </View>
        </SafeAreaView>
    )
}

export default ProfileCreationScreen;

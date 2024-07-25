import {Alert, Image, SafeAreaView, View} from "react-native";
import NextButton from "../../components/NextButton";
import StyledTextInput from "../../components/StyledTextInput";
import React, { useState } from "react";
import {ParamListBase, RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import auth from '@react-native-firebase/auth';
import SCREENS from "../index";
import firestore from '@react-native-firebase/firestore';

const ProfileCreationScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const password = '12345678';

    const user = auth().currentUser;

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleProfileDetailsSubmit = async () => {
        try {
            if (!validateEmail(email)) {
                Alert.alert('Invalid Email', 'Please enter a valid email address.');
                return;
            }

            if (user) {
                const credential = auth.EmailAuthProvider.credential(email, password);

                try {
                    // Link the email/password provider
                    await user.linkWithCredential(credential);
                    console.log('Email linked successfully');

                    // Send verification email
                    await user.sendEmailVerification();
                    console.log('Verification email sent');
                } catch (error: any) {
                    if (error.code === 'auth/email-already-in-use'){
                        Alert.alert('The email address is already in use by another account.', 'Please enter another email to continue');
                        return;
                    }
                    console.error('Error linking email or sending verification email:', error);
                }
            } else {
                console.log('No user is signed in.');
                Alert.alert('Error', 'No user is signed in.');
            }
            await firestore()
                .collection("users")
                .add({
                    userId: user?.uid,
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    phoneNumber: user?.phoneNumber,
                    topUpBalance: 0
                })
            navigation.navigate(SCREENS.EMAIL);
        } catch (error) {
            console.log("Error saving details: ", error);
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-background'>
            <Image
                className='absolute top-12'
                source={require('../../../assets/images/profileScreenBg.png')} />
            <View className='flex-1 justify-center items-center'>
                <Image
                    className='w-32 h-32'
                    source={require('../../../assets/images/profilePicPlaceholder.png')} />
            </View>
            <View className='flex-1 px-8'>
                <StyledTextInput title='Your First Name' placeholder='Enter your first name' value={firstName} onChange={setFirstName} />
                <StyledTextInput title='Your Last Name' placeholder='Enter your last name' value={lastName} onChange={setLastName} />
                <StyledTextInput title='Your Email' placeholder='Enter your email' value={email} onChange={setEmail} />
                <NextButton title='Done' handler={handleProfileDetailsSubmit} />
            </View>
        </SafeAreaView>
    )
}

export default ProfileCreationScreen;

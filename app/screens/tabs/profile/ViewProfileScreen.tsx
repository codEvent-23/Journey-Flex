import React, { useState } from 'react';
import { Image, SafeAreaView, Text, View, TouchableOpacity, Alert } from "react-native";
import ProfileDetailItem from "../../../components/ProfileDetailItem";
import { launchImageLibrary } from 'react-native-image-picker';
import {useUser} from "../../../context/UserContext";

const ViewProfileScreen = () => {
    const [profilePic, setProfilePic] = useState(require('../../../../assets/images/profilePicPlaceholder.png'));
    const {firstname,lastname, phoneNumber, email} = useUser();

    const selectImage = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {
                const source = { uri: response.assets[0].uri };
                setProfilePic(source);
            }
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="bg-primary h-36 justify-center items-center">
                <TouchableOpacity onPress={selectImage}>
                    <Image source={profilePic} className="w-24 h-24 rounded-full mt-32"/>
                </TouchableOpacity>
            </View>
            <View className='mt-16 px-8'>
                <Text className='text-primary text-2xl'>Your Info</Text>
                <ProfileDetailItem title='Full Name' value={`${firstname} ${lastname}`}/>
                <ProfileDetailItem title='Email Address' value={email}/>
                <ProfileDetailItem title='Mobile Number' value={phoneNumber}/>
                <ProfileDetailItem title='Additional Settings' value='Account'/>
            </View>
        </SafeAreaView>
    );
}

export default ViewProfileScreen;

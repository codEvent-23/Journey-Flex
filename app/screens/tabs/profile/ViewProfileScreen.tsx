import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import ProfileDetailItem from "../../../components/ProfileDetailItem";
import ImagePicker from 'react-native-image-picker';

const ViewProfileScreen = () => {

    const user = auth().currentUser;
    const [email, setEmail] = useState(user?.email || 'example@gmail.com');
    const [displayName, setDisplayName] = useState(user?.displayName || 'sample name');
    const [phoneNumber] = useState(user?.phoneNumber || '0342280266');
    const [profilePic, setProfilePic] = useState(user?.photoURL || 'https://www.example.com/default-profile-pic.png');
    const [changesMade, setChangesMade] = useState(false);

    useEffect(() => {
        setChangesMade(true);
    }, [email, displayName, profilePic]);

    const handleSaveProfile = async () => {
        try {
            await user?.updateProfile({
                displayName,
                photoURL: profilePic,
            });

            await user?.updateEmail(email);
            
            console.log("Profile updated successfully");
            setChangesMade(false);
        } catch (error) {
            console.log("Error updating profile: ", error);
        }
    };

    const handleChoosePhoto = () => {
        const options = {
            title: 'Select Profile Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.launchImageLibrary(options, async (response:any) => {
            if (response.uri) {
                const reference = storage().ref(`profile_pics/${user?.uid}`);
                await reference.putFile(response.uri);
                const url = await reference.getDownloadURL();
                setProfilePic(url);
            }
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="bg-primary h-36 justify-center items-center">
                <TouchableOpacity onPress={handleChoosePhoto}>
                    <Image
                        source={{ uri: profilePic }}
                        className="w-24 h-24 rounded-full mt-32"
                    />
                </TouchableOpacity>
            </View>
            <View className='mt-16 px-8'>
                <Text className='text-primary text-2xl'>Your Info</Text>
                <ProfileDetailItem title='Full Name' value={displayName} />
                <TextInput
                    value={displayName}
                    onChangeText={setDisplayName}
                    className='border border-gray-300 rounded px-2 mb-4 w-full'
                />

                <ProfileDetailItem title='Email Address' value={email} />
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    className='border border-gray-300 rounded px-2 mb-4 w-full'
                />

                <ProfileDetailItem title='Mobile Number' value={phoneNumber} />
                <TextInput
                    value={phoneNumber}
                    editable={false}
                    className='border border-gray-300 rounded px-2 mb-4 w-full bg-gray-100'
                />

                {changesMade && (
                    <TouchableOpacity
                        className='bg-blue-500 rounded p-4 mt-4'
                        onPress={handleSaveProfile}
                    >
                        <Text className='text-center text-white text-lg font-semibold'>Save Changes</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

export default ViewProfileScreen;

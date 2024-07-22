import { SafeAreaView, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const FeedbackScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [feedbackType, setFeedbackType] = useState('');
    const [comments, setComments] = useState('');

    const handleSubmitFeedback = async () => {
        if (feedbackType === '' || comments === '') {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        const user = auth().currentUser;

        try {
            await firestore().collection('feedbacks').add({
                uid: user?.uid,
                feedbackType,
                comments,
                timestamp: firestore.FieldValue.serverTimestamp(),
            });
            Alert.alert("Success", "Feedback submitted successfully");
            setFeedbackType('');
            setComments('');
        } catch (error) {
            console.error("Error submitting feedback: ", error);
            Alert.alert("Error", "Failed to submit feedback");
        }
    };

    return (
        <SafeAreaView className='flex-1 bg-background px-8'>
            <View className='w-full h-full flex justify-center items-center'>
                <Text className='text-lg font-semibold mb-4'>Feedback Type *</Text>
                <View className='border border-gray-300 rounded mb-4 w-full'>
                    <Picker
                        selectedValue={feedbackType}
                        onValueChange={(itemValue) => setFeedbackType(itemValue)}
                    >
                        <Picker.Item label="Select feedback type" value="" />
                        <Picker.Item label="Bug Report" value="Bug Report" />
                        <Picker.Item label="Feature Request" value="Feature Request" />
                        <Picker.Item label="General Feedback" value="General Feedback" />
                    </Picker>
                </View>

                <Text className='text-lg font-semibold mb-2'>Comments *</Text>
                <TextInput
                    className='border border-gray-300 rounded px-2 mb-4 w-full'
                    placeholder="Your comments"
                    multiline
                    numberOfLines={4}
                    value={comments}
                    onChangeText={setComments}
                />

                <TouchableOpacity
                    className='bg-blue-500 rounded p-4 mt-4'
                    onPress={handleSubmitFeedback}
                >
                    <Text className='text-center text-white text-lg font-semibold'>Submit Feedback</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default FeedbackScreen;

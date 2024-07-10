import {Image, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";

const AboutUsScreen = () => {

    const handleEmailPress = () => {
        Linking.openURL('mailto:codevent23@gmail.com');
    };

    const handleContactPress = () => {
        Linking.openURL('tel:+94719172865');
    };

    const handleSocialMediaPress = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <SafeAreaView className='flex-1 bg-background px-8'>
            <ScrollView className='mt-8'>
                <Text className='text-sm mb-4'>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </Text>

                <View className='mb-6'>
                    <Text className='text-lg font-semibold mb-2'>Email</Text>
                    <TouchableOpacity onPress={handleEmailPress}>
                        <Text className='text-blue-500'>codevent23@gmail.com</Text>
                    </TouchableOpacity>
                </View>

                <View className='mb-6'>
                    <Text className='text-lg font-semibold mb-2'>Contact</Text>
                    <TouchableOpacity onPress={handleContactPress}>
                        <Text className='text-blue-500'>+9471 917 2865</Text>
                    </TouchableOpacity>
                </View>

                <View className='mb-6'>
                    <Text className='text-lg font-semibold mb-2'>HQ</Text>
                    <TouchableOpacity>
                        <Text className='text-blue-500'>30/9, Fonseka Place, Kalutara</Text>
                    </TouchableOpacity>
                </View>

                <Text className='text-sm mb-4'>
                    Your feedback The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                </Text>

                <View className='flex flex-row justify-center space-x-4 mt-10 mb-4'>
                    <TouchableOpacity onPress={() => handleSocialMediaPress('https://facebook.com')}>
                        <Image source={require('../../../../assets/images/about-facebook.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSocialMediaPress('https://instagram.com')}>
                        <Image source={require('../../../../assets/images/about-insta.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSocialMediaPress('https://google.com')}>
                        <Image source={require('../../../../assets/images/about-mail.png')}/>
                    </TouchableOpacity>
                </View>

                <Text className='text-center text-sm text-secondary'>Version 8.0</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AboutUsScreen;

import { Image, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

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
                    Welcome to JourneyFlex, an innovative solution brought to you by Codevent Company. We are passionate about transforming the daily commute into a seamless, stress-free experience for everyone. Our mission is to simplify transportation and enhance the lives of commuters through cutting-edge technology and user-friendly applications.
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
                    Join us on this journey towards smarter, more enjoyable commutes. Discover the benefits of JourneyFlex and let us help you navigate the world of transportation with ease.
                </Text>

                <View className='flex flex-row justify-center space-x-4 mt-10 mb-4'>
                    <TouchableOpacity onPress={() => handleSocialMediaPress('https://web.facebook.com/people/CodEvent/61553105926252/')}>
                        <Image source={require('../../../../assets/images/about-facebook.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSocialMediaPress('https://www.instagram.com/codevent23/')}>
                        <Image source={require('../../../../assets/images/about-insta.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSocialMediaPress('mailto:codevent23@gmail.com')}>
                        <Image source={require('../../../../assets/images/about-mail.png')} />
                    </TouchableOpacity>
                </View>

                <Text className='text-center text-sm text-secondary'>Version 1.0</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AboutUsScreen;

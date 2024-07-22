import {Image, SafeAreaView, ScrollView, TextInput, TouchableOpacity, View, Text} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useState} from "react";
import HighwayPackage from "../../../interfaces/HighwayPackage";
import HighwayPackageCard from "../../../components/HighwayPackageCard";


const HighwayPackagesScreen = () => {

    const [highwayPackages, setHighwayPackages] = useState<HighwayPackage[]>([
        {
            startingLocation: 'Panadura',
            destination: 'Maharagama',
            duration: 45,
            distance: 35,
            price: 200,
            activeTime: 30
        }
    ]);

    return (
        <KeyboardAwareScrollView style={{flex: 1}}>
            <SafeAreaView className=' w-full h-full bg-background'>
                <View className='bg-primary w-full h-24 justify-center items-center px-4'>
                    <View className='flex flex-row items-center bg-white rounded-full shadow p-1'>
                        <TextInput placeholder="Search" className='flex-1 pl-4 text-lg'/>
                        <Image source={require('../../../../assets/images/search-icon.png')} className='w-6 h-6 mr-2'/>
                    </View>
                </View>
                <ScrollView contentContainerStyle={{flexGrow: 1}} className='px-4 py-4'>
                    {highwayPackages ?
                        highwayPackages?.map((highwayPackage, index) => (
                            <HighwayPackageCard
                                key={index}
                                startingLocation={highwayPackage.startingLocation}
                                destination={highwayPackage.destination}
                                duration={highwayPackage.duration}
                                distance={highwayPackage.distance}
                                price={highwayPackage.price}
                                activeTime={highwayPackage.activeTime}
                            />
                        ))

                        :

                        <View className='flex w-screen h-screen justify-center items-center'>
                            <Text>No Packages Available.</Text>
                        </View>
                    }
                </ScrollView>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default HighwayPackagesScreen;

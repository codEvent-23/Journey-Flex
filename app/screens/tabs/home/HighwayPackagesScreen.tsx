import {Image, SafeAreaView, ScrollView, TextInput, TouchableOpacity, View, Text, Alert} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useEffect, useState} from "react";
import HighwayPackage from "../../../interfaces/HighwayPackage";
import HighwayPackageCard from "../../../components/HighwayPackageCard";
import firestore from "@react-native-firebase/firestore";
import {useUser} from "../../../context/UserContext";
import auth from "@react-native-firebase/auth";


const HighwayPackagesScreen = () => {

    const [highwayPackages, setHighwayPackages] = useState<HighwayPackage[]>([]);
    const {topUpBalance, refreshUserData} = useUser();
    const user = auth().currentUser;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await firestore().collection('highwayPackages').get();
                const documents = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                // @ts-ignore
                setHighwayPackages(documents);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, []);

    const savePurchase = async (highwayPackage: HighwayPackage) => {
        const userQuerySnapshot = await firestore()
            .collection("users")
            .where("userId", "==", user?.uid)
            .get();

        if (!userQuerySnapshot.empty) {
            const userDoc = userQuerySnapshot.docs[0];
            const userData = userDoc.data();

            const newTopUpBalance = userData.topUpBalance - highwayPackage.price;

            await firestore()
                .collection("users")
                .doc(userDoc.id)
                .update({
                    topUpBalance: newTopUpBalance
                });

            await firestore()
                .collection("packagePurchase")
                .add({
                    packageId: highwayPackage.id,
                    userId: user?.uid,
                    date: firestore.Timestamp.fromDate(new Date())
                })
            refreshUserData();

            Alert.alert('Activation Successful', 'You have successfully activated the package.');
        } else {
            console.log('No user found with this userId');
            Alert.alert('Activation Failed', 'User not found.');
        }
    }

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
                                data={highwayPackage}
                                handler={() => {
                                    if (topUpBalance >= highwayPackage.price) {
                                        Alert.alert(
                                            'Activation Confirmation',
                                            'Are you sure you want to activate?',
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => console.log('Activation cancelled'),
                                                    style: 'cancel',
                                                },
                                                {
                                                    text: 'Activate',
                                                    onPress: async () => {
                                                        await savePurchase(highwayPackage);
                                                    },
                                                },
                                            ],
                                            { cancelable: false }
                                        );
                                    } else {
                                        Alert.alert('Invalid Balance', 'please recharge your account to activate this package.');
                                    }
                                }}
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

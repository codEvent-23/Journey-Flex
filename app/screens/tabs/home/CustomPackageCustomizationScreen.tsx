import {Image, SafeAreaView, TextInput, View} from "react-native";
import {GooglePlaceData, GooglePlaceDetail} from "react-native-google-places-autocomplete";
import MapView, {Marker} from "react-native-maps";
import React, {useEffect, useMemo, useRef, useState} from "react";
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import MapViewDirections from 'react-native-maps-directions';
import LocationInput from "../../../components/LocationInput";
import {GOOGLE_MAPS_APIKEY} from "@env";
import SCREENS from "../../index";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../../navigation/HomeStackNavigation";
import LocationWithName from "../../../interfaces/LocationWithName";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const CustomPackageCustomizationScreen:React.FC<Props> = ({navigation}) => {

    const [startingLocation, setStartingLocation] = useState<LocationWithName | null>(null);
    const [destination, setDestination] = useState<LocationWithName | null>(null);
    const [busType, setBusType] = useState<string | undefined>(undefined);
    const [routesCount, setRoutesCount] = useState<string | null>(null);
    const [travelDistance, setTravelDistance] = useState<number | null>(null);
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        if (!startingLocation || !destination) return;
        if (mapRef.current) {
            mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
                edgePadding: { top: 20, right: 20, left: 20, bottom: 20}
            });
        }
    }, [startingLocation, destination]);

    useEffect(() => {
        if (!startingLocation || !destination) return;
        const getTravelDistance = async() => {
            const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${startingLocation.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                const distance = data.rows[0].elements[0].distance.value;
                setTravelDistance(distance / 1000);
                console.log(distance)
            } catch (error) {
                console.error("Error fetching travel distance: ", error);
            }
        }
        getTravelDistance();
    }, [startingLocation, destination, GOOGLE_MAPS_APIKEY]);

    useEffect(() => {
        if (startingLocation && destination && routesCount && travelDistance !== null && busType !== undefined) {
            navigation.navigate(SCREENS.SUMMARY, {
                startingLocation,
                destination,
                busType,
                travelDistance,
                routesCount: routesCount ?? '',
            });
        }
    }, [startingLocation, destination, busType, travelDistance, routesCount, navigation]);

    const radioButtons: RadioButtonProps[] = useMemo(() => ([
        {
            id: 'NonAC',
            label: 'Non-AC',
            color: '#1877F2'
        },
        {
            id: 'AC',
            label: 'AC',
            color: '#1877F2'
        }
    ]), []);

    const initialRegion = {
        "latitude": 7.63437258413393,
        "latitudeDelta": 3.182398495705665,
        "longitude": 80.60857135802507,
        "longitudeDelta": 3.7595558166503906
    }

    function handleStartingLocationInput(data:GooglePlaceData, details:GooglePlaceDetail | null = null) {
        if (details) {
            const { lat, lng } = details.geometry.location;
            setStartingLocation({latitude: lat, longitude: lng, description: data.description});
        }
    }

    function handleDestinationInput(data:GooglePlaceData, details:GooglePlaceDetail | null = null) {
        if (details) {
            const { lat, lng } = details.geometry.location;
            setDestination({latitude: lat, longitude: lng, description: data.description});
        }
    }

    return (
        <SafeAreaView className='flex-1'>
            <MapView
                ref={mapRef}
                initialRegion={initialRegion}
                mapType='mutedStandard'
                className='flex-1 w-full h-full'
            >
                {startingLocation && (
                    <Marker
                        coordinate={{
                            latitude: startingLocation.latitude,
                            longitude: startingLocation.longitude,
                        }}
                        title={startingLocation.description}
                        description='Starting Location'
                        identifier='origin'
                        image={require('../../../../assets/images/map-marker.png')}
                    />
                )}
                {destination && (
                    <Marker
                        coordinate={{
                            latitude: destination.latitude,
                            longitude: destination.longitude,
                        }}
                        title={destination.description}
                        description='Destination'
                        identifier='destination'
                    />
                )}
                {startingLocation && destination && (
                    <MapViewDirections
                        origin={startingLocation.description}
                        destination={destination.description}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={5}
                        strokeColor='#1877F2'
                    />
                )}
            </MapView>
            <View className='flex-1 justify-center items-center w-full h-full p-8 bg-background'>
                <View className='bg-white rounded-2xl p-4'>
                    <LocationInput placeholder='Enter starting location' onPressHandler={handleStartingLocationInput}/>
                    <LocationInput placeholder='Enter destination' onPressHandler={handleDestinationInput}/>
                    <View className='flex-row items-center w-64 mb-4'>
                        <Image source={require('../../../../assets/images/custom-routes.png')} className='mr-2'/>
                        <TextInput
                            placeholder='  Enter Routes per day'
                            className='w-full text-lg border-b-2 border-gray-400 mt-1'
                            keyboardType='number-pad'
                            value={routesCount ?? ''}
                            onChangeText={setRoutesCount}
                        />
                    </View>
                    <RadioGroup
                        radioButtons={radioButtons}
                        onPress={setBusType}
                        selectedId={busType}
                        layout='row'
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CustomPackageCustomizationScreen;

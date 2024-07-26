import {Image, View} from "react-native";
import {GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {GOOGLE_MAPS_APIKEY} from "@env";
import {PROVIDER_GOOGLE} from "react-native-maps"

interface LocationInputProps {
    placeholder: string;
    onPressHandler: (data:GooglePlaceData, details:GooglePlaceDetail | null) => void;
}

const LocationInput = (props: LocationInputProps) => {

    return (
        <View className='flex-row items-center w-full mb-2'>
            <Image source={require('../../assets/images/custom-location1.png')} className='mr-2'/>
            <GooglePlacesAutocomplete
                placeholder={props.placeholder}
                onPress={props.onPressHandler}
                onFail={(data) => {console.log(data)}}
                fetchDetails={true}
                nearbyPlacesAPI='GooglePlacesSearch'
                enablePoweredByContainer={false}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en',
                }}
                debounce={400}
                styles={{
                    container: {
                        width: '100%',
                    },
                    textInput: {
                        borderBottomWidth: 2,
                        borderBottomColor: '#b2b2b2',
                        borderRadius: 0,
                        fontSize: 18,
                    },
                }}
            />
        </View>
    )
}

export default LocationInput;

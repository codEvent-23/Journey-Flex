import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Image, ImageSourcePropType, TouchableOpacity} from "react-native";
import SCREENS from "../screens";
interface BackBtnProps{
    screen: SCREENS;
    image: ImageSourcePropType;
}

const BackBtn = (props: BackBtnProps) => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(props.screen)}>
            <Image
                source={props.image}
                style={{ width: 28, height: 28, marginLeft: 15 }}
            />
        </TouchableOpacity>
    )
}

export default BackBtn;

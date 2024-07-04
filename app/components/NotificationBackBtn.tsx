import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Image, TouchableOpacity} from "react-native";
import SCREENS from "../screens";

const NotificationBackBtn = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.HOME)}>
            <Image
                source={require('../../assets/images/back-arrow.png')}
                style={{ width: 28, height: 28, marginLeft: 15 }}
            />
        </TouchableOpacity>
    )
}

export default NotificationBackBtn;

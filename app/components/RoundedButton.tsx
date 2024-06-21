import {Text, TouchableOpacity} from "react-native";

interface RoundedBtnProps {
    title: string;
    fontSize: string;
    marginRight: string;
    handler: () => void;
}

const RoundedButton = (props: RoundedBtnProps) => {
    return (
        <TouchableOpacity className={`bg-primary px-8 py-2 rounded-2xl mr-${props.marginRight}`} onPress={props.handler}>
            <Text className={`text-white text-${props.fontSize}`}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default RoundedButton;

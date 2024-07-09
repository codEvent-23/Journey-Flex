import {Text, TouchableOpacity} from "react-native";

interface RoundedBtnProps {
    title: string;
    fontSize: string;
    marginRight?: string;
    marginBottom?: string;
    handler: () => void;
}

const RoundedButton = (props: RoundedBtnProps) => {
    return (
        <TouchableOpacity className={`bg-primary px-8 py-2 rounded-xl mr-${props.marginRight} mb-${props.marginBottom}`} onPress={props.handler}>
            <Text className={`text-white text-${props.fontSize} text-center`}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default RoundedButton;

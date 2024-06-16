import {Text, TouchableOpacity} from "react-native";

interface NextButtonProps {
    title: string;
    handler: () => void;
}

const NextButton = (props: NextButtonProps) => {
    return(
        <TouchableOpacity className="bg-blue-500 rounded p-3" onPress={props.handler}>
            <Text className="text-center text-white text-lg">{props.title}</Text>
        </TouchableOpacity>
    )
}

export default NextButton;

import {Text, TouchableOpacity} from "react-native";

interface QuickTopUpCardProps {
    title: string;
}

const QuickTopUpCard = (props: QuickTopUpCardProps) => {

    return (
        <TouchableOpacity className='bg-background px-2 py-1 rounded-2xl shadow shadow-black'>
            <Text>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default QuickTopUpCard;

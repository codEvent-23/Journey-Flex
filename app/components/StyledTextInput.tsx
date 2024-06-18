import {Text, TextInput, View} from "react-native";

interface StyledTextInputProps{
    title: string;
    placeholder: string;
    value: string;
    onChange: (text: string) => void;
}

const StyledTextInput = (props: StyledTextInputProps) => {

    return (
        <View className='mb-6'>
            <Text className='text-gray-700 mb-2'>{props.title}</Text>
            <TextInput
                className='border-b border-gray-300 text-lg py-2'
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={props.onChange}
            />
        </View>
    )
}

export default StyledTextInput;

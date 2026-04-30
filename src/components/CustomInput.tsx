import { TextInput, TouchableOpacity, View, Text } from "react-native";
import IonIcons from '@expo/vector-icons/Ionicons';

type Props = {
    type: 'text' | 'email' | 'password' | 'number';
    placeholder: string;
    value: string;
    onChange: (text: string) => void;
}   

export default function CustomInput({type, placeholder, value,onChange}: Props) {
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
            /> 

            <TouchableOpacity>
                <Text>Icon Buttons</Text>
                <IonIcons name={"eye"} size={14} color="black" />
            </TouchableOpacity>  
        </View>
    );
}
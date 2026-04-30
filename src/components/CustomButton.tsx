import { TouchableOpacity, Text, StyleSheet } from "react-native";

type variant = 'primary' | 'secondary' | 'tertiary';

type CustomButtonProps = {
    title: string;
    onPress: () => void;
    variant: variant;
}


export default function CustomButton({title, onPress, variant}: CustomButtonProps) {
        const style = getStyles(variant);

    return (
        <TouchableOpacity onPress={onPress} style={style.button}>
            <Text style={style.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}   

const getStyles = (variant: variant) => StyleSheet.create({
    button: {
        backgroundColor: variant === 'primary' ? 'blue' : variant === 'secondary' ? 'gray' : 'green',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
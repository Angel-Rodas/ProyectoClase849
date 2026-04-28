import { TouchableOpacity, Text, StyleSheet } from "react-native";

type CustomButtonProps = {
    title: string;
    onPress: () => void;
}


export default function CustomButton({title, onPress}: CustomButtonProps) {
    
    
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}   

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
import { useState } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type InputType = 'text' | 'email' | 'password' | 'number';

type Props = {
  type: InputType;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
};

// Cada tipo de campo necesita un teclado distinto para que la captura sea comoda.
const keyboardByType: Record<InputType, KeyboardTypeOptions> = {
  text: 'default',
  email: 'email-address',
  number: 'numeric',
  password: 'default',
};

export default function CustomInput({ type, placeholder, value, onChange }: Props) {
  const isPassword = type === 'password';
  const [hidden, setHidden] = useState(isPassword);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9aa0a6"
        value={value}
        onChangeText={onChange}
        secureTextEntry={isPassword && hidden}
        keyboardType={keyboardByType[type]}
        autoCapitalize={type === 'email' ? 'none' : 'sentences'}
        autoCorrect={false}
      />

      {isPassword && (
        <TouchableOpacity onPress={() => setHidden((prev) => !prev)} style={styles.icon}>
          <Ionicons name={hidden ? 'eye-off' : 'eye'} size={20} color="#5f6368" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d0d3d8',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#202124',
  },
  icon: {
    padding: 4,
  },
});

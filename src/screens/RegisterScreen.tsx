import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import ScreenWrapper from '../components/ScreenWrapper';
import { supabase } from '../../lib/supabase';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // Validacion basica: ningun campo puede quedar vacio.
    if (!name.trim() || !phoneNumber.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los campos para continuar.');
      return;
    }

    // Registro contra Supabase Auth con correo y contrasena. Los datos extra
    // (nombre y telefono) se guardan en la metadata del usuario.
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: name.trim(), phone_number: phoneNumber.trim() },
      },
    });

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    if (data.user) {
      Alert.alert('Registro exitoso', 'Tu cuenta fue creada. Ahora inicia sesion.');
      navigation.navigate('Login');
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Registrate para empezar a usar MiAppSkincare</Text>
      </View>

      <CustomInput type="text" placeholder="Nombre completo" value={name} onChange={setName} />
      <CustomInput
        type="number"
        placeholder="Numero de telefono"
        value={phoneNumber}
        onChange={setPhoneNumber}
      />
      <CustomInput type="email" placeholder="Correo electronico" value={email} onChange={setEmail} />
      <CustomInput type="password" placeholder="Contrasena" value={password} onChange={setPassword} />

      <CustomButton title="Registrarse" variant="primary" onPress={handleRegister} />

      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Ya tengo una cuenta
      </Text>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#202124',
  },
  subtitle: {
    fontSize: 14,
    color: '#5f6368',
    marginTop: 4,
  },
  link: {
    textAlign: 'center',
    color: '#1a73e8',
    marginTop: 16,
    fontSize: 14,
  },
});

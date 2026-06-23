import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import ScreenWrapper from '../components/ScreenWrapper';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // El inicio de sesion contra Supabase se conecta en una actividad posterior.
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.title}>MiAppSkincare</Text>
        <Text style={styles.subtitle}>Inicia sesion para continuar</Text>
      </View>

      <CustomInput type="email" placeholder="Correo electronico" value={email} onChange={setEmail} />
      <CustomInput type="password" placeholder="Contrasena" value={password} onChange={setPassword} />

      <CustomButton title="Entrar" variant="primary" onPress={handleLogin} />

      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Crear una cuenta nueva
      </Text>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
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

import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import ScreenWrapper from '../components/ScreenWrapper';
import { supabase } from '../../lib/supabase';

// Permite que el navegador de autenticacion se cierre solo al regresar a la app.
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Campos incompletos', 'Ingresa tu correo y contrasena.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    navigation.navigate('Products');
  };

  const handleGoogleLogin = async () => {
    // La URL de retorno usa el scheme de la app (miapmovil://) definido en app.json.
    const redirectTo = Linking.createURL('/');

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo, skipBrowserRedirect: true },
    });

    if (error || !data?.url) {
      Alert.alert('Error', error?.message ?? 'No se pudo iniciar el flujo de Google.');
      return;
    }

    // Abre el consentimiento de Google y espera el redireccion de vuelta a la app.
    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

    if (result.type !== 'success' || !result.url) {
      return;
    }

    // En el flujo PKCE, Supabase regresa un "code" que se canjea por la sesion.
    const { queryParams } = Linking.parse(result.url);
    const code = queryParams?.code as string | undefined;

    if (code) {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) {
        Alert.alert('Error', exchangeError.message);
        return;
      }
    }

    navigation.navigate('Products');
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

      <View style={styles.separator}>
        <Text style={styles.separatorText}>o</Text>
      </View>

      <CustomButton title="Continuar con Google" variant="secondary" onPress={handleGoogleLogin} />

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
  separator: {
    alignItems: 'center',
    marginVertical: 12,
  },
  separatorText: {
    color: '#9aa0a6',
    fontSize: 13,
  },
  link: {
    textAlign: 'center',
    color: '#1a73e8',
    marginTop: 16,
    fontSize: 14,
  },
});

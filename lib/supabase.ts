import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Las credenciales se leen desde el archivo .env usando el mecanismo EXPO_PUBLIC_*
// de Expo. Nunca se escriben directamente aqui. Ver .env.example para las llaves
// que el proyecto necesita.
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Permite que la interfaz avise temprano si falta configurar el .env,
// en lugar de fallar despues con un error confuso.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// El adaptador de AsyncStorage es lo que muchos olvidan: sin el, la sesion
// de autenticacion se pierde cada vez que la app se reinicia.
export const supabase = createClient(
  supabaseUrl ?? 'http://localhost:54321',
  supabaseAnonKey ?? 'placeholder-anon-key',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

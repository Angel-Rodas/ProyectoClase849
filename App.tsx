import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { isSupabaseConfigured } from './lib/supabase';

// Lee la URL desde el .env solo para mostrarla como evidencia de que las
// variables de entorno se cargan. La llave anonima NUNCA se imprime en pantalla.
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '(no definida)';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Conexion con Supabase (.env)</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Estado</Text>
          <Text style={[styles.value, isSupabaseConfigured ? styles.ok : styles.fail]}>
            {isSupabaseConfigured ? 'Configurado' : 'Sin configurar'}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>EXPO_PUBLIC_SUPABASE_URL</Text>
          <Text style={styles.value} numberOfLines={1}>
            {supabaseUrl}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>EXPO_PUBLIC_SUPABASE_ANON_KEY</Text>
          <Text style={styles.value}>
            {isSupabaseConfigured ? 'Cargada (oculta por seguridad)' : 'No cargada'}
          </Text>
        </View>
      </View>

      <Text style={styles.note}>
        Las credenciales se leen del archivo .env mediante el prefijo EXPO_PUBLIC_.
        El .env esta en .gitignore y nunca se sube al repositorio.
      </Text>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  row: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  ok: {
    color: '#16a34a',
  },
  fail: {
    color: '#dc2626',
  },
  note: {
    marginTop: 20,
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
  },
});

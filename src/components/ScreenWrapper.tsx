import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
};

// Contenedor base de las pantallas: respeta el area segura del dispositivo y
// aplica el mismo padding para mantener la consistencia visual en toda la app.
export default function ScreenWrapper({ children }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f5f6f8',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

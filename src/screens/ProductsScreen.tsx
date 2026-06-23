import { StyleSheet, Text } from 'react-native';

import ScreenWrapper from '../components/ScreenWrapper';

export default function ProductsScreen() {
  return (
    <ScreenWrapper>
      <Text style={styles.title}>Productos</Text>
      <Text style={styles.subtitle}>Aqui se mostraran los productos.</Text>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#202124',
  },
  subtitle: {
    fontSize: 14,
    color: '#5f6368',
    marginTop: 6,
  },
});

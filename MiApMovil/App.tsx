import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from './src/components/CustomButton';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <CustomButton title="PRESS ME BRO" onPress={() =>{console.log('BUTTON OF BROS!')} } />  
      <CustomButton title="PRESS ME BRO x 2" onPress={() =>{console.log('BUTTON OF BROS!\nBUTTON OF BROS!')} } />  

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

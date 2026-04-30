import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from './src/components/CustomButton';
import CustomInput from './src/components/CustomInput';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <CustomInput type='text' placeholder='Type here...' value={''} onChange={(text) => {console.log(text)}} />
      <CustomButton title="PRESS ME BRO" onPress={() =>{console.log('BUTTON OF BROS!')} } variant='primary' />  
      <CustomButton title="PRESS ME BRO x 2" onPress={() =>{console.log('BUTTON OF BROS!\nBUTTON OF BROS!')} } variant='secondary' />  
      <CustomButton title="PRESS ME BRO x 3" onPress={() =>{console.log('BUTTON OF BROS!\nBUTTON OF BROS!\nBUTTON OF BROS!')} } variant='tertiary' />  

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

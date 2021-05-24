import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {setNavigator} from './src/navigationRefs';
import AppNavigation from './src/screens/AppNavigation';

export default function App() {
  return (
    <NavigationContainer ref={navigator => setNavigator(navigator)}>
      <SafeAreaProvider>
        <PaperProvider theme={DefaultTheme} >
          <AppNavigation/>
        </PaperProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

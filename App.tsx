import {StatusBar} from 'expo-status-bar';
import {NativeBaseProvider} from 'native-base';
import React, {useEffect} from 'react';
import {AuthProvider} from './src/hooks';
import SplashScreen from 'react-native-splash-screen';
import {Routes} from './src/Routes/index.routes';
import {SSRProvider} from '@react-aria/ssr';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import {Load} from './src/Components';
import {theme} from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SSRProvider>
      <NativeBaseProvider theme={theme}>
        <AuthProvider>
          <StatusBar style="light" translucent />
          {fontsLoaded ? <Routes /> : <Load />}
        </AuthProvider>
      </NativeBaseProvider>
    </SSRProvider>
  );
}

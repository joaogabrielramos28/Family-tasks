import {StatusBar} from 'expo-status-bar';
import {NativeBaseProvider} from 'native-base';
import React, {useEffect} from 'react';
import {AuthProvider} from './src/hooks';
import SplashScreen from 'react-native-splash-screen';
import {Routes} from './src/Routes/index.routes';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        <Routes />
      </AuthProvider>
    </NativeBaseProvider>
  );
}

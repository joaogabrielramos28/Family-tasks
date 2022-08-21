import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TabsRoutes} from './app.tabs.routes';
import {AuthRoutes} from './auth.routes';
import {useAuth} from '../hooks';

const Routes = () => {
  const {user} = useAuth();
  return (
    <NavigationContainer>
      {user ? <TabsRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export {Routes};

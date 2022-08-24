import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CreateGroup,
  GroupDetails,
  GroupList,
  Notifications,
  SignIn,
  SignUp,
  TaskDetails,
  Tasks,
  Welcome,
} from '../Screens';

const {Navigator, Screen} = createStackNavigator();

const StackTasksRoutes = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="TasksStack" component={Tasks} />
      <Screen name="TaskDetails" component={TaskDetails} />
    </Navigator>
  );
};

const StackGroupsRoutes = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="GroupList" component={GroupList} />
      <Screen name="GroupDetails" component={GroupDetails} />
      <Screen name="Notifications" component={Notifications} />
      <Screen name="CreateGroup" component={CreateGroup} />
    </Navigator>
  );
};

const StackWelcomeRoutes = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Welcome" component={Welcome} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
};

export {StackTasksRoutes, StackGroupsRoutes, StackWelcomeRoutes};

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignIn, SignUp, Welcome } from "../Screens";

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Welcome"}
    >
      <Screen name="Welcome" component={Welcome} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
};

export { AuthRoutes };

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignIn, SignInPhone, SignUp, Welcome } from "../Screens";
import { ConfirmationCodeScreen } from "../Screens/SignInPhone/Confirmation";

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
      <Screen name="SignInPhone" component={SignInPhone} />
      <Screen name="ConfirmationCode" component={ConfirmationCodeScreen} />
    </Navigator>
  );
};

export { AuthRoutes };

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TaskDetails, Tasks } from "../Screens";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "native-base";

const { Navigator, Screen } = createStackNavigator();

const StackRoutes = () => {
  const theme = useTheme();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="TasksStack" component={Tasks} />
      <Screen name="TaskDetails" component={TaskDetails} />
    </Navigator>
  );
};

export { StackRoutes };

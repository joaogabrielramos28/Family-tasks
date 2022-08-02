import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { GroupDetails, Grouplist, TaskDetails, Tasks } from "../Screens";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "native-base";

const { Navigator, Screen } = createStackNavigator();

const StackTasksRoutes = () => {
  const theme = useTheme();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="TasksStack" component={Tasks} />
      <Screen name="TaskDetails" component={TaskDetails} />
    </Navigator>
  );
};

const StackGroupsRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="GroupList" component={Grouplist} />
      <Screen name="GroupDetails" component={GroupDetails} />
    </Navigator>
  );
};

export { StackTasksRoutes, StackGroupsRoutes };

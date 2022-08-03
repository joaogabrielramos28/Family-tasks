import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Icon, IconButton, useTheme } from "native-base";

import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";

import { CreateTask, Home, Profile, TaskDetails, Tasks } from "../Screens";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

const { Screen, Navigator } = createBottomTabNavigator();

import {
  StackTasksRoutes,
  StackGroupsRoutes,
  StackWelcomeRoutes,
} from "./app.stack.routes";

const TabsRoutes = () => {
  const theme = useTheme();
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={({}) => ({
        headerShown: false,
        tabBarInactiveBackgroundColor: "transparent",

        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: theme.colors.muted[900],
          position: "absolute",
          bottom: getStatusBarHeight(),
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 60,
          paddingVertical: 5,
          height: 60,
        },
        tabBarActiveTintColor: theme.colors.indigo[500],
        tabBarInactiveTintColor: theme.colors.light[500],
        tabBarShowLabel: false,
      })}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Screen
        name="Tasks"
        component={StackTasksRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="tasks" size={24} color={color} />
          ),
        }}
      />
      <Screen
        name="New"
        component={CreateTask}
        options={{
          tabBarIcon: ({}) => (
            <BorderlessButton>
              <IconButton
                style={{
                  top: -5,
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  backgroundColor: theme.colors.light[50],
                  shadowColor: theme.colors.indigo[300],
                  shadowOffset: { width: 1.8, height: 0 },
                  shadowOpacity: 1.0,
                }}
                icon={
                  <Icon
                    as={AntDesign}
                    color={theme.colors.indigo[500]}
                    size={"4xl"}
                    name={"plus"}
                  />
                }
              />
            </BorderlessButton>
          ),
        }}
      />
      <Screen
        name="Group"
        component={StackGroupsRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="group" size={24} color={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={26} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};

export { TabsRoutes };

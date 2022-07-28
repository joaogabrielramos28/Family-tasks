import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../Screens";
import { Icon, IconButton, useTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { CreateTask } from "../Screens/CreateTask";

const { Screen, Navigator } = createBottomTabNavigator();
const Routes = () => {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarInactiveBackgroundColor: "transparent",

          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: theme.colors.muted[900],
            position: "absolute",
            bottom: 10,
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
              <Feather name="home" size={24} color={color} />
            ),
          }}
        />
        <Screen
          name="Tasks"
          component={Home}
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
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="group" size={24} color={color} />
            ),
          }}
        />
        <Screen
          name="Profile"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="user" size={26} color={color} />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export { Routes };

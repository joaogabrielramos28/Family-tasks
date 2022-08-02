import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TabsRoutes } from "./app.tabs.routes";
import { StackRoutes } from "./app.stack.routes";
const Routes = () => {
  return (
    <NavigationContainer>
      <TabsRoutes />
    </NavigationContainer>
  );
};

export { Routes };

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TabsRoutes } from "./app.tabs.routes";
import { AuthRoutes } from "./auth.routes";

const Routes = () => {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <NavigationContainer>
      {isAuth ? <TabsRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export { Routes };

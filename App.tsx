import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { AuthProvider } from "./src/hooks";

import { Routes } from "./src/Routes/index.routes";

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        <Routes />
      </AuthProvider>
    </NativeBaseProvider>
  );
}

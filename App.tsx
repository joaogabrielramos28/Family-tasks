import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import React from "react";

import { Routes } from "./src/Routes/index.routes";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar style="dark" />
      <Routes />
    </NativeBaseProvider>
  );
}

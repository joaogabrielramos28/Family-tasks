import React, { useContext, createContext, useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { IAuthContextProps } from "./types";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: "",
  scopes: ["profile", "email"],
});

const AuthContext = createContext({} as IAuthContextProps);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleSignUpWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const user = await auth().createUserWithEmailAndPassword(email, password);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider value={{ handleSignUpWithEmailAndPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };

import React, { useContext, createContext, useState, useEffect } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { IAuthContextProps } from "./types";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  scopes: ["profile", "email"],
  webClientId:
    "961874457934-n3smoi3f0re8fa7i4lu1ikrktou4o3ac.apps.googleusercontent.com",
});

const AuthContext = createContext({} as IAuthContextProps);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.UserCredential | null>(
    null
  );
  console.log(user);

  const [initializing, setInitializing] = useState(true);

  const signUpWithEmailAndPassword = async (
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

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (name?: string, email?: string) => {
    try {
      email !== user.user.email &&
        (await auth().currentUser.updateEmail(email));
      name !== user.user.displayName &&
        (await auth().currentUser.updateProfile({
          displayName: name,
          //TODO: update photoURL
        }));
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function signInWithGoogle() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user = await auth().signInWithCredential(googleCredential);

    setUser(user);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signUpWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithGoogle,
        signOut,
        updateUser,
        initializing,
      }}
    >
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

import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {IAuthContextProps, IUser} from './types';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {uploadFile} from '../Utils/uploadFile';
GoogleSignin.configure({
  scopes: ['profile', 'email'],
  webClientId:
    '961874457934-n3smoi3f0re8fa7i4lu1ikrktou4o3ac.apps.googleusercontent.com',
});

const AuthContext = createContext({} as IAuthContextProps);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const [initializing, setInitializing] = useState(true);

  const signUpWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    try {
      setLoadingAuth(true);
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await firestore().collection('Users').doc(user.uid).set({});

      setUser(user);
    } catch (error) {
      setLoadingAuth(false);
      console.log(error);
    }
  };

  const signInWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    try {
      setLoadingAuth(true);
      const {user} = await auth().signInWithEmailAndPassword(email, password);
      setUser(user);
    } catch (error) {
      setLoadingAuth(false);
      console.log(error);
    }
  };

  const updateUser = async (name?: string, email?: string) => {
    try {
      email !== user?.email && (await auth().currentUser.updateEmail(email));
      name !== user?.displayName &&
        (await auth().currentUser.updateProfile({
          displayName: name,
        }));
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserPhoto = async (uri: string) => {
    const urlDownloadFile = await uploadFile(uri, 'users');

    await auth().currentUser.updateProfile({
      photoURL: urlDownloadFile,
    });
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const onAuthStateChanged = useCallback(
    (user): void => {
      if (user) setUser(user);

      if (initializing) setInitializing(false);
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  async function signInWithGoogle() {
    const {idToken} = await GoogleSignin.signIn();

    try {
      setLoadingAuth(true);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const {user} = await auth().signInWithCredential(googleCredential);

      setUser(user);
    } catch (error) {
      setLoadingAuth(false);
      console.log(error);
    }
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
        updateUserPhoto,
        initializing,
        loadingAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export {AuthProvider, useAuth};

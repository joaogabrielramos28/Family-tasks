import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
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
    name: string,
  ) => {
    try {
      setLoadingAuth(true);
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await firestore().collection('Users').doc(user?.uid).set({
        email,
        name,
      });
      await auth().currentUser.updateProfile({
        displayName: name,
      });

      setUser({...user, displayName: name, email});
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
    await firestore().collection('Users').doc(user?.uid).update({
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
      if (user) {
        setUser(user);
      }

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

  const resetPassword = async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (e) {
      console.log(e);
    }
  };

  const getPushToken = useCallback(
    async (pushToken: string) => {
      if (user?.uid) {
        const member = (
          await firestore().collection('Users').doc(user?.uid).get()
        ).data();

        if (member.pushTokenId !== null) {
          await firestore().collection('Users').doc(user?.uid).update({
            pushTokenId: pushToken,
          });
        }
      }
    },
    [user?.uid],
  );

  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const tokenFcm = messaging().getToken();

        return tokenFcm;
      }
    }

    requestUserPermission()
      .then(async res => {
        await getPushToken(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [getPushToken]);

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
        resetPassword,
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

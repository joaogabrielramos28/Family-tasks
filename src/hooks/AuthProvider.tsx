/* eslint-disable @typescript-eslint/no-floating-promises */
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  // useCallback,
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import messaging from '@react-native-firebase/messaging';
import {IAuthContextProps, IUser} from './types';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {uploadFile} from '../Utils/uploadFile';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  scopes: ['profile', 'email'],
  webClientId:
    '961874457934-n3smoi3f0re8fa7i4lu1ikrktou4o3ac.apps.googleusercontent.com',
});

const AuthContext = createContext({} as IAuthContextProps);

const USER_STORAGE_KEY = '@taskfy:user';

const AuthProvider = ({children}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  console.log(user);

  const signUpWithEmailAndPassword = async (
    email: string,
    password: string,
    name: string,
  ) => {
    try {
      setLoadingAuth(true);
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(account => {
          firestore()
            .collection('Users')
            .doc(account.user.uid)
            .set({
              email,
              name,
            })
            .then(() => {
              firestore()
                .collection('Users')
                .doc(account.user.uid)
                .get()
                .then(async userFirestore => {
                  if (userFirestore.exists) {
                    const userData = {
                      id: userFirestore.id,
                      ...userFirestore.data(),
                    } as IUser;

                    await AsyncStorage.setItem(
                      USER_STORAGE_KEY,
                      JSON.stringify(userData),
                    );

                    setUser(userData);
                  }
                })
                .catch((error: any) => {
                  console.log(error);
                });
            })
            .catch((error: any) => {
              console.log(error);
            });
        })
        .catch(() => Alert.alert('Registro', 'Houve um erro ao registar.'));
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
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(account => {
          firestore()
            .collection('Users')
            .doc(account.user.uid)
            .get()
            .then(async user => {
              if (user.exists) {
                const userData = {
                  ...user.data(),
                  id: user.id,
                } as IUser;

                await AsyncStorage.setItem(
                  USER_STORAGE_KEY,
                  JSON.stringify(userData),
                );
                setUser(userData);
              }
            })
            .catch((error: any) => {
              console.log(error);
            });
        });
    } catch (error) {
      setLoadingAuth(false);
      console.log(error);
    }
  };

  const loadStoragedUser = async () => {
    const storagedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
    const user = storagedUser ? JSON.parse(storagedUser) : {};

    setUser(user);
  };

  useEffect(() => {
    loadStoragedUser().catch(() => Alert.alert('Error ao manter os dados'));
  }, []);

  // const updateUser = async (name?: string, email?: string) => {
  //   try {
  //     email !== user?.email && (await auth().currentUser.updateEmail(email));
  //     name !== user?.displayName &&
  //       (await auth().currentUser.updateProfile({
  //         displayName: name,
  //       }));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const signOut = async () => {
    try {
      await auth().signOut();
      setUser(null);
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.log(error);
    }
  };

  async function signInWithGoogle() {
    const {idToken} = await GoogleSignin.signIn();

    try {
      setLoadingAuth(true);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth()
        .signInWithCredential(googleCredential)
        .then(account => {
          firestore()
            .collection('Users')
            .doc(account.user.uid)
            .get()
            .then(user => {
              if (!user.exists) {
                firestore().collection('Users').doc(account.user.uid).set({
                  email: account.user.email,
                  name: account.user.displayName,
                  photo_url: account.user.photoURL,
                });
              }
              firestore()
                .collection('Users')
                .doc(account.user.uid)
                .get()
                .then(async userFirestore => {
                  const userData = {
                    id: userFirestore.id,
                    ...userFirestore.data(),
                  } as IUser;

                  await AsyncStorage.setItem(
                    USER_STORAGE_KEY,
                    JSON.stringify(userData),
                  );

                  setUser(userData);
                });
            });
        });

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

  // const getPushToken = useCallback(
  //   async (pushToken: string) => {
  //     if (user?.uid) {
  //       const member = (
  //         await firestore().collection('Users').doc(user?.uid).get()
  //       ).data();

  //       if (member.pushTokenId !== null) {
  //         await firestore().collection('Users').doc(user?.uid).update({
  //           pushTokenId: pushToken,
  //         });
  //       }
  //     }
  //   },
  //   [user?.uid],
  // );

  // useEffect(() => {
  //   async function requestUserPermission() {
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //     if (enabled) {
  //       const tokenFcm = messaging().getToken();

  //       return tokenFcm;
  //     }
  //   }

  //   requestUserPermission()
  //     .then(async res => {
  //       await getPushToken(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, [getPushToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signUpWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithGoogle,
        signOut,
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

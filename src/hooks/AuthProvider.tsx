/* eslint-disable @typescript-eslint/no-floating-promises */
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {IAuthContextProps, IUser} from './types';
import {uploadFile} from '../Utils/uploadFile';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

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
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
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
            .catch(error => {
              console.log(error);
            });
        });
    } catch (error) {
      setLoadingAuth(false);
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
    } catch (error) {
      setLoadingAuth(false);
      console.log(error);
    }
  }
  const signInWithApple = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    // Sign the user in with the credential
    auth()
      .signInWithCredential(appleCredential)
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
  };

  const updateUser = async (name?: string, email?: string) => {
    try {
      if (!name || !email) {
        Alert.alert('Editar Perfil', 'Preencha todos os campos');
      }

      firestore().collection('Users').doc(user.id).update({
        email,
        name,
      });

      const userUpdated = {
        ...user,
        email,
        name,
      };

      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userUpdated));
      setUser(userUpdated);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserPhoto = async (uri: string): Promise<string> => {
    const {getDownloadURL, photoPath} = await uploadFile(uri, 'users');

    if (user.photo_path) {
      storage().ref(user.photo_path).delete();
    }

    firestore().collection('Users').doc(user.id).update({
      photo_url: getDownloadURL,
      photo_path: photoPath,
    });

    const response = await AsyncStorage.getItem(USER_STORAGE_KEY);
    const storageUser = response ? JSON.parse(response) : {};

    const updatedUser = {
      ...storageUser,
      photo_url: getDownloadURL,
      photo_path: photoPath,
    };

    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));

    setUser(updatedUser);

    return getDownloadURL;
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      setUser(null);
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.log(error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (e) {
      console.log(e);
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

  const getPushToken = useCallback(
    async (pushToken: string) => {
      if (user?.id) {
        const firestoreUser = (
          await firestore().collection('Users').doc(user?.id).get()
        ).data();

        if (firestoreUser.pushTokenId !== null) {
          await firestore().collection('Users').doc(user?.id).update({
            pushTokenId: pushToken,
          });

          const response = await AsyncStorage.getItem(USER_STORAGE_KEY);
          const storageUser = response ? JSON.parse(response) : {};

          const userData = {
            ...storageUser,
            pushTokenId: pushToken,
          } as IUser;

          await AsyncStorage.setItem(
            USER_STORAGE_KEY,
            JSON.stringify(userData),
          );
          setUser(userData);
        }
      }
    },
    [user?.id],
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
        signInWithApple,
        signOut,
        updateUser,
        updateUserPhoto,
        loadingAuth,
        resetPassword,
        USER_STORAGE_KEY,
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

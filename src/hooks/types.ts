import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export interface IAuthContextProps {
  user: FirebaseAuthTypes.UserCredential | null;
  signUpWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (name?: string, email?: string) => Promise<void>;
  initializing: boolean;
  signInWithGoogle(): Promise<void>;
}

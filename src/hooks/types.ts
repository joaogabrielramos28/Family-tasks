import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export interface IAuthContextProps {
  user: FirebaseAuthTypes.UserCredential | null;
  handleSignUpWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  handleSignInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
}

import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export interface IAuthContextProps {
  handleSignUpWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
}

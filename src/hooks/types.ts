export interface IAuthContextProps {
  user: IUser | null;
  signUpWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<void>;
  signInWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (name?: string, email?: string) => Promise<void>;
  updateUserPhoto: (uri: string) => Promise<void>;
  initializing: boolean;
  signInWithGoogle: () => Promise<void>;
  loadingAuth: boolean;
}

export interface IUser {
  displayName?: string;
  email: string;
  phoneNumber?: string;
  photoURL?: string;
  uid: string;
  hasGroup?: boolean;
}

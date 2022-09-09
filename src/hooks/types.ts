export interface IAuthContextProps {
  user: IUser | null;
  signUpWithEmailAndPassword: (
    email: string,
    password: string,
    name: string,
  ) => Promise<void>;
  signInWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  // updateUser: (name?: string, email?: string) => Promise<void>;
  // updateUserPhoto: (uri: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  loadingAuth: boolean;
  resetPassword: (email: string) => Promise<void>;
}

// export interface IUser {
//   displayName?: string;
//   email: string;
//   phoneNumber?: string;
//   photoURL?: string;
//   uid: string;
//   groupId?: string;
//   background?: string;
// }

export interface IUser {
  id: string;
  email: string;
  name: String;
}

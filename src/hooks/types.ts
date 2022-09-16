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
  updateUser: (name?: string, email?: string) => Promise<void>;
  updateUserPhoto: (uri: string) => Promise<string>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  loadingAuth: boolean;
  resetPassword: (email: string) => Promise<void>;
  USER_STORAGE_KEY: string;
  updateUserState: (user: IUser) => void;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  photo_url?: string;
  photo_path: string;
  groupInfo: {
    id: string;
    position: 'Administrator' | 'Member';
  };
  pushTokenId?: string;
}

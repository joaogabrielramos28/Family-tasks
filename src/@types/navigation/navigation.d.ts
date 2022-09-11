import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {ITask} from '../../DTOs/GroupDto';

export interface NotificationsNavigationParams {
  groupId: string;
}
export interface ConfirmationCodeNavigationParams {
  confirmation: FirebaseAuthTypes.ConfirmationResult;
}

export interface GroupDetailsNavigationParams {
  id: string;
}

export interface TasksDetailsNavigationParams {
  task: ITask;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignIn: undefined;
      SignUp: undefined;
      SignInPhone: undefined;
      ConfirmationCode: ConfirmationCodeNavigationParams;
      GroupDetails: GroupDetailsNavigationParams;
      CreateGroup: undefined;
      TaskDetails: TasksDetailsNavigationParams;
      Notifications: NotificationsNavigationParams;
    }
  }
}

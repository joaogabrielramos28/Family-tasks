import {BorderlessButtonProps} from 'react-native-gesture-handler';
import {IMember} from '../../../../DTOs/GroupDto';

export interface ITask extends BorderlessButtonProps {
  status: 'to do' | 'doing' | 'completed';
  title: string;
  category: string;
  responsible: IMember;
  date: string;
}

export enum Status {
  ToDo = 'to do',
  Doing = 'doing',
  Completed = 'completed',
}

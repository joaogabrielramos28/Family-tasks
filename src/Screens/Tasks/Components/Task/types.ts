import {IMember} from '../../../../DTOs/GroupDto';

export interface ITask {
  status: 'to do' | 'doing' | 'completed';
  id: string;
  title: string;
  category: string;
  responsible: IMember;
  date: Date;
}

export enum Status {
  ToDo = 'to do',
  Doing = 'doing',
  Completed = 'completed',
}

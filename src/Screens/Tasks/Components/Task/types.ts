export interface ITask {
  status: Status;
  id: string;
}

export enum Status {
  Doing = 'Doing',
  Completed = 'Completed',
}

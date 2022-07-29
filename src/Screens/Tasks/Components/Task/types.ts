export interface ITask {
  status: Status;
}

export enum Status {
  Doing = "Doing",
  Completed = "Completed",
}

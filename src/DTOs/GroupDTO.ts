export interface IGroupDto {
  id: string;
  name: string;
  admin: IMember;
  members: IMember[];
  tasks: ITask[];
  description: string;
  background: string;
  createdAt: Date;
}

export interface IMember {
  id: string;
  name: string;
  photoURL: string;
  position: string;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  relator: IMember;
  responsible: IMember;
  status: string;
  createdAt: string;
}

export interface IGroupDto {
  id: string;
  name: string;
  admin: IMember;
  members: IMember[];
  tasks: ITask[];
  notifications: INotification[];
  description: string;
  background?: string;
  photo_path?: string;
  createdAt: Date;
}

export interface IMember {
  id: string;
  email: string;
  name?: string;
  photo_url?: string;
  position?: string;
  pushTokenId?: string;
  groupInfo?: {
    id: string;
    position: 'Administrator' | 'Member';
  };
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

export interface INotification {
  id: string;
  member: IMember;
  group_id: string;
  message: string;
  createdAt: Date;
}

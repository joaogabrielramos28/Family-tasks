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
  group_id: string;
  name: string;
  description: string;
  category: string;
  relator: IMember;
  responsible: IMember;
  date: Date;
  status: 'to do' | 'doing' | 'completed';
}

export interface INotification {
  id: string;
  member: IMember;
  group_id: string;
  message: string;
  createdAt: Date;
}

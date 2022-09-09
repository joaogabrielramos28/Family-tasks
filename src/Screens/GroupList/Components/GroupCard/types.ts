import {IMember} from '../../../../DTOs/GroupDto';

export interface IGroupCardProps {
  id: string;
  name: string;
  description: string;
  members: IMember[];
  background?: string;
}

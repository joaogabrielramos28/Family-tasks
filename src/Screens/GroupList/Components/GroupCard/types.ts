import {IMember} from '../../../../DTOs/GroupDto';

export interface IGroupCardProps {
  name: string;
  description: string;
  members: IMember[];
}

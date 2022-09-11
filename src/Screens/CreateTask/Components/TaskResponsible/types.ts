import {BorderlessButtonProps} from 'react-native-gesture-handler';

export interface ITaskResponsibleProps extends BorderlessButtonProps {
  photo: string;
  selected?: boolean;
}

import {RectButtonProps} from 'react-native-gesture-handler';

export interface IBadgeProps extends RectButtonProps {
  title: string;
  selected?: boolean;
}

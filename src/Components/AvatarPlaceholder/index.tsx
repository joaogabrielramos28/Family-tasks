import {Box} from 'native-base';
import React from 'react';
import {theme} from '../../theme';

interface AvatarPlaceholderProps {
  size?: number;
}

export const AvatarPlaceholder = ({size = 12}: AvatarPlaceholderProps) => {
  return (
    <Box
      height={size}
      width={size}
      borderRadius={'full'}
      background={theme.colors.background[400]}
    />
  );
};

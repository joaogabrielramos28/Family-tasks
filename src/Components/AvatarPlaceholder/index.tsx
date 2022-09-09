import {Box} from 'native-base';
import React from 'react';

interface AvatarPlaceholderProps {
  size?: number;
}

export const AvatarPlaceholder = ({size = 12}: AvatarPlaceholderProps) => {
  return (
    <Box
      height={size}
      width={size}
      borderRadius={'full'}
      background={'warmGray.400'}
    />
  );
};

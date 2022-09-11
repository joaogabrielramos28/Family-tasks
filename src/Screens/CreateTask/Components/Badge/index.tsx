import {Button} from 'native-base';
import React from 'react';
import {RectButton} from 'react-native-gesture-handler';
import {IBadgeProps} from './types';

const Badge = ({title, selected, onPress, ...rest}: IBadgeProps) => {
  return (
    <RectButton onPress={onPress} {...rest}>
      <Button
        borderRadius={12}
        background={'warmGray.600'}
        marginRight={2}
        borderColor={'violet.500'}
        borderWidth={selected && 1}>
        {title}
      </Button>
    </RectButton>
  );
};

export {Badge};

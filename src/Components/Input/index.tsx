import React from 'react';
import {Input as NativeInput, IInputProps} from 'native-base';
import {theme} from '../../theme';

const Input = ({...rest}: IInputProps) => {
  return (
    <NativeInput
      {...rest}
      color={theme.colors.title}
      borderWidth={0}
      borderBottomWidth={2}
      borderBottomColor={theme.colors.background[400]}
      marginBottom={2}
      _focus={{
        borderBottomColor: theme.colors.primary[500],
        backgroundColor: 'transparent',
      }}
      autoCapitalize={'none'}
    />
  );
};

export {Input};

import {AntDesign} from '@expo/vector-icons';
import {Icon, useTheme} from 'native-base';
import React from 'react';
import {BorderlessButton} from 'react-native-gesture-handler';
import {ISocialButtonLogin} from './types';

const SocialLoginButton = ({iconName, onPress}: ISocialButtonLogin) => {
  const theme = useTheme();
  return (
    <BorderlessButton
      onPress={onPress}
      style={{
        backgroundColor: theme.colors.warmGray[800],
        width: 80,
        height: 40,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon
        size={'md'}
        color={'light.100'}
        as={<AntDesign name={iconName} />}
      />
    </BorderlessButton>
  );
};

export {SocialLoginButton};

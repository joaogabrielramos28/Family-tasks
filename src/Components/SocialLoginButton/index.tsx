import {AntDesign} from '@expo/vector-icons';
import {Icon} from 'native-base';
import React from 'react';
import {BorderlessButton} from 'react-native-gesture-handler';
import {theme} from '../../theme';
import {ISocialButtonLogin} from './types';

const SocialLoginButton = ({iconName, onPress}: ISocialButtonLogin) => {
  return (
    <BorderlessButton
      onPress={onPress}
      style={{
        backgroundColor: theme.colors.background[800],
        width: 80,
        height: 40,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon
        size={'md'}
        color={theme.colors.title}
        as={<AntDesign name={iconName} />}
      />
    </BorderlessButton>
  );
};

export {SocialLoginButton};

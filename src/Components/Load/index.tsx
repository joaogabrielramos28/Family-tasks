import React from 'react';
import LottieView from 'lottie-react-native';
import {VStack} from 'native-base';
import LoadAnimation from '../../assets/load.json';
import {theme} from '../../theme';

export const Load = () => {
  return (
    <VStack
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      background={theme.colors.background[900]}>
      <LottieView source={LoadAnimation} autoPlay loop autoSize />
    </VStack>
  );
};

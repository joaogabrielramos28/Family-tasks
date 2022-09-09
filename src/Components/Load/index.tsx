import React from 'react';
import LottieView from 'lottie-react-native';
import {VStack} from 'native-base';
import LoadAnimation from '../../assets/load.json';

export const Load = () => {
  return (
    <VStack
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      background={'warmGray.900'}>
      <LottieView source={LoadAnimation} autoPlay loop autoSize />
    </VStack>
  );
};

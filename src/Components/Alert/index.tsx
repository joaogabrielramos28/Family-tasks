import React from 'react';
import {Alert as AlertNativeBase, Center, Slide, Text} from 'native-base';

interface AlertProps {
  text: string;
  color: string;
  isOpen: boolean;
}

export const Alert = ({text, color, isOpen}: AlertProps) => {
  return (
    <Center h={12}>
      <Slide in={isOpen} placement="top">
        <AlertNativeBase
          justifyContent="center"
          status="error"
          safeAreaTop={8}
          bg={color}>
          <Text color="light.300" fontWeight="medium">
            {text}
          </Text>
        </AlertNativeBase>
      </Slide>
    </Center>
  );
};

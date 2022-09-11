import {useNavigation} from '@react-navigation/native';
import {Box, Heading, ScrollView, Text, VStack} from 'native-base';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import WelcomeImg from '../../assets/welcome-bg.svg';
import {Button} from '../../Components';

const Welcome = () => {
  const {navigate} = useNavigation();

  const handleGoToSignUp = () => {
    navigate('SignUp');
  };

  const handleGoToSignIn = () => {
    navigate('SignIn');
  };

  return (
    <ScrollView flex={1} bgColor={'warmGray.900'}>
      <Box alignItems={'center'}>
        <WelcomeImg width={360} height={RFValue(350)} />

        <VStack alignItems={'center'} space={2} paddingX={4}>
          <Heading color={'light.100'}>Taskfy</Heading>
          <Heading color={'light.200'} size={'sm'} textAlign={'center'}>
            {' '}
            Organize suas tarefas familiares de forma simples e eficiente
          </Heading>
          <Text color={'light.400'} marginTop={2} bold textAlign={'center'} />
        </VStack>
        <VStack space={4} marginTop={2}>
          <Button
            w={300}
            borderRadius={8}
            onPress={handleGoToSignIn}
            title={'Entrar'}
          />
          <Button
            w={300}
            bg={'transparent'}
            borderWidth={2}
            borderColor={'violet.500'}
            borderRadius={8}
            onPress={handleGoToSignUp}
            title={'Criar conta'}
          />
        </VStack>
      </Box>
    </ScrollView>
  );
};

export {Welcome};

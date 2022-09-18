import {useNavigation} from '@react-navigation/native';
import {Box, Heading, ScrollView, Text, VStack} from 'native-base';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import WelcomeImg from '../../assets/welcome-bg.svg';
import {Button} from '../../Components';
import {theme} from '../../theme';

const Welcome = () => {
  const {navigate} = useNavigation();

  const handleGoToSignUp = () => {
    navigate('SignUp');
  };

  const handleGoToSignIn = () => {
    navigate('SignIn');
  };

  return (
    <ScrollView flex={1} bgColor={theme.colors.background[900]}>
      <Box alignItems={'center'}>
        <WelcomeImg width={360} height={RFValue(350)} />

        <VStack alignItems={'center'} space={2} paddingX={4}>
          <Heading color={theme.colors.title}>Taskfy</Heading>
          <Heading color={theme.colors.text} size={'sm'} textAlign={'center'}>
            {' '}
            Organize suas tarefas familiares de forma simples e eficiente
          </Heading>
          <Text
            color={theme.colors.text}
            marginTop={2}
            bold
            textAlign={'center'}
          />
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
            borderColor={theme.colors.primary[500]}
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

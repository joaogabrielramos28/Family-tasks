import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  KeyboardAvoidingView,
  Text,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Button, Input} from '../../Components';
import {useAuth} from '../../hooks';
import {theme} from '../../theme';

const SignUp = () => {
  const {goBack, navigate} = useNavigation();
  const {signUpWithEmailAndPassword, loadingAuth} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    await signUpWithEmailAndPassword(email, password, name);
  };

  const handleGoBack = () => {
    goBack();
  };

  const handleGoToSignUp = () => {
    navigate('SignIn');
  };
  return (
    <Box
      paddingTop={getStatusBarHeight()}
      paddingX={4}
      flex={1}
      bg={theme.colors.background[900]}>
      <KeyboardAvoidingView enabled behavior="position">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <VStack marginTop={4}>
            <HStack alignItems={'center'}>
              <BorderlessButton onPress={handleGoBack}>
                <IconButton
                  alignItems={'center'}
                  icon={
                    <Icon
                      as={AntDesign}
                      size={'xl'}
                      name={'arrowleft'}
                      color={theme.colors.title}
                    />
                  }
                />
              </BorderlessButton>
              <Heading size={'xl'} color={theme.colors.title}>
                Criar conta
              </Heading>
            </HStack>

            <Text color={theme.colors.text}>
              Faça seu cadastro com uma das contas abaixo
            </Text>

            <VStack space={6} marginTop={8}>
              <Box paddingX={2}>
                <Box marginY={2}>
                  <Heading size={'sm'} color={theme.colors.text}>
                    Nome
                  </Heading>

                  <Input
                    placeholder="john.doe@example.com"
                    onChangeText={setName}
                  />
                </Box>
                <Box marginY={2}>
                  <Heading size={'sm'} color={theme.colors.text}>
                    E-mail
                  </Heading>

                  <Input
                    placeholder="john.doe@example.com"
                    onChangeText={setEmail}
                  />
                </Box>
                <Box marginY={2}>
                  <Heading size={'sm'} color={theme.colors.text}>
                    Senha
                  </Heading>

                  <Input
                    placeholder="Digite sua senha"
                    type="password"
                    onChangeText={setPassword}
                  />
                </Box>

                <Button
                  marginTop={6}
                  borderRadius={4}
                  title={'Criar conta'}
                  onPress={handleRegister}
                  isLoading={loadingAuth}
                />

                <Text
                  marginTop={4}
                  textAlign={'center'}
                  color={theme.colors.text}>
                  Já possui uma conta?{' '}
                  <Text
                    color={theme.colors.primary[500]}
                    onPress={handleGoToSignUp}>
                    Entrar
                  </Text>
                </Text>
              </Box>
            </VStack>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Box>
  );
};

export {SignUp};

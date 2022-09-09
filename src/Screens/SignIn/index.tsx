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
import {Button, Input, SocialLoginButton} from '../../Components';
import {useAuth} from '../../hooks';
import {Modal} from './Components/Modal';

const SignIn = () => {
  const {signInWithEmailAndPassword, signInWithGoogle, loadingAuth} = useAuth();
  const {goBack, navigate} = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const handleGoBack = () => {
    goBack();
  };

  const handleGoToSignUp = () => {
    navigate('SignUp');
  };

  const handleGoToPhoneSignIn = () => {
    navigate('SignInPhone');
  };

  const onOpenModal = () => setModalIsVisible(true);
  const onCloseModal = () => setModalIsVisible(false);

  const handleLoginWithEmailAndPassword = async () => {
    await signInWithEmailAndPassword(email, password);
  };
  return (
    <Box
      paddingTop={getStatusBarHeight()}
      paddingX={4}
      flex={1}
      bg={'warmGray.900'}>
      <KeyboardAvoidingView enabled behavior="position">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <VStack marginTop={4}>
            {modalIsVisible && (
              <Modal onClose={onCloseModal} isOpen={modalIsVisible} />
            )}
            <HStack alignItems={'center'}>
              <BorderlessButton onPress={handleGoBack}>
                <IconButton
                  alignItems={'center'}
                  icon={
                    <Icon
                      as={AntDesign}
                      size={'xl'}
                      name={'arrowleft'}
                      color={'light.50'}
                    />
                  }
                />
              </BorderlessButton>
              <Heading size={'xl'} color={'light.100'}>
                Fazer login
              </Heading>
            </HStack>

            <Text color={'light.300'}>
              Faça seu login com uma das contas abaixo
            </Text>

            <HStack marginTop={4} space={4}>
              <SocialLoginButton
                iconName={'google'}
                onPress={signInWithGoogle}
              />
              <SocialLoginButton
                iconName={'phone'}
                onPress={handleGoToPhoneSignIn}
              />
            </HStack>

            <VStack space={6} marginTop={8}>
              <Box paddingX={2}>
                <Box marginY={1}>
                  <Heading size={'sm'} color={'light.200'}>
                    E-mail
                  </Heading>

                  <Input
                    placeholder="john.doe@example.com"
                    onChangeText={setEmail}
                  />
                </Box>

                <Box marginY={1}>
                  <Heading size={'sm'} color={'light.200'}>
                    Senha
                  </Heading>
                </Box>
                <Input
                  placeholder="Digite sua senha"
                  type="password"
                  onChangeText={setPassword}
                />
                <BorderlessButton onPress={onOpenModal}>
                  <Text textAlign={'right'} color={'violet.500'}>
                    Esqueceu a senha?
                  </Text>
                </BorderlessButton>

                <Button
                  marginTop={6}
                  borderRadius={4}
                  title={'Entrar'}
                  onPress={handleLoginWithEmailAndPassword}
                  isLoading={loadingAuth}
                />

                <Text marginTop={4} textAlign={'center'} color={'light.300'}>
                  Não possui conta?{' '}
                  <Text color={'violet.500'} onPress={handleGoToSignUp}>
                    Criar conta
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

export {SignIn};

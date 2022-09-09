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

const SignUp = () => {
  const {goBack, navigate} = useNavigation<any>();
  const {signUpWithEmailAndPassword} = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    try {
      setLoading(true);
      await signUpWithEmailAndPassword(email, password, name);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
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
      bg={'warmGray.900'}>
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
                      color={'light.50'}
                    />
                  }
                />
              </BorderlessButton>
              <Heading size={'xl'} color={'light.100'}>
                Criar conta
              </Heading>
            </HStack>

            <Text color={'light.300'}>
              Faça seu cadastro com uma das contas abaixo
            </Text>

            <VStack space={6} marginTop={8}>
              <Box paddingX={2}>
                <Box marginY={2}>
                  <Heading size={'sm'} color={'light.200'}>
                    Nome
                  </Heading>

                  <Input
                    placeholder="john.doe@example.com"
                    onChangeText={setName}
                  />
                </Box>
                <Box marginY={2}>
                  <Heading size={'sm'} color={'light.200'}>
                    E-mail
                  </Heading>

                  <Input
                    placeholder="john.doe@example.com"
                    onChangeText={setEmail}
                  />
                </Box>
                <Box marginY={2}>
                  <Heading size={'sm'} color={'light.200'}>
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
                  isLoading={loading}
                />

                <Text marginTop={4} textAlign={'center'} color={'light.300'}>
                  Já possui uma conta?{' '}
                  <Text color={'violet.500'} onPress={handleGoToSignUp}>
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

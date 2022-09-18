import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {
  Box,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  KeyboardAvoidingView,
  Text,
  VStack,
} from 'native-base';
import {Masks, useMaskedInputProps} from 'react-native-mask-input';
import React, {useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Button, Input} from '../../Components';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {theme} from '../../theme';

const SignInPhone = () => {
  const {goBack, navigate} = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const countryCode = '+55';

  const handleGoBack = () => {
    goBack();
  };

  const goToConfirmationScreen = (
    confirmation: FirebaseAuthTypes.ConfirmationResult,
  ) => {
    navigate('ConfirmationCode', {confirmation});
  };

  const requestOTP = async () => {
    const confirmation = await auth().signInWithPhoneNumber(
      `${countryCode}${phoneNumber}`,
    );
    goToConfirmationScreen(confirmation);
  };
  const maskedInputProps = useMaskedInputProps({
    mask: Masks.BRL_PHONE,
    value: phoneNumber,
    onChangeText: setPhoneNumber,
    obfuscationCharacter: '-',
  });

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
                Fazer Login
              </Heading>
            </HStack>

            <Text color={theme.colors.text}>
              Para continuar, informe seu número de telefone.
            </Text>

            <VStack space={6} marginTop={8}>
              <FormControl paddingX={2}>
                <FormControl.Label>
                  <Heading size={'sm'} color={theme.colors.text}>
                    Número de telefone
                  </Heading>
                </FormControl.Label>
                <Input {...maskedInputProps} />

                <Button
                  marginTop={6}
                  borderRadius={4}
                  title={'Enviar SMS'}
                  onPress={requestOTP}
                />
              </FormControl>
            </VStack>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Box>
  );
};

export {SignInPhone};

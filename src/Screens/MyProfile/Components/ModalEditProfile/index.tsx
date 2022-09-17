import React, {useRef, useState} from 'react';
import {
  Box,
  Button,
  KeyboardAvoidingView,
  Modal,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import {Input} from '../../../../Components';
import {Alert, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {useAuth} from '../../../../hooks';

interface ModalEditProfileProps {
  isVisible: boolean;
  onClose: () => void;
}

const ModalEditProfile = ({isVisible, onClose}: ModalEditProfileProps) => {
  const {user, updateUser} = useAuth();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || '');
  const [loading, setLoading] = useState(false);

  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      await updateUser(name, bio);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Atualizar perfil',
        'Ocorreu um erro ao atualizar seu perfil',
      );
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isVisible}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior="position" w={'100%'} px={12}>
            <Modal.Content bg={'warmGray.800'} w={'100%'}>
              <Modal.CloseButton />
              <Modal.Header
                borderBottomColor={'warmGray.600'}
                bg={'warmGray.800'}
                borderWidth={0}
                _text={{
                  color: 'light.50',
                }}>
                Atualizar perfil
              </Modal.Header>
              <Modal.Body borderWidth={0}>
                <VStack borderWidth={0}>
                  <Text color={'light.300'}>Nome</Text>
                  <Input value={name} onChangeText={setName} />

                  {/* <Text color={'light.300'}>E-mail</Text>
                  <Input
                    borderColor={'warmGray.600'}
                    value={email}
                    onChangeText={setEmail}
                  /> */}

                  <Text my={2} color={'light.300'}>
                    Bio
                  </Text>

                  <TextArea
                    maxLength={120}
                    autoCompleteType={'off'}
                    h={20}
                    spellCheck
                    placeholder={'Biografia'}
                    color={'light.50'}
                    bgColor={'warmGray.800'}
                    _focus={{borderWidth: 1, borderColor: 'violet.500'}}
                    value={bio}
                    borderWidth={1}
                    borderColor={'warmGray.400'}
                    onChangeText={setBio}
                  />
                  <Box w={'100%'} alignItems={'flex-end'} my={1}>
                    <Text color={'light.300'}>{bio.length} de 120</Text>
                  </Box>
                </VStack>
              </Modal.Body>
              <Modal.Footer bg={'warmGray.800'} borderTopColor={'warmGray.600'}>
                <Button.Group space={2}>
                  <Button
                    variant={'unstyled'}
                    _text={{
                      color: 'light.300',
                    }}
                    onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    onPress={handleUpdateUser}
                    bg={'violet.500'}
                    _text={{
                      color: 'light.50',
                    }}
                    isLoading={loading}
                    _pressed={{
                      bg: 'violet.500',
                      opacity: 0.5,
                    }}>
                    Atualizar
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export {ModalEditProfile};

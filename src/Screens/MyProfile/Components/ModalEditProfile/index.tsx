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
import {theme} from '../../../../theme';

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
            <Modal.Content bg={theme.colors.background[800]} w={'100%'}>
              <Modal.CloseButton />
              <Modal.Header
                borderBottomColor={theme.colors.background[600]}
                bg={theme.colors.background[800]}
                borderWidth={0}
                _text={{
                  color: theme.colors.title,
                }}>
                Atualizar perfil
              </Modal.Header>
              <Modal.Body borderWidth={0}>
                <VStack borderWidth={0}>
                  <Text color={theme.colors.text}>Nome</Text>
                  <Input value={name} onChangeText={setName} />

                  {/* <Text color={'light.300'}>E-mail</Text>
                  <Input
                    borderColor={'warmGray.600'}
                    value={email}
                    onChangeText={setEmail}
                  /> */}

                  <Text my={2} color={theme.colors.text}>
                    Bio
                  </Text>

                  <TextArea
                    maxLength={120}
                    autoCompleteType={'off'}
                    h={20}
                    spellCheck
                    placeholder={'Biografia'}
                    color={theme.colors.title}
                    bgColor={theme.colors.background[800]}
                    _focus={{
                      borderWidth: 1,
                      borderColor: theme.colors.primary[500],
                    }}
                    value={bio}
                    borderWidth={1}
                    borderColor={theme.colors.background[400]}
                    onChangeText={setBio}
                  />
                  <Box w={'100%'} alignItems={'flex-end'} my={1}>
                    <Text color={theme.colors.text}>{bio.length} de 120</Text>
                  </Box>
                </VStack>
              </Modal.Body>
              <Modal.Footer
                bg={theme.colors.background[800]}
                borderTopColor={theme.colors.background[600]}>
                <Button.Group space={2}>
                  <Button
                    variant={'unstyled'}
                    _text={{
                      color: theme.colors.text,
                    }}
                    onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    onPress={handleUpdateUser}
                    bg={theme.colors.primary[500]}
                    _text={{
                      color: theme.colors.title,
                    }}
                    isLoading={loading}
                    _pressed={{
                      bg: theme.colors.primary[500],
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

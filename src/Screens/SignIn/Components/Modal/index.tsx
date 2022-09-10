import React, {useState} from 'react';
import {Box, Button, Heading, Modal as ModalBase} from 'native-base';
import {Input} from '../../../../Components';
import {useAuth} from '../../../../hooks';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({isOpen, onClose}: ModalProps) => {
  const {resetPassword} = useAuth();
  const [resetEmail, setResetEmail] = useState('');

  const handleResetpass = async () => {
    await resetPassword(resetEmail);
  };
  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
      <ModalBase.Content maxWidth="400px" bg={'warmGray.800'}>
        <ModalBase.CloseButton />
        <ModalBase.Header
          bg={'warmGray.800'}
          _text={{
            color: 'light.300',
          }}
          borderColor={'warmGray.700'}>
          Resetar senha
        </ModalBase.Header>
        <ModalBase.Body>
          <Box mt="3">
            <Heading color="light.300" fontSize={14}>
              E-mail
            </Heading>
            <Input onChangeText={setResetEmail} />
          </Box>
        </ModalBase.Body>
        <ModalBase.Footer bg={'warmGray.800'} borderColor={'warmGray.700'}>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              _text={{
                color: 'light.300',
              }}
              onPress={onClose}>
              Cancelar
            </Button>
            <Button bg={'violet.500'} onPress={handleResetpass}>
              Enviar
            </Button>
          </Button.Group>
        </ModalBase.Footer>
      </ModalBase.Content>
    </ModalBase>
  );
};

export {Modal};

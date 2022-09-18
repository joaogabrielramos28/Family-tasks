import React, {useState} from 'react';
import {Box, Button, Heading, Modal as ModalBase} from 'native-base';
import {Input} from '../../../../Components';
import {useAuth} from '../../../../hooks';
import {theme} from '../../../../theme';

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
      <ModalBase.Content maxWidth="400px" bg={theme.colors.background[800]}>
        <ModalBase.CloseButton />
        <ModalBase.Header
          bg={theme.colors.background[800]}
          _text={{
            color: theme.colors.text,
          }}
          borderColor={theme.colors.background[700]}>
          Resetar senha
        </ModalBase.Header>
        <ModalBase.Body>
          <Box mt="3">
            <Heading color={theme.colors.text} fontSize={14}>
              E-mail
            </Heading>
            <Input onChangeText={setResetEmail} />
          </Box>
        </ModalBase.Body>
        <ModalBase.Footer
          bg={theme.colors.background[800]}
          borderColor={theme.colors.background[700]}>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              _text={{
                color: theme.colors.text,
              }}
              onPress={onClose}>
              Cancelar
            </Button>
            <Button bg={theme.colors.primary[500]} onPress={handleResetpass}>
              Enviar
            </Button>
          </Button.Group>
        </ModalBase.Footer>
      </ModalBase.Content>
    </ModalBase>
  );
};

export {Modal};

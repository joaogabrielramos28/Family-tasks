import React, {useRef} from 'react';
import {AlertDialog as AlertDialogNative, Button} from 'native-base';

interface AlertDialogProps {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  body: string;
  buttonCancelTitle: string;
  buttonSuccesTitle: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const AlertDialog = ({
  isOpen,
  onClose,
  title,
  body,
  buttonCancelTitle,
  buttonSuccesTitle,
  onSuccess,
  onCancel,
}: AlertDialogProps) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialogNative
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}>
      <AlertDialogNative.Content>
        <AlertDialogNative.CloseButton />
        <AlertDialogNative.Header
          backgroundColor={'warmGray.800'}
          _text={{
            color: 'light.50',
          }}
          borderColor={'warmGray.700'}>
          {title}
        </AlertDialogNative.Header>
        <AlertDialogNative.Body
          backgroundColor={'warmGray.800'}
          _text={{
            color: 'light.50',
          }}>
          {body}
        </AlertDialogNative.Body>
        <AlertDialogNative.Footer
          backgroundColor={'warmGray.800'}
          borderColor={'warmGray.700'}>
          <Button.Group space={2}>
            <Button colorScheme="danger" onPress={onCancel} ref={cancelRef}>
              {buttonCancelTitle}
            </Button>
            <Button colorScheme="violet" onPress={onSuccess}>
              {buttonSuccesTitle}
            </Button>
          </Button.Group>
        </AlertDialogNative.Footer>
      </AlertDialogNative.Content>
    </AlertDialogNative>
  );
};

export {AlertDialog};

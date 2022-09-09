import {MaterialIcons} from '@expo/vector-icons';
import {Icon} from 'native-base';
import React from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ActionSheet} from '../../../../Components';
import {ActionSheetItem} from '../../../../Components/ActionSheet/Components/ActionSheetItem';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {uploadFile} from '../../../../Utils/uploadFile';
import {Alert} from 'react-native';

interface IActionSheetBGProps {
  onClose: () => void;
  isOpen: boolean;
  groupId: string;
  backgroundPath?: string;
  handleChangeLoading: (state: any) => void;
}

const ActionSheetBg = ({
  isOpen,
  onClose,
  groupId,
  handleChangeLoading,
  backgroundPath,
}: IActionSheetBGProps) => {
  const handleUpdateGroupBackground = async (uri: string) => {
    handleChangeLoading(true);
    storage()
      .ref(backgroundPath)
      .delete()
      .then(async () => {
        const {getDownloadURL, photoPath} = await uploadFile(
          uri,
          'backgrounds',
        );

        await firestore().collection('Groups').doc(groupId).update({
          background: getDownloadURL,
          photo_path: photoPath,
        });
      })
      .catch(() => Alert.alert('Erro ao atualizar background'))
      .finally(() => {
        handleChangeLoading(false);
      });
  };

  const handleLaunchCamera = async (): Promise<void> => {
    await launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      async response => {
        if (response.didCancel) {
          return;
        }
        if (response.errorCode) {
          console.log(response.errorMessage);
        }

        await handleUpdateGroupBackground(response.assets[0].uri);
      },
    );
  };

  const handleLaunchGallery = async (): Promise<void> => {
    await launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      async response => {
        if (response.didCancel) {
          return;
        }
        if (response.errorCode) {
          console.log(response.errorMessage);
        }
        await handleUpdateGroupBackground(response.assets[0].uri);
      },
    );
  };
  return (
    <ActionSheet isOpen={isOpen} onClose={onClose}>
      <ActionSheetItem
        onPress={handleLaunchGallery}
        startIcon={
          <Icon
            as={MaterialIcons}
            color="light.300"
            mr="1"
            size="6"
            name="photo"
          />
        }>
        Abrir galeria
      </ActionSheetItem>
      <ActionSheetItem
        onPress={handleLaunchCamera}
        startIcon={
          <Icon
            as={MaterialIcons}
            color="trueGray.400"
            mr="1"
            size="6"
            name="photo-camera"
          />
        }>
        Tirar foto
      </ActionSheetItem>
    </ActionSheet>
  );
};

export {ActionSheetBg};

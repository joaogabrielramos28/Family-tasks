import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Icon,
  KeyboardAvoidingView,
  ScrollView,
  Spinner,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';

import {BorderlessButton} from 'react-native-gesture-handler';
import {ActionSheet} from '../../Components';
import {ActionSheetItem} from '../../Components/ActionSheet/Components/ActionSheetItem';
import {useAuth} from '../../hooks';
import {ModalEditProfile} from './Components/ModalEditProfile';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {theme} from '../../theme';

const MyProfile = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const {user, updateUserPhoto} = useAuth();

  const [imageUri, setImageUri] = useState(user?.photo_url);

  const [loadingImage, setLoadingImage] = useState(true);

  const {isOpen, onOpen, onClose} = useDisclose();

  const handleCloseModal = useCallback(() => {
    setModalIsVisible(false);
  }, []);

  const handleOpen = () => {
    setModalIsVisible(true);
  };

  useEffect(() => {
    if (user.photo_url === null) setLoadingImage(false);
    else setLoadingImage(true);
  }, [user.photo_url]);

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
          return;
        }

        const photoUrl = await updateUserPhoto(response.assets[0].uri);

        setImageUri(photoUrl);
      },
    );
  };

  return (
    <ScrollView
      background={theme.colors.background[900]}
      flex={1}
      _contentContainerStyle={{
        paddingBottom: 40,
      }}>
      <KeyboardAvoidingView behavior="position" enabled>
        <ActionSheet isOpen={isOpen} onClose={onClose}>
          <ActionSheetItem
            onPress={handleLaunchGallery}
            startIcon={
              <Icon
                as={MaterialIcons}
                color={theme.colors.text}
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
        <Box
          height={'160px'}
          w={'100%'}
          background={theme.colors.background[800]}
          padding={10}
          alignItems={'flex-end'}>
          <BorderlessButton onPress={handleOpen}>
            <AntDesign name="ellipsis1" size={22} color={theme.colors.text} />
          </BorderlessButton>
        </Box>
        <VStack
          alignItems={'center'}
          style={{
            transform: [
              {
                translateY: -60,
              },
            ],
          }}
          space={2}>
          {loadingImage && user.photo_url && (
            <Spinner size="lg" color={theme.colors.primary[500]} />
          )}
          {user.photo_url ? (
            <Avatar
              size={'2xl'}
              borderColor={theme.colors.title}
              borderWidth={4}
              source={{
                uri: imageUri,
              }}
              _image={{
                onLoad: () => setLoadingImage(false),
                resizeMode: 'cover',
              }}>
              <Avatar.Badge
                bg={theme.colors.primary[500]}
                borderWidth={0}
                display="flex"
                alignItems={'center'}
                justifyContent={'center'}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 240,
                }}>
                <BorderlessButton onPress={onOpen}>
                  <AntDesign
                    name="camera"
                    size={20}
                    color={theme.colors.text}
                  />
                </BorderlessButton>
              </Avatar.Badge>
            </Avatar>
          ) : (
            <Avatar
              size={'2xl'}
              borderColor={theme.colors.title}
              borderWidth={4}>
              <Avatar.Badge
                bg={theme.colors.primary[500]}
                borderWidth={0}
                display="flex"
                alignItems={'center'}
                justifyContent={'center'}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 240,
                }}>
                <BorderlessButton onPress={onOpen}>
                  <AntDesign
                    name="camera"
                    size={20}
                    color={theme.colors.light[200]}
                  />
                </BorderlessButton>
              </Avatar.Badge>
            </Avatar>
          )}

          <Heading color={theme.colors.text}>{user.name}</Heading>
          <Box w={'100%'} px={8}>
            <Text mt={2} color={theme.colors.text} textAlign="center">
              {user?.bio}
            </Text>
          </Box>
        </VStack>

        <HStack paddingX={10} justifyContent="space-around">
          <VStack alignItems={'center'}>
            <Text color={theme.colors.text}>Tasks completadas</Text>
            <Heading color={theme.colors.title}>10</Heading>
          </VStack>
          <VStack alignItems={'center'}>
            <Text color={theme.colors.text}>Grupos</Text>
            <Heading color={theme.colors.title}>1</Heading>
          </VStack>
        </HStack>

        <Box marginTop={8}>
          {modalIsVisible && (
            <ModalEditProfile
              isVisible={modalIsVisible}
              onClose={handleCloseModal}
            />
          )}
        </Box>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export {MyProfile};

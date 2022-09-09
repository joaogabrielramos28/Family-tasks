import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import {
  Avatar,
  Box,
  FormControl,
  Heading,
  HStack,
  Icon,
  KeyboardAvoidingView,
  ScrollView,
  Spinner,
  Text,
  useDisclose,
  useTheme,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';

import {BorderlessButton} from 'react-native-gesture-handler';
import {ActionSheet, AvatarPlaceholder, Button, Input} from '../../Components';
import {ActionSheetItem} from '../../Components/ActionSheet/Components/ActionSheetItem';
import {useAuth} from '../../hooks';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Profile = () => {
  const theme = useTheme();
  const {user, updateUser} = useAuth();

  const [email, setEmail] = useState(user?.email);
  const [name, setName] = useState(user?.name);
  const [imageUri] = useState(user?.photo_url);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);

  const {isOpen, onOpen, onClose} = useDisclose();

  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      await updateUser(name, email);
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

  useEffect(() => {
    if (user.photo_url === null) setLoadingImage(false);
    else setLoadingImage(true);
  }, [user.photo_url]);

  // const handleLaunchCamera = async (): Promise<void> => {
  //   await launchCamera(
  //     {
  //       mediaType: 'photo',
  //       saveToPhotos: true,
  //     },
  //     async response => {
  //       if (response.didCancel) {
  //         return;
  //       }
  //       if (response.errorCode) {
  //         console.log(response.errorMessage);
  //       }
  //     },
  //   );
  // };

  // const handleLaunchGallery = async (): Promise<void> => {
  //   await launchImageLibrary(
  //     {
  //       mediaType: 'photo',
  //       selectionLimit: 1,
  //     },
  //     async response => {
  //       if (response.didCancel) {
  //         return;
  //       }
  //       if (response.errorCode) {
  //         console.log(response.errorMessage);
  //         return;
  //       }
  //       await updateUserPhoto(response.assets[0].uri);
  //     },
  //   );
  // };

  return (
    <ScrollView
      background={'warmGray.900'}
      flex={1}
      _contentContainerStyle={{
        paddingBottom: 40,
      }}>
      <KeyboardAvoidingView behavior="position" enabled>
        <ActionSheet isOpen={isOpen} onClose={onClose}>
          <ActionSheetItem
            // onPress={handleLaunchGallery}
            onPress={() => {}}
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
            // onPress={handleLaunchCamera}
            onPress={() => {}}
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
          background={'warmGray.800'}
          padding={10}
          alignItems={'flex-end'}>
          <BorderlessButton>
            <AntDesign
              name="ellipsis1"
              size={22}
              color={theme.colors.light[200]}
            />
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
            <Spinner size="lg" color={'violet.500'} />
          )}
          {!user.photo_url ? (
            <AvatarPlaceholder size={32} />
          ) : (
            <Avatar
              size={'2xl'}
              borderColor={'light.50'}
              borderWidth={4}
              source={{
                uri: imageUri,
              }}
              _image={{
                onLoad: () => setLoadingImage(false),
                resizeMode: 'cover',
              }}>
              <Avatar.Badge
                bg={'violet.500'}
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

          <Heading color={'light.300'}>{name}</Heading>
        </VStack>

        <HStack paddingX={10} justifyContent="space-around">
          <VStack alignItems={'center'}>
            <Text color={'light.300'}>Tasks completadas</Text>
            <Heading color={'light.100'}>10</Heading>
          </VStack>
          <VStack alignItems={'center'}>
            <Text color={'light.300'}>Grupos</Text>
            <Heading color={'light.100'}>1</Heading>
          </VStack>
        </HStack>

        <VStack marginTop={4}>
          <FormControl paddingX={10}>
            <FormControl.Label
              _text={{color: 'light.300', fontSize: 'sm', fontWeight: 600}}>
              Nome
            </FormControl.Label>
            <Input
              placeholder="Digite seu nome"
              onChangeText={setName}
              value={name}
              leftElement={
                <AntDesign
                  name="user"
                  color={'gray'}
                  size={22}
                  style={{
                    marginLeft: 2,
                  }}
                />
              }
            />
            <FormControl.Label
              _text={{color: 'light.300', fontSize: 'sm', fontWeight: 600}}>
              E-mail
            </FormControl.Label>
            <Input
              placeholder="email@example.com"
              value={email}
              onChangeText={setEmail}
              leftElement={
                <AntDesign
                  name="mail"
                  color={'gray'}
                  size={22}
                  style={{
                    marginLeft: 2,
                  }}
                />
              }
            />

            <Box marginTop={8}>
              <Button
                title="Atualizar perfil"
                p={4}
                onPress={handleUpdateUser}
                isLoading={loading}
              />
            </Box>
          </FormControl>
        </VStack>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export {Profile};

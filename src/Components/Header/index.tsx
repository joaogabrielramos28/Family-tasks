import {MaterialIcons} from '@expo/vector-icons';
import {Avatar, Box, Heading, HStack, Spinner, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {BorderlessButton} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAuth} from '../../hooks';
import {AvatarPlaceholder} from '../AvatarPlaceholder';

const Header = () => {
  const {signOut, user} = useAuth();
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    if (user.photo_url === null) setLoadingImage(false);
    else setLoadingImage(true);
  }, [user.photo_url]);

  const handleLogout = async () => {
    await signOut();
  };
  return (
    <Box
      bg={'warmGray.800'}
      w={'100%'}
      h={`${RFValue(100)}px`}
      borderBottomLeftRadius={'20px'}
      display={'flex'}
      justifyContent={'center'}
      px={'20px'}
      paddingTop={RFValue(6)}>
      <HStack alignItems={'center'} justifyContent={'space-around'}>
        <HStack w={'100%'} space={4}>
          {loadingImage && user.photo_url && (
            <Spinner size="sm" color={'violet.500'} position={'absolute'} />
          )}
          {!user.photo_url ? (
            <AvatarPlaceholder />
          ) : (
            <Avatar
              size={'md'}
              source={{
                uri: user.photo_url || '',
              }}
              _image={{
                onLoad: () => setLoadingImage(false),
                resizeMode: 'cover',
              }}>
              <Avatar.Badge bg="green.500" />
            </Avatar>
          )}

          <VStack>
            <Text color={'light.400'} fontSize={RFValue(14)}>
              Bem vindo,
            </Text>
            <Heading fontSize={RFValue(18)} color={'light.200'}>
              {user.name}
            </Heading>
          </VStack>
        </HStack>
        <BorderlessButton onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="white" />
        </BorderlessButton>
      </HStack>
    </Box>
  );
};

export {Header};

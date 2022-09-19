import {MaterialIcons} from '@expo/vector-icons';
import {Box, Heading, HStack, Text, VStack, Factory} from 'native-base';
import React from 'react';
import {BorderlessButton} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAuth} from '../../hooks';
import {AvatarPlaceholder} from '../AvatarPlaceholder';
import FastImage from 'react-native-fast-image';
import {theme} from '../../theme';

const Header = () => {
  const {signOut, user} = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const FastImageFactory = Factory(FastImage);
  return (
    <Box
      bg={theme.colors.background[800]}
      w={'100%'}
      h={`${RFValue(100)}px`}
      borderBottomLeftRadius={'20px'}
      display={'flex'}
      justifyContent={'center'}
      px={'20px'}
      paddingTop={RFValue(6)}>
      <HStack alignItems={'center'} justifyContent={'space-around'}>
        <HStack w={'100%'} space={4}>
          {!user.photo_url ? (
            <AvatarPlaceholder />
          ) : (
            <FastImageFactory
              size={'12'}
              source={{
                uri: user.photo_url || '',
              }}
              rounded={'full'}
            />
          )}

          <VStack>
            <Text
              color={theme.colors.text}
              fontSize={theme.fontSizes.md}
              fontFamily={'body'}>
              Bem vindo,
            </Text>
            <Heading
              fontSize={theme.fontSizes.lg}
              fontFamily={'heading'}
              color={theme.colors.title}>
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

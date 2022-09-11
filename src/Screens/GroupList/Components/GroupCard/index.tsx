import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  AspectRatio,
  Box,
  Center,
  Factory,
  Heading,
  HStack,
  Stack,
  Text,
} from 'native-base';
import FastImage from 'react-native-fast-image';
import {BorderlessButton} from 'react-native-gesture-handler';
import {IGroupCardProps} from './types';

const GroupCard = ({name, description, id, background}: IGroupCardProps) => {
  const {navigate} = useNavigation();
  const FastImageFactory = Factory(FastImage);
  const handleGoToGroup = () => {
    navigate('GroupDetails', {id});
  };

  return (
    <BorderlessButton onPress={handleGoToGroup}>
      <Box alignItems="center" marginTop={4}>
        <Box
          maxW="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.600"
          borderWidth="1"
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}>
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <FastImageFactory
                source={{
                  uri:
                    background ||
                    'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                }}
              />
            </AspectRatio>
            <Center
              bg="violet.500"
              _text={{
                color: 'warmGray.50',
                fontWeight: '700',
                fontSize: 'xs',
              }}
              position="absolute"
              bottom="0"
              px="3"
              py="1.5">
              Grupo
            </Center>
          </Box>
          <Stack p="4" space={3} bgColor={'warmGray.600'}>
            <Stack space={2}>
              <Heading size="md" ml="-1" color={'light.50'}>
                {name}
              </Heading>
              <Text
                fontSize="xs"
                color={'violet.500'}
                fontWeight="500"
                ml="-0.5"
                mt="-1">
                The Silicon Valley of India.
              </Text>
            </Stack>
            <Text fontWeight="400" color={'light.300'}>
              {description}
            </Text>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between">
              <HStack alignItems="center" />
            </HStack>
          </Stack>
        </Box>
      </Box>
    </BorderlessButton>
  );
};

export {GroupCard};

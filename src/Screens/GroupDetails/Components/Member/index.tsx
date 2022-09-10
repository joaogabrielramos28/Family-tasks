import {Box, Factory, Heading, HStack, Icon, Text, VStack} from 'native-base';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {IMember} from '../../../../DTOs/GroupDto';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {BorderlessButton} from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';

type ImemberProps = IMember & {
  isAdmin: boolean;
};

const Member = ({
  name,
  photo_url: photoURL,
  groupInfo,
  isAdmin,
}: ImemberProps) => {
  const FastImageFactory = Factory(FastImage);
  return (
    <>
      {groupInfo?.position === 'Administrator' || !isAdmin ? (
        <Box marginBottom={8}>
          <HStack alignItems={'center'}>
            <FastImageFactory
              source={{
                uri: photoURL,
              }}
              size={'12'}
              rounded={'full'}
            />
            <VStack marginLeft={4}>
              <Heading color={'light.50'} size={'md'}>
                {name}
              </Heading>
              <Text color={'light.300'}>{groupInfo?.position}</Text>
            </VStack>
          </HStack>
        </Box>
      ) : (
        <Swipeable
          overshootRight={false}
          renderRightActions={() => (
            <VStack>
              <Box>
                <BorderlessButton>
                  <Icon
                    as={<Feather name="trash" />}
                    color={'violet.500'}
                    size={8}
                  />
                </BorderlessButton>
              </Box>
            </VStack>
          )}>
          <Box marginBottom={8}>
            <HStack alignItems={'center'}>
              <FastImageFactory
                source={{
                  uri: photoURL,
                }}
                size={'12'}
                rounded={'full'}
              />
              <VStack marginLeft={4}>
                <Heading color={'light.50'} size={'md'}>
                  {name}
                </Heading>
                <Text color={'light.300'}>{groupInfo?.position}</Text>
              </VStack>
            </HStack>
          </Box>
        </Swipeable>
      )}
    </>
  );
};

export {Member};

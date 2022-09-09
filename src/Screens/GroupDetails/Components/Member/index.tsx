import {Box, Factory, Heading, HStack, Text, VStack} from 'native-base';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {IMember} from '../../../../DTOs/GroupDto';

const Member = ({name, photo_url: photoURL, groupInfo}: IMember) => {
  const FastImageFactory = Factory(FastImage);
  return (
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
  );
};

export {Member};

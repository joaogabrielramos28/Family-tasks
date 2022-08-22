import {Avatar, Box, Heading, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {IMember} from '../../../../DTOs/GroupDto';

const Member = ({name, position, photoURL}: IMember) => {
  return (
    <Box marginBottom={8}>
      <HStack alignItems={'center'}>
        <Avatar
          source={{
            uri: photoURL,
          }}
        />
        <VStack marginLeft={4}>
          <Heading color={'light.50'} size={'md'}>
            {name}
          </Heading>
          <Text color={'light.300'}>{position}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export {Member};

import {useNavigation} from '@react-navigation/native';
import {Avatar, Box, Heading, Text, VStack} from 'native-base';
import React from 'react';
import {BorderlessButton} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {IGroupCardProps} from './types';

const GroupCard = ({name, description, members}: IGroupCardProps) => {
  const {navigate} = useNavigation<any>();

  const handleGoToGroup = () => {
    navigate('GroupDetails');
  };
  return (
    <BorderlessButton onPress={handleGoToGroup}>
      <Box
        width={'100%'}
        background={'warmGray.600'}
        borderRadius={8}
        color={'light.50'}
        height={'140px'}
        padding={6}
        alignItems={'flex-start'}
        marginBottom={6}>
        <VStack>
          <Heading color={'light.200'}>{name}</Heading>
          <Text color={'light.400'}>{description}</Text>

          {members?.length > 0 ? (
            <Avatar.Group
              w={'100%'}
              alignItems={'flex-start'}
              marginTop={4}
              space={-3}
              max={2}
              _avatar={{
                size: RFValue(36),
              }}>
              {members?.map(member => (
                <Avatar
                  key={member.id}
                  source={{
                    uri: member.photoURL,
                  }}
                />
              ))}
            </Avatar.Group>
          ) : (
            <Text color={'light.400'}>Nenhum membro</Text>
          )}
        </VStack>
      </Box>
    </BorderlessButton>
  );
};

export {GroupCard};

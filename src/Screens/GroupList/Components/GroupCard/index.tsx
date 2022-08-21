import {useNavigation} from '@react-navigation/native';
import {Avatar, Box, Heading, Text, VStack} from 'native-base';
import React from 'react';
import {BorderlessButton} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {IGroupCardProps} from './types';

const GroupCard = ({name, description}: IGroupCardProps) => {
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

          <Avatar.Group
            key={name}
            w={'100%'}
            alignItems={'flex-start'}
            marginTop={4}
            space={-3}
            max={2}
            _avatar={{
              size: RFValue(36),
            }}>
            <Avatar
              source={{
                uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              }}
            />
            <Avatar
              source={{
                uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              }}
            />
            <Avatar
              source={{
                uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              }}
            />
          </Avatar.Group>
        </VStack>
      </Box>
    </BorderlessButton>
  );
};

export {GroupCard};

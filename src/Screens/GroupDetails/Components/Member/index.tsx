import {Box, Factory, Heading, HStack, Icon, Text, VStack} from 'native-base';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {IMember} from '../../../../DTOs/GroupDto';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {BorderlessButton} from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../../../hooks';

type IMemberProps = IMember & {
  isAdmin: boolean;
  members: IMember[];
  handleResetUser: () => void;
};

const Member = ({
  name,
  photo_url: photoURL,
  groupInfo,
  isAdmin,
  id,
  members,
  handleResetUser,
}: IMemberProps) => {
  const {USER_STORAGE_KEY} = useAuth();
  const FastImageFactory = Factory(FastImage);

  const handleRemoveUser = async () => {
    const items = [];
    for (let i = 0; i < members.length; i++) {
      if (members[i].id !== id) {
        const ref = firestore().collection('Users').doc(members[i].id);

        items.push(ref);
      }
    }

    try {
      await firestore().collection('Groups').doc(groupInfo.id).update({
        members: items,
      });
      await firestore().collection('Users').doc(id).update({
        groupInfo: firestore.FieldValue.delete(),
      });
      const response = await AsyncStorage.getItem(USER_STORAGE_KEY);
      const storageUser = response ? JSON.parse(response) : {};

      delete storageUser.groupInfo;

      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(storageUser));
      handleResetUser();
    } catch (error) {
      console.log(error);
    }
  };

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
                <BorderlessButton
                  onPress={handleRemoveUser}
                  style={{
                    alignItems: 'center',
                    paddingVertical: 10,
                    justifyContent: 'center',
                  }}>
                  <Icon
                    as={<Feather name="trash" />}
                    color={'violet.500'}
                    size={6}
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

import {AntDesign, Ionicons} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Box,
  FlatList,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  useDisclose,
  Image,
  VStack,
  Spinner,
  Badge,
} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Button} from '../../Components';
import {Member} from './Components/Member';
import {IGroupDto, IMember} from '../../DTOs/GroupDto';
import {useAuth} from '../../hooks';
import {ActionSheetBg} from './Components/ActionSheetBg';
import {Dimensions} from 'react-native';

interface Params {
  id: string;
}

const GroupDetails = () => {
  const width = Dimensions.get('window').width;
  const {user} = useAuth();
  const {goBack} = useNavigation();
  const [group, setGroup] = useState<IGroupDto>({} as IGroupDto);
  const [memberIsIngroup, setMemberIsIngroup] = useState(false);
  const [loadingChangeBackground, setLoadingChangeBackground] = useState(true);
  const route = useRoute();
  const {isOpen, onOpen, onClose} = useDisclose();

  const handleGoBack = () => {
    goBack();
  };

  const {id} = route.params as Params;

  const handleChangeLoading = useCallback((state: boolean) => {
    return setLoadingChangeBackground(state);
  }, []);

  useEffect(() => {
    firestore()
      .collection('Groups')
      .where('id', '==', id)
      .onSnapshot(querySnapshot => {
        const group = querySnapshot.docs[0].data() as IGroupDto;
        setGroup(group);
        const checkIfMemberIsInGroup = group.members.find(
          member => member.id === user.uid,
        );
        if (checkIfMemberIsInGroup) {
          setMemberIsIngroup(true);
        }
      });
  }, [id, user.uid]);

  const sortParticipants = (members: IMember[]) => {
    return members?.sort((a: IMember) => {
      if (a.position === 'Administrator') {
        return -1;
      }
      return 1;
    });
  };

  return (
    <Box flex={1} bg={'warmGray.900'}>
      {group.name ? (
        <>
          <Box
            background={'warmGray.900'}
            height={RFValue(200)}
            padding={RFValue(4)}>
            {loadingChangeBackground && (
              <Spinner
                size="lg"
                color={'violet.500'}
                zIndex={1}
                position={'absolute'}
                top={RFValue(100)}
                left={width / 2 - RFValue(20)}
              />
            )}
            <Image
              source={{
                uri: group.background,
              }}
              onLoad={() => setLoadingChangeBackground(false)}
              position="absolute"
              width={width}
              resizeMode="cover"
              height={RFValue(200)}
              alt={'background'}
            />
            <ActionSheetBg
              isOpen={isOpen}
              onClose={onClose}
              groupId={id}
              handleChangeLoading={handleChangeLoading}
            />
            <HStack marginTop={10} justifyContent={'space-between'}>
              <IconButton
                onPress={handleGoBack}
                icon={
                  <Icon
                    as={AntDesign}
                    size={'xl'}
                    name={'arrowleft'}
                    color={'light.50'}
                  />
                }
              />
              {memberIsIngroup && (
                <HStack>
                  <IconButton
                    onPress={onOpen}
                    icon={
                      <Icon
                        as={AntDesign}
                        size={'xl'}
                        name={'ellipsis1'}
                        color={'light.50'}
                      />
                    }
                  />
                  <IconButton
                    onPress={() => {}}
                    icon={
                      <>
                        <Icon
                          as={Ionicons}
                          size={'md'}
                          name={'notifications'}
                          color={'light.50'}
                        />
                        <Badge
                          background={'violet.500'}
                          position="absolute"
                          top={-4}
                          right={-2}
                          borderRadius={'2xl'}
                          width={6}
                          height={6}>
                          <Text
                            width={'100%'}
                            color={'light.300'}
                            fontSize={14}>
                            2
                          </Text>
                        </Badge>
                      </>
                    }
                  />
                </HStack>
              )}
            </HStack>
          </Box>
          <VStack flex={1} paddingX={8}>
            <Heading color={'light.50'} textAlign={'center'} marginTop={6}>
              {group.name}
            </Heading>

            <Button
              marginTop={4}
              title={memberIsIngroup ? 'Sair do grupo' : 'Solicitar entrada'}
            />

            <HStack
              alignItems={'flex-start'}
              marginTop={10}
              justifyContent={'space-between'}>
              <VStack alignItems={'center'}>
                <Heading color={'light.300'} size={'md'}>
                  Total de Tasks
                </Heading>
                <Text color={'light.100'}>{group.tasks?.length}</Text>
              </VStack>
              <VStack alignItems={'center'}>
                <Heading color={'light.300'} size={'md'}>
                  Participantes
                </Heading>
                <Text color={'light.100'}>{group.members?.length}</Text>
              </VStack>
            </HStack>
            <Box marginTop={6}>
              <HStack>
                <Heading color={'light.100'}>Membros</Heading>
              </HStack>

              <FlatList
                marginTop={4}
                height={RFPercentage(25)}
                contentContainerStyle={{
                  paddingVertical: 20,
                }}
                data={sortParticipants(group.members)}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Member {...item} />}
                showsVerticalScrollIndicator={false}
              />
            </Box>
          </VStack>
        </>
      ) : (
        <VStack flex={1} alignItems={'center'} justifyContent={'center'}>
          <Spinner size="large" color={'violet.500'} />
        </VStack>
      )}
    </Box>
  );
};

export {GroupDetails};

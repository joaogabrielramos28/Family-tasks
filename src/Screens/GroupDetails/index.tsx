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
  VStack,
  Spinner,
  Badge,
  Factory,
} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Button, Load} from '../../Components';
import {Member} from './Components/Member';
import {IGroupDto, IMember, INotification} from '../../DTOs/GroupDto';
import {useAuth} from '../../hooks';
import {ActionSheetBg} from './Components/ActionSheetBg';
import {Dimensions} from 'react-native';
import uuid from 'react-native-uuid';
import {AlertDialog} from '../../Components/AlertDialog';
import FastImage from 'react-native-fast-image';
import {api} from '../../services/api';

interface Params {
  id: string;
}

const GroupDetails = () => {
  const width = Dimensions.get('window').width;
  const {user} = useAuth();
  const {goBack, navigate} = useNavigation<any>();
  const [group, setGroup] = useState<IGroupDto>({} as IGroupDto);
  const [memberIsIngroup, setMemberIsIngroup] = useState(false);
  const [sentNotification, setSentNotification] = useState(false);
  const [loadingChangeBackground, setLoadingChangeBackground] = useState(false);
  const [confirmationToExitIsOpen, setConfirmationToExitIsOpen] =
    useState(false);
  const [load, setLoad] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const route = useRoute();
  const {isOpen, onOpen, onClose} = useDisclose();

  const FastImageFactory = Factory(FastImage);

  const onToggleAlertDialog = () =>
    setConfirmationToExitIsOpen(!confirmationToExitIsOpen);

  useEffect(() => {
    group.notifications?.find(
      notification => notification.member.id === user.id,
    )
      ? setSentNotification(true)
      : setSentNotification(false);
  }, [group, user.id]);

  const handleGoBack = () => {
    goBack();
  };

  const handleGoToNotificationsScreen = () => {
    navigate('Notifications', {groupId: id});
  };

  const {id} = route.params as Params;

  const handleChangeLoading = useCallback((state: boolean) => {
    return setLoadingChangeBackground(state);
  }, []);

  const handleRequestEntry = async () => {
    const admin = group.members.filter(
      member => member.groupInfo.position === 'Administrator',
    );

    const member: IMember = {
      id: user?.id,
      name: user?.name,
      photo_url: user?.photo_url,
      email: user?.email,
      pushTokenId: user.pushTokenId,
    };

    await api.post('/', {
      token: admin[0].pushTokenId,
      title: 'Solicitação de entrada!',
      body: `${member.name} solicitou entrada no ${group.name}`,
    });

    const notification: INotification = {
      id: uuid.v4() as string,
      group_id: group?.id,
      member,
      message: `${user?.name} solicitou entrada no grupo ${group?.name}`,
      createdAt: new Date(),
    };

    try {
      await firestore()
        .collection('Groups')
        .doc(id)
        .update({
          notifications: [...group?.notifications, notification],
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const subscribe = firestore()
      .collection('Groups')
      .doc(id)
      .onSnapshot(async querySnapshot => {
        const group = querySnapshot.data();
        setGroup(group as IGroupDto);

        Promise.all(
          group.members.map(async doc => {
            return await doc.get().then(member => {
              return {...member.data(), id: member.id};
            });
          }),
        )

          .then(members => {
            setGroup({...(group as IGroupDto), members});
            const checkIfMemberIsInGroup = members.find(
              member => member.id === user.id,
            );

            if (checkIfMemberIsInGroup) {
              setMemberIsIngroup(true);
            }
            setLoad(false);
          })
          .catch(e => console.log(e));
      });
    return () => subscribe();
  }, [id, user.id]);

  const sortParticipants = (members: IMember[]) => {
    return members?.sort((a: IMember) => {
      if (a.position === 'Administrator') {
        return -1;
      }
      return 1;
    });
  };

  const handleExitOfGroup = async () => {
    const items = [];
    for (let i = 0; i < group.members.length; i++) {
      if (group.members[i].id !== user.id) {
        const ref = firestore().collection('Users').doc(group.members[i].id);

        items.push(ref);
      }
    }

    try {
      await firestore().collection('Groups').doc(id).update({
        members: items,
      });
      await firestore().collection('Users').doc(user.id).update({
        groupInfo: firestore.FieldValue.delete(),
      });
    } catch (error) {
      console.log(error);
    }
    setSentNotification(false);
    setMemberIsIngroup(false);
    onToggleAlertDialog();
  };

  const checkUserIsAdmin = useCallback(() => {
    if (user.groupInfo?.id === id) {
      setIsAdmin(user.groupInfo?.position === 'Administrator');
    }
  }, [id, user?.groupInfo]);

  useEffect(() => {
    checkUserIsAdmin();
  }, [checkUserIsAdmin]);

  if (load || !group.name) {
    return <Load />;
  }

  return (
    <Box flex={1} bg={'warmGray.900'}>
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
          {group.background && (
            <FastImageFactory
              source={{
                uri: group.background,
              }}
              onLoad={() => setLoadingChangeBackground(false)}
              position="absolute"
              width={width}
              resizeMode="cover"
              height={RFValue(200)}
            />
          )}

          <ActionSheetBg
            backgroundPath={group.photo_path}
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
            {memberIsIngroup && isAdmin && (
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
                  onPress={handleGoToNotificationsScreen}
                  icon={
                    <>
                      <Icon
                        as={Ionicons}
                        size={'md'}
                        name={'notifications'}
                        color={'light.50'}
                      />
                      {group.notifications.length > 0 && (
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
                            {group.notifications.length}
                          </Text>
                        </Badge>
                      )}
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
            title={
              memberIsIngroup
                ? 'Sair do grupo'
                : !memberIsIngroup && !sentNotification
                ? 'Solicitar entrada'
                : 'Solicitação enviada'
            }
            isDisabled={
              sentNotification || (!!user.groupInfo && !memberIsIngroup)
            }
            onPress={memberIsIngroup ? onToggleAlertDialog : handleRequestEntry}
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
              renderItem={({item}) => <Member {...item} isAdmin={isAdmin} />}
              showsVerticalScrollIndicator={false}
            />
          </Box>
        </VStack>
      </>

      <AlertDialog
        isOpen={confirmationToExitIsOpen}
        title={'Sair do grupo'}
        body={'Tem certeza que deseja sair do grupo?'}
        buttonCancelTitle={'Cancelar'}
        buttonSuccesTitle={'Sair'}
        onSuccess={handleExitOfGroup}
        onCancel={onToggleAlertDialog}
        onClose={onToggleAlertDialog}
      />
    </Box>
  );
};

export {GroupDetails};

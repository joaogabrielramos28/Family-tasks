import {Avatar, Box, HStack, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {IGroupDto, IMember} from '../../../../DTOs/GroupDTO';
import {Alert, Dimensions} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {AlertDialog} from '../../../../Components/AlertDialog';
import firestore from '@react-native-firebase/firestore';
import {api} from '../../../../services/api';

interface NotificationCardProps {
  member: IMember;
  id: string;
  message: string;
  createdAt: Date;
  groupId: string;
}

const NotificationCard = ({
  member,
  message,
  id,
  groupId,
}: NotificationCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [group, setGroup] = useState<IGroupDto>();
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const width = Dimensions.get('screen').width;

  useEffect(() => {
    const subscribe = firestore()
      .collection('Groups')
      .doc(groupId)
      .onSnapshot(querySnapshot => {
        setGroup(querySnapshot.data() as IGroupDto);
      });

    return () => subscribe();
  }, [groupId]);

  const onSuccess = async () => {
    const removeNotification = group?.notifications.filter(
      notification => notification?.id !== id,
    );
    const memberRef = firestore().collection('Users').doc(member.id);

    try {
      await firestore()
        .collection('Groups')
        .doc(groupId)
        .update({
          members: [...group?.members, memberRef],
          notifications: removeNotification,
        });

      await firestore()
        .collection('Users')
        .doc(member.id)
        .update({
          groupInfo: {
            id: group.id,
            position: 'Member',
          },
        });
      await api.post('/', {
        token: member.pushTokenId,
        title: 'Parabéns!',
        body: `${member.name} você foi aceito no ${group.name}`,
      });
    } catch (e) {
      Alert.alert('Ocorreu um erro ao aceitar');
      console.log(e);
    }
  };

  const onCancel = async () => {
    const removeNotification = group?.notifications.filter(
      notification => notification?.id !== id,
    );

    await firestore().collection('Groups').doc(groupId).update({
      notifications: removeNotification,
    });
  };

  return (
    <BorderlessButton onPress={onOpen}>
      <Box
        width={width}
        paddingX={4}
        bgColor={'warmGray.700'}
        height={'80px'}
        justifyContent={'center'}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Avatar source={{uri: member?.photo_url}} />
          <Text fontSize={12} color={'light.300'} maxW={width - 140}>
            {message}
          </Text>
          <Text color={'light.300'}>hoje</Text>
          {/* <Text>{id}</Text> */}
        </HStack>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        onSuccess={onSuccess}
        onCancel={onCancel}
        title={'Solicitação de entrada'}
        body={`Você deseja aceitar ${member.name} no seu grupo?`}
        buttonCancelTitle={'Negar'}
        buttonSuccesTitle={'Aceitar'}
        onClose={onClose}
      />
    </BorderlessButton>
  );
};

export {NotificationCard};

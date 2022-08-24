import {Avatar, Box, HStack, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {IGroupDto, IMember} from '../../../../DTOs/GroupDTO';
import {Dimensions} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {AlertDialog} from '../../../../Components/AlertDialog';
import firestore from '@react-native-firebase/firestore';

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
  // createdAt,
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

    await firestore()
      .collection('Groups')
      .doc(groupId)
      .update({
        members: [...group?.members, {...member, position: 'member'}],
        notifications: removeNotification,
      });
    onClose();
  };

  const onCancel = async () => {
    const removeNotification = group?.notifications.filter(
      notification => notification?.id !== id,
    );

    await firestore().collection('Groups').doc(groupId).update({
      notifications: removeNotification,
    });
    onClose();
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
          <Avatar source={{uri: member?.photoURL}} />
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

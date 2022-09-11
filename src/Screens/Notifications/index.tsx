import {AntDesign} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Box,
  Divider,
  FlatList,
  Heading,
  HStack,
  Icon,
  IconButton,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {BorderlessButton} from 'react-native-gesture-handler';
import {IGroupDto, INotification} from '../../DTOs/GroupDto';
import {NotificationCard} from './Components/NotificationCard';
import firestore from '@react-native-firebase/firestore';
import {NotificationsNavigationParams} from '../../@types/navigation/navigation';

const Notifications = () => {
  const {goBack} = useNavigation<any>();
  const route = useRoute();
  const handleGoBack = () => {
    goBack();
  };
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const {groupId} = route.params as NotificationsNavigationParams;

  useEffect(() => {
    const subscribe = firestore()
      .collection('Groups')
      .doc(groupId)
      .onSnapshot(querySnapshot => {
        const group = querySnapshot.data() as IGroupDto;
        setNotifications(group.notifications);
      });
    return () => subscribe();
  }, [groupId]);

  return (
    <Box flex={1} bgColor={'warmGray.900'} safeArea>
      <HStack paddingX={4} alignItems={'center'}>
        <BorderlessButton onPress={handleGoBack}>
          <IconButton
            icon={
              <Icon
                as={AntDesign}
                size={'xl'}
                name={'arrowleft'}
                color={'light.50'}
              />
            }
          />
        </BorderlessButton>
        <Heading color={'light.50'}>Notificações</Heading>
      </HStack>

      <FlatList
        contentContainerStyle={{
          paddingVertical: 20,
        }}
        data={notifications}
        ItemSeparatorComponent={() => <Divider background={'warmGray.600'} />}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <>
            <NotificationCard
              id={item.id}
              groupId={item.group_id}
              member={item.member}
              message={item.message}
              createdAt={item.createdAt}
            />
          </>
        )}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export {Notifications};

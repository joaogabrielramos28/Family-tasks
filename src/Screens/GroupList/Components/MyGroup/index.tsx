import {Box, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {GroupCard} from '../GroupCard';
import firestore from '@react-native-firebase/firestore';
import {IGroupDto} from '../../../../DTOs/GroupDto';
import {ActivityIndicator} from 'react-native';
import {useAuth} from '../../../../hooks';

const MyGroup = () => {
  const {user} = useAuth();
  const [myGroups, setMyGroups] = React.useState<IGroupDto>({} as IGroupDto);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(user.id)
      .get()
      .then(member => {
        if (member.data()?.groupInfo?.id === undefined) {
          setMyGroups({} as IGroupDto);
          setLoading(false);
        } else {
          const groupID = member.data().groupInfo.id;
          const subscribe = firestore()
            .collection('Groups')
            .doc(groupID)
            .onSnapshot(async querySnapshot => {
              const group = querySnapshot.data() as IGroupDto;
              const members = await Promise.all(
                group.members.map(async doc => {
                  return doc;
                }),
              );
              const membersGroups = members.map(doc => ({
                id: doc.id,
                ...doc,
              }));

              setMyGroups({id: group.id, ...group, members: membersGroups});
              setLoading(false);
            });

          return () => subscribe();
        }
      })
      .catch(e => console.log(e));
  }, [user.id]);

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <>
      {myGroups.id ? (
        <Box marginTop={10} paddingX={6}>
          <GroupCard
            id={myGroups.id}
            background={myGroups.background}
            name={myGroups.name}
            description={myGroups.description}
            members={myGroups.members}
          />
        </Box>
      ) : (
        <VStack alignItems={'center'} justifyContent={'center'} marginTop={20}>
          <Text color={'light.300'} fontSize={'xl'}>
            Você não está em nenhum grupo {':('}
          </Text>
        </VStack>
      )}
    </>
  );
};

export {MyGroup};

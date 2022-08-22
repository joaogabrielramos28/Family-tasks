import {FlatList, Text, VStack} from 'native-base';
import React, {useEffect} from 'react';
import {GroupCard} from '../GroupCard';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../../../../hooks';
import {IGroupDto, IMember} from '../../../../DTOs/GroupDto';

const MyGroup = () => {
  const {user} = useAuth();
  const [myGroups, setMyGroups] = React.useState<IGroupDto[]>([]);

  useEffect(() => {
    const me: IMember = {
      id: user.uid,
      photoURL: user.photoURL,
      name: user.displayName,
      position: 'Administrator',
    };
    const subscribe = firestore()
      .collection('Groups')
      .where('members', 'array-contains', me)
      .onSnapshot(querySnapshot => {
        const myGroups = querySnapshot.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        }) as IGroupDto[];
        setMyGroups(myGroups);
      });
    return () => subscribe();
  }, [user]);
  return (
    <>
      {myGroups.length > 0 ? (
        <FlatList
          marginTop={10}
          data={myGroups}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <GroupCard
              id={item.id}
              name={item.name}
              description={item.description}
              members={item.members}
            />
          )}
        />
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

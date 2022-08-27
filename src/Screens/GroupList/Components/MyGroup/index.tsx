import {FlatList, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {GroupCard} from '../GroupCard';
import firestore from '@react-native-firebase/firestore';
import {IGroupDto} from '../../../../DTOs/GroupDto';
import {ActivityIndicator} from 'react-native';

const MyGroup = () => {
  const [myGroups, setMyGroups] = React.useState<IGroupDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscribe = firestore()
      .collection('Groups')
      .onSnapshot(querySnapshot => {
        const groups = querySnapshot.docs.map(async doc => {
          const group = doc.data();
          const members = await Promise.all(
            group.members.map(async doc => {
              return await doc.get();
            }),
          );
          const membersGroups = members.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          return {
            id: doc.id,
            ...doc.data(),
            members: membersGroups,
          };
        }) as unknown as IGroupDto[];
        Promise.all(groups)
          .then(group => {
            setLoading(false);
            setMyGroups(group);
          })
          .catch(e => console.log(e));
      });

    return () => subscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
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

import {FlatList} from 'native-base';
import React, {useEffect, useState} from 'react';
import {IGroupDto} from '../../../../DTOs/GroupDto';
import {GroupCard} from '../GroupCard';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native';

const AllGroups = () => {
  const [groups, setGroups] = useState<IGroupDto[]>([]);
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
            setGroups(group);
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
      <FlatList
        marginTop={10}
        data={groups}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 125,
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <>
            <GroupCard
              id={item.id}
              name={item.name}
              background={item.background}
              description={item.description}
              members={item.members}
            />
          </>
        )}
      />
    </>
  );
};

export {AllGroups};

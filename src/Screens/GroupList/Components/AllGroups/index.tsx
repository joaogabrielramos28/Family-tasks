import {FlatList} from 'native-base';
import React, {useEffect, useState} from 'react';
import {IGroupDto} from '../../../../DTOs/GroupDto';
import {GroupCard} from '../GroupCard';
import firestore from '@react-native-firebase/firestore';

const AllGroups = () => {
  const [groups, setGroups] = useState<IGroupDto[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collectionGroup('Groups')
      .onSnapshot(querySnapshot => {
        const groups = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as IGroupDto[];

        setGroups(groups);
      });
    return () => subscribe();
  }, []);

  return (
    <FlatList
      marginTop={10}
      data={groups}
      contentContainerStyle={{
        paddingHorizontal: 20,
      }}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <GroupCard
          name={item.name}
          description={item.description}
          members={item.members || []}
        />
      )}
    />
  );
};

export {AllGroups};

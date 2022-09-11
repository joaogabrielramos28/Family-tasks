import {Box, FlatList, Heading, HStack, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {WeekCalendar} from './Components/WeekCalendar';
import {Task} from './Components/Task';

import {ITask} from '../../DTOs/GroupDto';
import {useAuth} from '../../hooks';

import firestore from '@react-native-firebase/firestore';
import {format} from 'date-fns';

const Tasks = () => {
  const {user} = useAuth();
  const [tasks, setTasks] = useState<ITask[]>([]);

  const groupId = user.groupInfo?.id;
  useEffect(() => {
    const subscribe = firestore()
      .collection('Groups')
      .doc(groupId)
      .onSnapshot(async querySnapshot => {
        const group = querySnapshot.data();
        Promise.all(
          group.tasks.map(async task => {
            const responsible = await task.responsible.get();
            const relator = await task.relator.get();
            const dateFormatted = format(
              new Date(task.date.seconds * 1000),
              'dd/MM/yyyy',
            );

            return {
              ...task,
              date: dateFormatted,
              responsible: responsible.data(),
              relator: relator.data(),
            };
          }),
        )
          .then(async response => {
            setTasks(response);
          })
          .catch(() => {});
      });
    return () => subscribe();
  }, [groupId]);

  return (
    <Box width={'100%'} background={'warmGray.900'} flex={1} paddingBottom={20}>
      <VStack
        background={'warmGray.800'}
        width={'100%'}
        height={'120px'}
        borderBottomLeftRadius={'20px'}
        padding={'20px'}
        justifyContent={'center'}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Heading color={'light.50'}>Minhas tarefas</Heading>

          <Text color={'light.50'} fontSize={16} fontWeight={'bold'}>
            Total {tasks.length} tarefas
          </Text>
        </HStack>
      </VStack>
      <WeekCalendar />

      <FlatList
        paddingX={10}
        data={tasks}
        marginTop={10}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Task
            status={item.status}
            id={item.id}
            title={item.name}
            category={item.category}
            responsible={item.responsible}
            date={item.date}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export {Tasks};

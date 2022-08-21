import {Box, FlatList, Heading, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {WeekCalendar} from './Components/WeekCalendar';
import {Task} from './Components/Task';
import {Status} from './Components/Task/types';

const INITIAL_TASK = [
  {
    status: Status.Completed,
    id: 'Task 1',
  },
  {
    status: Status.Doing,
    id: 'task 2',
  },
  {
    status: Status.Completed,
    id: 'task 3',
  },
  {
    status: Status.Completed,
    id: 'task 4',
  },
  {
    status: Status.Doing,
    id: 'task 5',
  },
  {
    status: Status.Completed,
    id: 'task 6',
  },
  {
    status: Status.Completed,
    id: 'task 7',
  },
  {
    status: Status.Doing,
    id: 'task 8',
  },
  {
    status: Status.Completed,
    id: 'task 9',
  },
  {
    status: Status.Doing,
    id: 'task 12',
  },
];

const Tasks = () => {
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
            Total 10 tarefas
          </Text>
        </HStack>
      </VStack>
      <WeekCalendar />

      <FlatList
        paddingX={10}
        data={INITIAL_TASK}
        marginTop={10}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Task status={item.status} id={item.id} />}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export {Tasks};

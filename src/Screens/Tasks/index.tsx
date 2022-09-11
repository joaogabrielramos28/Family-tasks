import {Box, FlatList, Heading, HStack, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {WeekCalendar} from './Components/WeekCalendar';
import {Task} from './Components/Task';

import {ITask} from '../../DTOs/GroupDto';
import {useAuth} from '../../hooks';

import firestore from '@react-native-firebase/firestore';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {Load} from '../../Components';

const Tasks = () => {
  const {user} = useAuth();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'dd/MM/yyyy'),
  );

  const handleChangeSelectedDate = (date: string) => {
    setSelectedDate(date);
  };

  const {navigate} = useNavigation();

  function handleNavigateToTask(task: ITask) {
    navigate('TaskDetails', {task});
  }

  const tasksPerDate = tasks.filter(task => task.date === selectedDate);

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
            setLoading(false);
          })
          .catch(() => {});
      });
    return () => subscribe();
  }, [groupId]);

  if (loading) {
    return <Load />;
  }

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
            Total {tasksPerDate.length} tarefas
          </Text>
        </HStack>
      </VStack>
      <WeekCalendar onChangeDate={handleChangeSelectedDate} />
      {tasksPerDate.length === 0 && (
        <Box alignItems={'center'} justifyContent={'center'} flex={1}>
          <Heading color={'light.300'} size={'sm'}>
            {' '}
            Nenhuma tarefa para essa data :({' '}
          </Heading>
        </Box>
      )}
      <FlatList
        paddingX={10}
        data={tasksPerDate}
        marginTop={10}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Task
            status={item.status}
            title={item.name}
            category={item.category}
            responsible={item.responsible}
            date={item.date}
            onPress={() => handleNavigateToTask(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export {Tasks};

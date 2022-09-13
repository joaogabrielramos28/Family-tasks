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
import {Alert} from 'react-native';

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
      .collection('Tasks')
      .where('group_id', '==', groupId)
      .where('date', '==', selectedDate)
      .onSnapshot(async querySnapshot => {
        const tasks = querySnapshot.docs.map(async doc => {
          const task = doc.data();

          const responsible = await task.responsible.get();
          const relator = await task.relator.get();
          return {
            id: doc.id,
            ...task,
            responsible: {...responsible.data(), id: responsible.id},
            relator: {...relator.data(), id: relator.id},
          };
        });

        Promise.all(tasks)
          .then(response => {
            setTasks(response as ITask[]);
          })

          .catch(err => {
            Alert.alert('Erro ao buscar tasks');
            console.log(err);
          });
      });
    setLoading(false);
    return () => subscribe();
  }, [groupId, selectedDate]);

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

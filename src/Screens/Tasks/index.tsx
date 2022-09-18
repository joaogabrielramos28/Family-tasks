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
import {theme} from '../../theme';

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
    navigate('TaskDetails', {id: task.id});
  }

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
            setLoading(false);
          })

          .catch(err => {
            Alert.alert('Erro ao buscar tasks');
            console.log(err);
          });
      });

    return () => subscribe();
  }, [groupId, selectedDate]);

  if (loading) {
    return <Load />;
  }

  return (
    <Box
      width={'100%'}
      background={theme.colors.background[900]}
      flex={1}
      paddingBottom={20}>
      <VStack
        background={theme.colors.background[800]}
        width={'100%'}
        height={'120px'}
        borderBottomLeftRadius={'20px'}
        padding={'20px'}
        justifyContent={'center'}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Heading color={theme.colors.title}>Minhas tarefas</Heading>

          <Text color={theme.colors.title} fontSize={16} fontWeight={'bold'}>
            Total {tasks.length} tarefas
          </Text>
        </HStack>
      </VStack>
      <WeekCalendar onChangeDate={handleChangeSelectedDate} />

      <FlatList
        paddingX={10}
        data={tasks}
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
        ListEmptyComponent={() => (
          <Box alignItems={'center'} justifyContent={'center'} flex={1}>
            <Heading color={theme.colors.text} size={'sm'}>
              {' '}
              Nenhuma tarefa para essa data :({' '}
            </Heading>
          </Box>
        )}
      />
    </Box>
  );
};

export {Tasks};

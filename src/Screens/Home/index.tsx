import {Box, Heading, ScrollView} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Header, Load} from '../../Components';

import {ProgressChart} from './Components/ProgressChart';
import {TasksStatistics} from './Components/TasksStatistics';

import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../../hooks';
import {ITask} from '../../DTOs/GroupDto';
import {Alert} from 'react-native';
import {format} from 'date-fns';
import {Status} from '../Tasks/Components/Task/types';

const Home = () => {
  const {user} = useAuth();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const today = format(new Date(), 'dd/MM/yyyy');
  const dailyTasks = tasks.filter(task => task?.date === today);
  const activeTasks = tasks.filter(
    task => task?.status !== Status.Completed && task,
  );

  useEffect(() => {
    const subscribe = firestore()
      .collection('Groups')
      .doc(user.groupInfo?.id)
      .onSnapshot(async querySnapshot => {
        const group = querySnapshot.data();
        Promise.all(
          group.tasks.map(async task => {
            const responsible = await task.responsible.get();
            const relator = await task.relator.get();

            if (responsible.id === user.id) {
              return {
                ...task,
                responsible: {...responsible.data(), id: responsible.id},
                relator: {...relator.data(), id: relator.id},
              };
            }
          }),
        )
          .then(async response => {
            setTasks(response);
          })
          .catch(err => {
            Alert.alert('Erro ao buscar tasks');
            console.log(err);
          });
      });
    setLoading(false);
    return () => subscribe();
  }, [user.groupInfo?.id, user.id]);

  if (loading) {
    return <Load />;
  }
  return (
    <>
      <ScrollView bg={'warmGray.900'} flex={1}>
        <Header />
        <Box>
          <Box marginTop={6} w={'100%'} display={'flex'} alignItems={'center'}>
            <Heading color={'light.100'}>Tasks completadas </Heading>
          </Box>

          <ProgressChart />

          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-around'}>
            <TasksStatistics
              title="Tasks diárias"
              icon={'pen'}
              value={dailyTasks.length}
              color={'yellow.600'}
            />
            <TasksStatistics
              title="Tasks ativas"
              icon={'toggle-on'}
              color={'success.400'}
              value={activeTasks.length}
            />
          </Box>
        </Box>
      </ScrollView>
    </>
  );
};

export {Home};

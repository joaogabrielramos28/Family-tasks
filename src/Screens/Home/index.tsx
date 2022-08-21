import {Box, Heading, ScrollView, Spinner} from 'native-base';
import React from 'react';
import {Header} from '../../Components';
import {useAuth} from '../../hooks';

import {ProgressChart} from './Components/ProgressChart';
import {TasksStatistics} from './Components/TasksStatistics';

const Home = () => {
  const {initializing} = useAuth();

  return (
    <>
      {initializing ? (
        <Box
          bg={'warmGray.800'}
          flex={1}
          display={'flex'}
          justifyContent={'center'}>
          <Spinner size="lg" color={'violet.500'} />
        </Box>
      ) : (
        <ScrollView bg={'warmGray.900'} flex={1}>
          <Header />
          <Box>
            <Box
              marginTop={6}
              w={'100%'}
              display={'flex'}
              alignItems={'center'}>
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
                value={8}
                color={'yellow.600'}
              />
              <TasksStatistics
                title="Tasks ativas"
                icon={'toggle-on'}
                color={'success.400'}
                value={12}
              />
            </Box>
          </Box>
        </ScrollView>
      )}
    </>
  );
};

export {Home};

import {useNavigation} from '@react-navigation/native';
import {Box, Factory, Heading, HStack, Text, VStack} from 'native-base';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {BorderlessButton} from 'react-native-gesture-handler';
import {ITask, Status} from './types';

const Task = ({status, id, title, category, responsible, date}: ITask) => {
  const {navigate} = useNavigation();

  function handleNavigateToTask() {
    navigate('TaskDetails', {id});
  }

  const FactoryImage = Factory(FastImage);

  return (
    <BorderlessButton onPress={handleNavigateToTask}>
      <Box
        width={'100%'}
        background={'warmGray.600'}
        borderRadius={8}
        color={'light.50'}
        height={'140px'}
        padding={6}
        alignItems={'flex-start'}
        marginBottom={6}>
        <VStack width={'100%'} justifyContent={'space-between'}>
          <VStack>
            <Heading color={'light.50'}>{title}</Heading>
            <Text color={'light.400'}>{category}</Text>
          </VStack>

          <HStack alignItems={'center'} justifyContent={'center'} marginTop={6}>
            <HStack>
              <HStack alignItems={'center'} space={2}>
                <FactoryImage
                  rounded={'full'}
                  size={8}
                  source={{
                    uri: responsible?.photo_url || '',
                  }}
                />
                <Text color={'light.400'}>{date}</Text>
              </HStack>
            </HStack>
            <Box alignItems={'flex-end'} justifyContent={'flex-end'} flex={1}>
              <HStack alignItems={'center'} space={2} w={20}>
                <Box
                  w={'15px'}
                  h={'15px'}
                  bg={status === Status.Completed ? 'green.500' : 'yellow.300'}
                  borderRadius={50}
                />
                <Text color={'light.400'}>
                  {status === Status.Completed ? 'Finalizado' : 'Ativo'}
                </Text>
              </HStack>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </BorderlessButton>
  );
};

export {Task};

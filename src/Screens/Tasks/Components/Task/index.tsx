import {Box, Factory, Heading, HStack, Text, VStack} from 'native-base';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {BorderlessButton} from 'react-native-gesture-handler';
import {theme} from '../../../../theme';
import {ITask, Status} from './types';

const Task = ({status, title, category, responsible, date, ...rest}: ITask) => {
  const FactoryImage = Factory(FastImage);

  return (
    <BorderlessButton {...rest}>
      <Box
        width={'100%'}
        background={theme.colors.background[600]}
        borderRadius={8}
        color={theme.colors.title}
        height={'140px'}
        padding={6}
        alignItems={'flex-start'}
        marginBottom={6}>
        <VStack width={'100%'} justifyContent={'space-between'}>
          <VStack>
            <Heading color={theme.colors.title}>{title}</Heading>
            <Text color={theme.colors.text}>{category}</Text>
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
                <Text color={theme.colors.text}>{date}</Text>
              </HStack>
            </HStack>
            <Box alignItems={'flex-end'} justifyContent={'flex-end'} flex={1}>
              <HStack alignItems={'center'} space={2} w={24}>
                <Box
                  w={'15px'}
                  h={'15px'}
                  bg={
                    status === Status.Completed
                      ? 'green.500'
                      : status === Status.Doing
                      ? 'yellow.500'
                      : 'violet.500'
                  }
                  borderRadius={50}
                />
                <Text color={theme.colors.text}>
                  {status === Status.Completed
                    ? 'Finalizado'
                    : status === Status.Doing
                    ? 'Em progresso'
                    : 'À fazer'}
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

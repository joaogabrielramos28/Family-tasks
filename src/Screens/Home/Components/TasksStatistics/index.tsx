import {Box, Icon, Text} from 'native-base';
import React from 'react';
import {ITasksStatisticsProps} from './types';
import {FontAwesome5} from '@expo/vector-icons';
import {theme} from '../../../../theme';
const TasksStatistics = ({
  value,
  title,
  icon,
  color,
}: ITasksStatisticsProps): JSX.Element => {
  return (
    <Box
      display={'flex'}
      background={theme.colors.background[800]}
      width={'140px'}
      height={'80px'}
      borderRadius={12}
      alignItems={'center'}
      justifyContent={'center'}
      padding={6}>
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
        <Icon
          name={icon}
          as={FontAwesome5}
          size={4}
          color={color}
          marginRight={2}
        />

        <Text color={theme.colors.title} fontWeight={'bold'}>
          {title}
        </Text>
      </Box>
      <Text color={theme.colors.text} fontSize={'22'} fontWeight={'bold'}>
        {value}
      </Text>
    </Box>
  );
};

export {TasksStatistics};

import {Factory} from 'native-base';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {BorderlessButton} from 'react-native-gesture-handler';
import {theme} from '../../../../theme';
import {ITaskResponsibleProps} from './types';

const TaskResponsible = ({photo, selected, onPress}: ITaskResponsibleProps) => {
  const FactoryImage = Factory(FastImage);
  return (
    <BorderlessButton onPress={onPress}>
      <FactoryImage
        rounded={'full'}
        size={12}
        marginRight={3}
        source={{uri: photo}}
        borderColor={theme.colors.primary[500]}
        borderWidth={selected && 2}
      />
    </BorderlessButton>
  );
};

export {TaskResponsible};

import React from 'react';
import {Actionsheet, IActionsheetItemProps} from 'native-base';
import {BorderlessButton} from 'react-native-gesture-handler';
import {theme} from '../../../theme';

interface ActionSheetItemProps extends IActionsheetItemProps {
  children: React.ReactNode;
  onPress: () => void;
}

const ActionSheetItem = ({
  children,
  onPress,
  ...rest
}: ActionSheetItemProps) => {
  return (
    <BorderlessButton onPress={onPress}>
      <Actionsheet.Item
        {...rest}
        background={theme.colors.background[800]}
        _text={{
          color: theme.colors.text,
        }}>
        {children}
      </Actionsheet.Item>
    </BorderlessButton>
  );
};

export {ActionSheetItem};

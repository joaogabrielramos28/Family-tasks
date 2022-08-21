import React from 'react';
import {Actionsheet, IActionsheetItemProps} from 'native-base';
import {BorderlessButton} from 'react-native-gesture-handler';

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
        background={'warmGray.800'}
        _text={{
          color: 'light.300',
        }}>
        {children}
      </Actionsheet.Item>
    </BorderlessButton>
  );
};

export {ActionSheetItem};

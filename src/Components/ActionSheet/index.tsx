import {Actionsheet as ActionSheetBase, Icon} from 'native-base';
import React from 'react';
import {Path} from 'react-native-svg';
import {theme} from '../../theme';

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ActionSheet = ({isOpen, onClose, children}: ActionSheetProps) => {
  return (
    <ActionSheetBase isOpen={isOpen} onClose={onClose} size="full">
      <ActionSheetBase.Content
        background={theme.colors.background[800]}
        alignItems={'flex-start'}>
        {children}
        <ActionSheetBase.Item
          _text={{
            color: theme.colors.text,
          }}
          background={theme.colors.background[800]}
          onPress={onClose}
          startIcon={
            <Icon
              size={6}
              color={theme.colors.title}
              mr="1"
              h="24"
              w="24"
              viewBox="0 0 24 24"
              fill="none">
              <Path d="M12.0007 10.5862L16.9507 5.63623L18.3647 7.05023L13.4147 12.0002L18.3647 16.9502L16.9507 18.3642L12.0007 13.4142L7.05072 18.3642L5.63672 16.9502L10.5867 12.0002L5.63672 7.05023L7.05072 5.63623L12.0007 10.5862Z" />
            </Icon>
          }>
          Cancelar
        </ActionSheetBase.Item>
      </ActionSheetBase.Content>
    </ActionSheetBase>
  );
};

export {ActionSheet};

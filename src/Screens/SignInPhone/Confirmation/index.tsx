import React, {useState} from 'react';
import {Box, Heading, Text, VStack} from 'native-base';
import {RFValue} from 'react-native-responsive-fontsize';
import OTPImg from '../../../assets/otp-img.svg';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {StyleSheet, View} from 'react-native';
import {Button} from '../../../Components';
import {useRoute} from '@react-navigation/native';
import {ConfirmationCodeNavigationParams} from '../../../@types/navigation/navigation';
import {theme} from '../../../theme';

const CELL_COUNT = 6;

const styles = StyleSheet.create({
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#e7e5e4',
    textAlign: 'center',
    color: '#f5f5f4',
  },
  focusCell: {
    borderColor: '#8b5cf6',
  },
});

const ConfirmationCodeScreen = () => {
  const route = useRoute();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [loading, setIsLoading] = useState(false);

  const {confirmation} = route.params as ConfirmationCodeNavigationParams;

  const signIn = async () => {
    try {
      setIsLoading(true);
      await confirmation.confirm(value);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  return (
    <Box
      flex={1}
      bg={theme.colors.background[900]}
      display={'flex'}
      justifyContent={'center'}
      paddingX={8}>
      <VStack w={'100%'} alignItems={'center'}>
        <Heading color={theme.colors.title} textAlign={'center'}>
          Verificação de código de segurança
        </Heading>
        <OTPImg width={240} height={RFValue(240)} />
        <Text color={theme.colors.text} textAlign={'center'}>
          Digite o código de segurança {'\n'} enviado para o seu número de
          telefone
        </Text>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View key={index} onLayout={getCellOnLayoutHandler(index)}>
              <Text style={[styles.cell, isFocused && styles.focusCell]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />

        <Button
          title="Verificar"
          w={'100%'}
          marginTop={4}
          onPress={signIn}
          isLoading={loading}
        />
      </VStack>
    </Box>
  );
};

export {ConfirmationCodeScreen};

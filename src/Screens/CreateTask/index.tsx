import {
  Box,
  Heading,
  HStack,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Text,
  TextArea,
  useTheme,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dimensions} from 'react-native';
import {Badge} from './Components/Badge';
import {TaskResponsible} from './Components/TaskResponsible';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Button} from '../../Components';

const CreateTask = () => {
  const [date, setDate] = useState(new Date());
  const [categorySelected, setCategorySelected] = useState('');
  const [responsible, setResponsible] = useState('');

  const changeDate = (event: any, date) => {
    setDate(date);
  };

  const theme = useTheme();

  const {height} = Dimensions.get('screen');

  const handleSelectCategory = (category: string) => {
    setCategorySelected(category);
    console.log(categorySelected);
  };

  return (
    <KeyboardAvoidingView>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView behavior="height" enabled>
        <ScrollView
          bgColor={'warmGray.900'}
          _contentContainerStyle={{
            padding: 6,
            marginTop: getStatusBarHeight(),
          }}>
          <Box
            bgColor={'warmGray.900'}
            alignItems={'center'}
            display={'flex'}
            height={height}>
            <HStack justifyContent="space-between" alignItems="center">
              <Heading color={'light.50'} marginBottom={2}>
                Adicionar Task
              </Heading>
            </HStack>
            <VStack>
              <VStack>
                <Text
                  color={'light.50'}
                  marginBottom={2}
                  fontSize={14}
                  fontWeight={'bold'}>
                  Nome
                </Text>
                <Input
                  color={'light.50'}
                  bgColor={'warmGray.800'}
                  _focus={{borderWidth: 1, borderColor: 'violet.500'}}
                  borderWidth={1}
                  borderColor={'warmGray.600'}
                  placeholder="Nome da task"
                />
              </VStack>
              <VStack marginY={2}>
                <Text
                  color={'light.50'}
                  marginBottom={2}
                  fontSize={14}
                  fontWeight={'bold'}>
                  Descriçao
                </Text>
                <TextArea
                  autoCompleteType={'off'}
                  h={20}
                  placeholder={'Digite a descriçao'}
                  color={'light.50'}
                  bgColor={'warmGray.800'}
                  _focus={{borderWidth: 1, borderColor: 'violet.500'}}
                  borderWidth={1}
                  borderColor={'warmGray.600'}
                />
              </VStack>
              <HStack>
                <VStack>
                  <Text
                    color={'light.50'}
                    marginBottom={2}
                    fontSize={14}
                    fontWeight={'bold'}>
                    Categoria
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    maxWidth="250px"
                    marginY={2}>
                    <Badge
                      title="Limpeza"
                      isPress={categorySelected}
                      setIsPress={setCategorySelected}
                      name={'clean'}
                    />
                    <Badge
                      title="Estudos"
                      isPress={categorySelected}
                      setIsPress={setCategorySelected}
                      name={'study'}
                    />
                    <Badge
                      title="Animal de Estimação"
                      isPress={categorySelected}
                      setIsPress={setCategorySelected}
                      name={'pet'}
                    />
                    <Badge
                      title="Alimentação"
                      isPress={categorySelected}
                      setIsPress={setCategorySelected}
                      name={'food'}
                    />
                  </ScrollView>
                </VStack>
              </HStack>
              <HStack marginY={2}>
                <VStack>
                  <Text
                    color={'light.50'}
                    marginBottom={2}
                    fontSize={14}
                    fontWeight={'bold'}>
                    Responsável
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    maxWidth="250px"
                    marginY={2}>
                    <TaskResponsible
                      id="1"
                      responsible={responsible}
                      setResponsible={setResponsible}
                    />
                    <TaskResponsible
                      id="2"
                      responsible={responsible}
                      setResponsible={setResponsible}
                    />
                    <TaskResponsible
                      id="3"
                      responsible={responsible}
                      setResponsible={setResponsible}
                    />
                  </ScrollView>
                </VStack>
              </HStack>

              <HStack marginY={'10px'}>
                <VStack>
                  <Text
                    color={'light.50'}
                    marginBottom={2}
                    fontSize={14}
                    fontWeight={'bold'}>
                    Data
                  </Text>

                  <DateTimePicker
                    themeVariant="dark"
                    mode="date"
                    display="default"
                    value={date}
                    locale="pt-BR"
                    onChange={changeDate}
                    accentColor={theme.colors.violet[500]}
                    style={{
                      width: 200,
                      marginLeft: -30,
                      borderRadius: 8,
                    }}
                  />
                </VStack>
              </HStack>
              <Button marginTop={5} p={4} title={' Criar Task'} />
            </VStack>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
};

export {CreateTask};

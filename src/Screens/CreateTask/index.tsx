import {
  Box,
  FlatList,
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
import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Alert, Dimensions} from 'react-native';
import {Badge} from './Components/Badge';
import {TaskResponsible} from './Components/TaskResponsible';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Button} from '../../Components';
import {categories} from '../../Utils/taskCategories';
import uuid from 'react-native-uuid';

import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../../hooks';
import {IMember, ITask} from '../../DTOs/GroupDto';

const CreateTask = () => {
  const {user} = useAuth();
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState<ITask[]>([]);

  const [groupMember, setGroupMembers] = useState<IMember[]>([]);

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [taskResponsible, setTaskResponsible] = useState('');

  const groupId = user.groupInfo?.id;

  const changeDate = (event: any, date) => {
    setDate(date);
  };

  const handleSelectResponsible = (id: string) => {
    setTaskResponsible(id);
  };

  const handleSelectedCategory = (slug: string) => {
    setTaskCategory(slug);
  };

  const handleResetForm = () => {
    setTaskName('');
    setTaskDescription('');
    setTaskCategory('');
    setTaskResponsible('');
    setDate(new Date());
  };

  const handleCreateTask = () => {
    const responsibleRef = firestore().collection('Users').doc(taskResponsible);
    const relatorRef = firestore().collection('Users').doc(user.id);
    const payload = {
      id: uuid.v4() as string,
      name: taskName,
      group_id: groupId,
      description: taskDescription,
      category: taskCategory,
      relator: relatorRef,
      responsible: responsibleRef,
      status: 'to do',
      date,
    };

    if (
      !taskName.trim() ||
      !taskDescription.trim() ||
      !taskCategory ||
      !taskResponsible
    ) {
      return Alert.alert('Preencha todos os campos!');
    }
    firestore()
      .collection('Groups')
      .doc(payload.group_id)
      .update({
        tasks: [...tasks, payload],
      })
      .then(() => {
        Alert.alert('Task', 'Task criada com sucesso!');
      })
      .catch(() => Alert.alert('Task', 'Erro ao criar task!'));
    handleResetForm();
  };

  useEffect(() => {
    const subscribe = firestore()
      .collection('Groups')
      .doc(groupId)
      .onSnapshot(async querySnapshot => {
        const group = querySnapshot.data();
        setTasks(group.tasks);

        Promise.all(
          group.members.map(async doc => {
            return await doc.get().then(member => {
              return {...member.data(), id: member.id};
            });
          }),
        )

          .then(members => {
            setGroupMembers(members);
          })
          .catch(e => console.log(e));
      });
    return () => subscribe();
  }, [groupId]);

  const theme = useTheme();

  const {height} = Dimensions.get('screen');

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
                  value={taskName}
                  borderColor={'warmGray.600'}
                  placeholder="Nome da task"
                  onChangeText={setTaskName}
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
                  value={taskDescription}
                  borderWidth={1}
                  borderColor={'warmGray.600'}
                  onChangeText={setTaskDescription}
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
                  <FlatList
                    data={categories}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    maxWidth="250px"
                    marginY={2}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                      <Badge
                        title={item.title}
                        onPress={() => handleSelectedCategory(item.title)}
                        selected={item.title === taskCategory}
                      />
                    )}
                  />
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
                  <FlatList
                    data={groupMember}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    maxWidth="250px"
                    marginY={2}
                    renderItem={({item}) => (
                      <TaskResponsible
                        photo={item.photo_url || ''}
                        onPress={() => handleSelectResponsible(item.id)}
                        selected={item.id === taskResponsible}
                      />
                    )}
                  />
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
              <Button
                marginTop={5}
                p={4}
                title={'Criar Task'}
                onPress={handleCreateTask}
              />
            </VStack>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
};

export {CreateTask};

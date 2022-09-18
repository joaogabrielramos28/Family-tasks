import {AntDesign} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Factory,
  Heading,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Select,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {TasksDetailsNavigationParams} from '../../@types/navigation/navigation';
import {categories} from '../../Utils/taskCategories';

import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {Status} from '../Tasks/Components/Task/types';
import {IMember, ITask} from '../../DTOs/GroupDto';
import {Load} from '../../Components';
import {theme} from '../../theme';

const TaskDetails = () => {
  const route = useRoute();
  const {id} = route.params as TasksDetailsNavigationParams;
  const [task, setTask] = useState<ITask>({} as ITask);
  const [members, setMembers] = useState<IMember[]>([]);
  const [load, setLoad] = useState(true);

  const {goBack} = useNavigation();

  const FactoryImage = Factory(FastImage);

  const handleGoBack = () => {
    goBack();
  };

  const handleUpdateTaskStatus = (status: Status) => {
    const responsibleRef = firestore()
      .collection('Users')
      .doc(task.responsible.id);
    const relatorRef = firestore().collection('Users').doc(task.relator.id);
    const updatedTask = {
      ...task,
      responsible: responsibleRef,
      relator: relatorRef,
      status,
    };

    firestore()
      .collection('Tasks')
      .doc(id)
      .update(updatedTask)
      .then(() => Alert.alert('Task atualizada'))
      .catch(err => {
        Alert.alert('Erro ao atualizar tarefa');
        console.log(err);
      });
  };

  const handleUpdateRelator = (memberId: string) => {
    const memberRef = firestore().collection('Users').doc(memberId);
    const responsibleRef = firestore()
      .collection('Users')
      .doc(task.responsible.id);

    const updatedTask = {
      ...task,
      responsible: responsibleRef,
      relator: memberRef,
    };

    firestore()
      .collection('Tasks')
      .doc(id)
      .update(updatedTask)
      .then(() => Alert.alert('Task atualizada'))
      .catch(err => {
        Alert.alert('Erro ao atualizar tarefa');
        console.log(err);
      });
  };
  const handleUpdateResponsible = (memberId: string) => {
    const relatorRef = firestore().collection('Users').doc(task.relator.id);
    const memberRef = firestore().collection('Users').doc(memberId);

    const updatedTask = {
      ...task,
      responsible: memberRef,
      relator: relatorRef,
    };

    firestore()
      .collection('Tasks')
      .doc(id)
      .update(updatedTask)
      .then(() => {
        Alert.alert('Task atualizada');
      })
      .catch(err => {
        Alert.alert('Erro ao atualizar tarefa');
        console.log(err);
      });
  };

  useEffect(() => {
    const subscribe = firestore()
      .collection('Groups')
      .doc(task.group_id)
      .onSnapshot(async querySnapshot => {
        const group = querySnapshot.data();

        Promise.all(
          group?.members.map(async doc => {
            return await doc.get().then(member => {
              return {...member.data(), id: member.id};
            });
          }),
        )

          .then(members => {
            setMembers(members);
          })
          .catch(e => console.log(e));
      });
    return () => subscribe();
  }, [task.group_id]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('Tasks')
      .doc(id)
      .onSnapshot(async querySnapshot => {
        const taskDoc = querySnapshot.data();

        const taskFormatted = {
          ...taskDoc,
        } as ITask;
        setTask(taskFormatted);
        setLoad(false);
      });

    return () => subscribe();
  }, [id]);

  if (load || !task.responsible.id) {
    return <Load />;
  }

  return (
    <ScrollView
      background={theme.colors.background[900]}
      contentContainerStyle={{
        paddingVertical: 20,
      }}>
      <VStack
        flex={1}
        background={theme.colors.background[900]}
        alignItems={'flex-start'}
        paddingY={10}
        paddingX={6}>
        <HStack w={'100%'} justifyContent={'space-between'}>
          <IconButton
            onPress={handleGoBack}
            icon={
              <Icon
                as={AntDesign}
                size={'xl'}
                name={'close'}
                color={theme.colors.title}
              />
            }
          />

          <IconButton
            icon={
              <Icon
                as={AntDesign}
                size={'xl'}
                name={'ellipsis1'}
                color={theme.colors.title}
              />
            }
          />
        </HStack>

        <VStack>
          <HStack
            marginTop={2}
            w={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Heading color={theme.colors.title}>{task.name}</Heading>
          </HStack>

          <Select
            width={142}
            marginTop={2}
            color={theme.colors.title}
            fontSize={RFValue(12)}
            selectedValue={task.status}
            fontWeight={'bold'}
            backgroundColor={
              task.status === 'doing'
                ? 'yellow.500'
                : task.status === 'to do'
                ? 'violet.500'
                : 'green.600'
            }
            borderWidth={0}
            onValueChange={(itemValue: Status) =>
              handleUpdateTaskStatus(itemValue)
            }
            dropdownIcon={
              <AntDesign
                name="down"
                color={'white'}
                size={RFValue(10)}
                style={{
                  marginRight: 10,
                }}
              />
            }>
            <Select.Item label="A fazer" value="to do" />
            <Select.Item label="Finalizado" value="completed" />
            <Select.Item label="Em progresso" value="doing" />
          </Select>

          <VStack marginTop={4} space={2}>
            <Text
              color={theme.colors.text}
              fontSize={RFValue(14)}
              fontWeight={'bold'}>
              Descrição
            </Text>

            <Text
              color={theme.colors.title}
              fontSize={RFValue(14)}
              w={RFValue(320)}>
              {task.description}
            </Text>
          </VStack>
        </VStack>

        <VStack width={'100%'} marginTop={6} space={4}>
          <Text color={theme.colors.text} fontSize={RFValue(14)}>
            {' '}
            Responsável
          </Text>
          <Select
            fontSize={RFValue(14)}
            borderWidth={0}
            selectedValue={task?.responsible?.id}
            color={theme.colors.title}
            onValueChange={responsible => handleUpdateResponsible(responsible)}
            dropdownIcon={
              <AntDesign name="right" color={'white'} size={RFValue(14)} />
            }>
            {members.map(member => (
              <Select.Item
                key={member.id}
                value={member.id}
                label={member.name}
                style={{
                  justifyContent: 'center',
                }}
                _text={{
                  fontSize: RFValue(16),
                }}
                leftIcon={
                  <FactoryImage
                    size={'8'}
                    rounded={'full'}
                    source={{uri: member.photo_url}}
                  />
                }
              />
            ))}
          </Select>
        </VStack>
        <VStack width={'100%'} marginTop={6} space={4}>
          <Text color={theme.colors.text} fontSize={RFValue(14)}>
            {' '}
            Relator
          </Text>
          <Select
            fontSize={RFValue(14)}
            borderWidth={0}
            color={theme.colors.title}
            selectedValue={task?.relator?.id}
            onValueChange={relator => handleUpdateRelator(relator)}
            dropdownIcon={
              <AntDesign name="right" color={'white'} size={RFValue(14)} />
            }>
            {members.map(member => (
              <Select.Item
                key={member.id}
                value={member.id}
                label={member.name}
                style={{
                  justifyContent: 'center',
                }}
                _text={{
                  fontSize: RFValue(16),
                }}
                leftIcon={
                  <FactoryImage
                    rounded={'full'}
                    size={'8'}
                    source={{
                      uri: member.photo_url,
                    }}
                  />
                }
              />
            ))}
          </Select>
        </VStack>
        <VStack width={'100%'} marginTop={6} space={4} paddingBottom={10}>
          <Text color={theme.colors.text} fontSize={RFValue(14)}>
            {' '}
            Categoria
          </Text>
          <Select
            fontSize={RFValue(14)}
            borderWidth={0}
            color={theme.colors.title}
            selectedValue={task.category}
            dropdownIcon={
              <AntDesign name="right" color={'white'} size={RFValue(14)} />
            }>
            {categories.map(category => (
              <Select.Item
                key={category.id}
                value={category.title}
                label={category.title}
                style={{
                  justifyContent: 'center',
                }}
                _text={{
                  fontSize: RFValue(16),
                }}
              />
            ))}
          </Select>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export {TaskDetails};

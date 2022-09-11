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

const TaskDetails = () => {
  const [status, setStatus] = useState('');

  const route = useRoute();

  const {task} = route.params as TasksDetailsNavigationParams;

  const {goBack} = useNavigation();

  const FactoryImage = Factory(FastImage);

  const handleGoBack = () => {
    goBack();
  };

  useEffect(() => {
    setStatus(task.status);
  }, [task]);
  return (
    <ScrollView
      background={'warmGray.900'}
      contentContainerStyle={{
        paddingVertical: 20,
      }}>
      <VStack
        flex={1}
        background={'warmGray.900'}
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
                color={'light.50'}
              />
            }
          />
          <IconButton
            icon={
              <Icon
                as={AntDesign}
                size={'xl'}
                name={'ellipsis1'}
                color={'light.50'}
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
            <Heading color={'light.50'}>{task.name}</Heading>
            <FactoryImage
              size={'12'}
              rounded={'full'}
              source={{
                uri: task.responsible.photo_url,
              }}
            />
          </HStack>

          <Select
            width={142}
            marginTop={2}
            color={'light.50'}
            fontSize={RFValue(12)}
            selectedValue={status}
            fontWeight={'bold'}
            backgroundColor={
              status === 'doing'
                ? 'blue.600'
                : status === 'to do'
                ? 'violet.500'
                : 'green.600'
            }
            borderWidth={0}
            onValueChange={itemValue => setStatus(itemValue)}
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
              color={'light.400'}
              fontSize={RFValue(14)}
              fontWeight={'bold'}>
              Descrição
            </Text>

            <Text color={'light.50'} fontSize={RFValue(14)} w={RFValue(320)}>
              {task.description}
            </Text>
          </VStack>
        </VStack>

        <VStack width={'100%'} marginTop={6} space={4}>
          <Text color={'light.400'} fontSize={RFValue(14)}>
            {' '}
            Responsável
          </Text>
          <Select
            fontSize={RFValue(14)}
            borderWidth={0}
            selectedValue={task.responsible.name}
            color={'light.50'}
            dropdownIcon={
              <AntDesign name="right" color={'white'} size={RFValue(14)} />
            }>
            <Select.Item
              value={task.responsible.name}
              label={task.responsible.name}
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
                  source={{uri: task.responsible.photo_url}}
                />
              }
            />
          </Select>
        </VStack>
        <VStack width={'100%'} marginTop={6} space={4}>
          <Text color={'light.400'} fontSize={RFValue(14)}>
            {' '}
            Relator
          </Text>
          <Select
            fontSize={RFValue(14)}
            borderWidth={0}
            color={'light.50'}
            selectedValue={task.relator.name}
            dropdownIcon={
              <AntDesign name="right" color={'white'} size={RFValue(14)} />
            }>
            <Select.Item
              value={task.relator.name}
              label={task.relator.name}
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
                    uri: task.relator.photo_url,
                  }}
                />
              }
            />
          </Select>
        </VStack>
        <VStack width={'100%'} marginTop={6} space={4} paddingBottom={10}>
          <Text color={'light.400'} fontSize={RFValue(14)}>
            {' '}
            Categoria
          </Text>
          <Select
            fontSize={RFValue(14)}
            borderWidth={0}
            color={'light.50'}
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

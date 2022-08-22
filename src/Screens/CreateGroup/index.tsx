import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {
  Box,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  KeyboardAvoidingView,
  Text,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Button, Input} from '../../Components';
import {IGroupDto, IMember} from '../../DTOs/GroupDto';
import {useAuth} from '../../hooks';
import uuid from 'react-native-uuid';

const CreateGroup = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useAuth();
  const {goBack} = useNavigation<any>();
  const handleGoBack = () => {
    goBack();
  };

  const handleCreateGroup = async () => {
    try {
      setLoading(true);
      const admin: IMember = {
        id: user.uid,
        name: user.displayName,
        photoURL: user.photoURL,
        position: 'Administrator',
      };
      const group: IGroupDto = {
        id: uuid.v4() as string,
        name,
        description,
        admin,
        members: [admin],
        tasks: [],
        notifications: [],
        createdAt: new Date(),
        background: '',
      };
      await firestore().collection('Groups').doc(group.id).set(group);
      setLoading(false);
    } catch {
      console.log('erro');

      setLoading(false);
    }
  };
  return (
    <Box
      paddingTop={getStatusBarHeight()}
      paddingX={4}
      flex={1}
      bg={'warmGray.900'}>
      <KeyboardAvoidingView enabled behavior="position">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <VStack marginTop={4}>
            <HStack alignItems={'center'}>
              <BorderlessButton onPress={handleGoBack}>
                <IconButton
                  alignItems={'center'}
                  icon={
                    <Icon
                      as={AntDesign}
                      size={'xl'}
                      name={'arrowleft'}
                      color={'light.50'}
                    />
                  }
                />
              </BorderlessButton>
              <Heading size={'xl'} color={'light.100'}>
                Criar grupo
              </Heading>
            </HStack>

            <Text color={'light.300'}>
              Crie um grupo para compartilhar suas atividades
            </Text>

            <VStack space={6} marginTop={8}>
              <FormControl paddingX={2}>
                <FormControl.Label>
                  <Heading size={'sm'} color={'light.200'}>
                    Nome do grupo
                  </Heading>
                </FormControl.Label>
                <Input placeholder="Familia Doe" onChangeText={setName} />
                <FormControl.Label>
                  <Heading size={'sm'} color={'light.200'}>
                    Descrição
                  </Heading>
                </FormControl.Label>
                <Input
                  placeholder="Descreva seu grupo"
                  onChangeText={setDescription}
                />

                <Button
                  title={'Criar'}
                  onPress={handleCreateGroup}
                  marginTop={10}
                  isLoading={loading}
                />
              </FormControl>
            </VStack>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Box>
  );
};

export {CreateGroup};

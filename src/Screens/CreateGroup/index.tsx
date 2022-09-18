import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {
  Box,
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
import {Alert, Button, Input} from '../../Components';
import {INotification} from '../../DTOs/GroupDto';
import {useAuth} from '../../hooks';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IUser} from '../../hooks/types';
import {theme} from '../../theme';

interface ICreateGroup {
  id: string;
  name: string;
  description: string;
  admin: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;
  members: Array<
    FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>
  >;

  notifications: INotification[];
  createdAt: Date;
  background: string;
}

const CreateGroup = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const {user, USER_STORAGE_KEY, updateUserState} = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const {goBack} = useNavigation<any>();
  const handleGoBack = () => {
    goBack();
  };

  const [toastInfo, setToastInfo] = useState({
    title: '',
    color: '',
  });

  const handleCreateGroup = async () => {
    if (!name || !description) {
      return;
    }
    try {
      setLoading(true);

      const userRef = firestore().collection('Users').doc(user.id);
      const group: ICreateGroup = {
        id: uuid.v4() as string,
        name,
        description,
        admin: userRef,
        members: [userRef],
        notifications: [],
        createdAt: new Date(),
        background: '',
      };
      await firestore().collection('Groups').doc(group.id).set(group);

      await userRef.update({
        groupInfo: {
          id: group.id,
          position: 'Administrator',
        },
      });

      const userUpdated = {
        ...user,
        groupInfo: {
          id: group.id,
          position: 'Administrator',
        },
      } as IUser;

      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userUpdated));
      updateUserState(userUpdated);
      setToastInfo({
        title: 'Grupo criado com sucesso',
        color: theme.colors.primary[500],
      });
      setShowAlert(true);
      setLoading(false);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch {
      setToastInfo({
        title: 'Erro ao criar o grupo',
        color: theme.colors.error,
      });
      setShowAlert(true);
      setLoading(false);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      console.log('erro');
    }
  };
  return (
    <Box
      paddingTop={getStatusBarHeight()}
      paddingX={4}
      flex={1}
      bg={theme.colors.background[900]}>
      <KeyboardAvoidingView enabled behavior="position">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <VStack marginTop={4}>
            <Alert
              isOpen={showAlert}
              text={toastInfo.title}
              color={toastInfo.color}
            />
            <HStack alignItems={'center'}>
              <BorderlessButton onPress={handleGoBack}>
                <IconButton
                  alignItems={'center'}
                  icon={
                    <Icon
                      as={AntDesign}
                      size={'xl'}
                      name={'arrowleft'}
                      color={theme.colors.title}
                    />
                  }
                />
              </BorderlessButton>
              <Heading size={'xl'} color={theme.colors.title}>
                Criar grupo
              </Heading>
            </HStack>

            <Text color={theme.colors.text}>
              Crie um grupo para compartilhar suas atividades
            </Text>

            <VStack space={6} marginTop={8}>
              <Box paddingX={2}>
                <Heading size={'sm'} color={theme.colors.text} marginBottom={2}>
                  Nome do grupo
                </Heading>

                <Input placeholder="Familia Doe" onChangeText={setName} />

                <Heading size={'sm'} color={theme.colors.text} marginY={2}>
                  Descrição
                </Heading>

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
              </Box>
            </VStack>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Box>
  );
};

export {CreateGroup};

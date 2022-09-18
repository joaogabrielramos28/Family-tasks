import {useNavigation} from '@react-navigation/native';
import {Box} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import {Button, Header} from '../../Components';
import {useAuth} from '../../hooks';
import {theme} from '../../theme';
import {AllGroups} from './Components/AllGroups';
import {MyGroup} from './Components/MyGroup';

const FirstRoute = () => <AllGroups />;

const SecondRoute = () => <MyGroup />;

const renderScene = SceneMap({
  allGroups: FirstRoute,
  myGroup: SecondRoute,
});

const GroupList = () => {
  const {user} = useAuth();
  const {navigate} = useNavigation();
  const [index, setIndex] = useState(0);
  const [canCreateGroup, setCanCreateGroup] = useState(false);
  const [routes] = useState([
    {key: 'allGroups', title: 'Todos Grupos'},
    {key: 'myGroup', title: 'Meu Grupo'},
  ]);

  useEffect(() => {
    setCanCreateGroup(!!user.groupInfo);
  }, [user]);

  const handleGoToCreateGroupScreen = () => {
    navigate('CreateGroup');
  };

  return (
    <Box bg={theme.colors.background[900]} flex={1}>
      <Header />

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => (
          <>
            <TabBar
              {...props}
              style={{
                backgroundColor: theme.colors.background[900],
              }}
              activeColor={theme.colors.title}
              indicatorStyle={{
                backgroundColor: theme.colors.primary[400],
              }}
            />
            <Button
              title="Criar grupo"
              marginTop={4}
              onPress={handleGoToCreateGroupScreen}
              isDisabled={canCreateGroup}
            />
          </>
        )}
      />
    </Box>
  );
};

export {GroupList};

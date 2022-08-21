import {Box, useTheme} from 'native-base';
import React, {useState} from 'react';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import {Header} from '../../Components';
import {AllGroups} from './Components/AllGroups';
import {MyGroup} from './Components/MyGroup';

const FirstRoute = () => <AllGroups />;

const SecondRoute = () => <MyGroup />;

const renderScene = SceneMap({
  allGroups: FirstRoute,
  myGroup: SecondRoute,
});

const GroupList = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'allGroups', title: 'Todos Grupos'},
    {key: 'myGroup', title: 'Meu Grupo'},
  ]);

  const theme = useTheme();

  return (
    <Box bg={'warmGray.900'} flex={1}>
      <Header />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={{
              backgroundColor: theme.colors.warmGray[900],
            }}
            activeColor={theme.colors.light[100]}
            indicatorStyle={{
              backgroundColor: theme.colors.violet[400],
            }}
          />
        )}
      />
    </Box>
  );
};

export {GroupList};

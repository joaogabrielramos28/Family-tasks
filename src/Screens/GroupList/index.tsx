import {
  Avatar,
  Box,
  FlatList,
  Heading,
  HStack,
  Text,
  useTheme,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { SceneMap, TabView, TabBar } from "react-native-tab-view";
import { AllGroups } from "./Components/AllGroups";
import { MyGroup } from "./Components/MyGroup";

const FirstRoute = () => <AllGroups />;

const SecondRoute = () => <MyGroup />;

const renderScene = SceneMap({
  allGroups: FirstRoute,
  myGroup: SecondRoute,
});

const GroupList = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "allGroups", title: "Todos Grupos" },
    { key: "myGroup", title: "Meu Grupo" },
  ]);

  const theme = useTheme();

  return (
    <Box bg={"warmGray.900"} flex={1}>
      <Box
        bg={"warmGray.800"}
        w={"100%"}
        h={`${RFValue(100)}px`}
        borderBottomLeftRadius={"20px"}
        display={"flex"}
        justifyContent={"center"}
        px={"20px"}
        paddingTop={RFValue(6)}
      >
        <HStack w={"100%"} space={4}>
          <Avatar
            size={"md"}
            source={{
              uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            }}
          >
            <Avatar.Badge bg="green.500" />
          </Avatar>
          <VStack>
            <Text color={"light.400"} fontSize={RFValue(14)}>
              Bem vindo,
            </Text>
            <Heading fontSize={RFValue(18)} color={"light.200"}>
              João
            </Heading>
          </VStack>
        </HStack>
      </Box>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
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

export { GroupList };

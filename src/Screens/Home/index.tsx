import {
  Avatar,
  Box,
  Heading,
  HStack,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

import { ProgressChart } from "./Components/ProgressChart";
import { TasksStatistics } from "./Components/TasksStatistics";

const Home = () => {
  return (
    <ScrollView bg={"warmGray.900"} flex={1}>
      <Box>
        <Box
          bg={"warmGray.800"}
          w={"100%"}
          h={`${RFValue(90)}px`}
          borderBottomLeftRadius={"20px"}
          display={"flex"}
          justifyContent={"center"}
          px={"20px"}
          paddingTop={8}
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

        <Box marginTop={6} w={"100%"} display={"flex"} alignItems={"center"}>
          <Heading color={"light.100"}>Tasks completadas </Heading>
        </Box>

        <ProgressChart />

        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-around"}
        >
          <TasksStatistics
            title="Tasks diárias"
            icon={"pen"}
            value={8}
            color={"yellow.600"}
          />
          <TasksStatistics
            title="Tasks ativas"
            icon={"toggle-on"}
            color={"success.400"}
            value={12}
          />
        </Box>
      </Box>
    </ScrollView>
  );
};

export { Home };

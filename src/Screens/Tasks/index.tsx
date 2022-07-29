import {
  Box,
  Container,
  Heading,
  HStack,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { WeekCalendar } from "./Components/WeekCalendar";
import { Task } from "./Components/Task";
import { Status } from "./Components/Task/types";

const Tasks = () => {
  return (
    <ScrollView flex={1} background={"warmGray.900"}>
      <Box width={"100%"} flex={1}>
        <VStack
          background={"indigo.500"}
          width={"100%"}
          height={"190px"}
          borderBottomLeftRadius={"20px"}
          padding={"20px"}
          justifyContent={"center"}
        >
          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <Heading color={"light.50"}>Minhas tarefas</Heading>

            <Text color={"light.50"} fontSize={16} fontWeight={"bold"}>
              Total 10 tarefas
            </Text>
          </HStack>
        </VStack>
        <WeekCalendar />

        <VStack paddingX={10} marginTop={12} space={6}>
          <Task status={Status.Completed} />
          <Task status={Status.Doing} />
        </VStack>
      </Box>
    </ScrollView>
  );
};

export { Tasks };

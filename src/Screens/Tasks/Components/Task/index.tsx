import { useNavigation } from "@react-navigation/native";
import { Avatar, Box, Heading, HStack, Text, VStack } from "native-base";
import React from "react";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { ITask, Status } from "./types";

const Task = ({ status, id }: ITask) => {
  const { navigate } = useNavigation<any>();

  function handleNavigateToTask() {
    navigate("Task", { id });
  }

  return (
    <BorderlessButton onPress={handleNavigateToTask}>
      <Box
        width={"100%"}
        background={"warmGray.600"}
        borderRadius={8}
        color={"light.50"}
        height={"140px"}
        padding={6}
        alignItems={"flex-start"}
      >
        <VStack width={"100%"} justifyContent={"space-between"}>
          <VStack>
            <Heading color={"light.50"}>Titulo</Heading>
            <Text color={"light.400"}>Categoria</Text>
          </VStack>

          <HStack alignItems={"center"} justifyContent={"center"} marginTop={6}>
            <HStack>
              <HStack alignItems={"center"} space={2}>
                <Avatar
                  size={"sm"}
                  source={{
                    uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                  }}
                />
                <Text color={"light.400"}>24/08/2000</Text>
              </HStack>
            </HStack>
            <Box alignItems={"flex-end"} justifyContent={"flex-end"} flex={1}>
              <HStack alignItems={"center"} space={2} w={20}>
                <Box
                  w={"15px"}
                  h={"15px"}
                  bg={status === Status.Completed ? "green.500" : "yellow.300"}
                  borderRadius={50}
                ></Box>
                <Text color={"light.400"}>
                  {status === Status.Completed ? "Finalizado" : "Ativo"}
                </Text>
              </HStack>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </BorderlessButton>
  );
};

export { Task };

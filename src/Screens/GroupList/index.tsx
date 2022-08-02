import {
  Avatar,
  Box,
  FlatList,
  Heading,
  HStack,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { GroupCard } from "./Components/GroupCard";

const INITIAL_GROUPS = [
  {
    id: "1",
    name: "Group 1",
    description: "Description 1",
  },
  {
    id: "2",
    name: "Group 2",
    description: "Description 2",
  },
  {
    id: "3",
    name: "Group 3",
    description: "Description 3",
  },
];

const Grouplist = () => {
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
      <FlatList
        marginTop={10}
        data={INITIAL_GROUPS}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GroupCard name={item.name} description={item.description} />
        )}
      />
    </Box>
  );
};

export { Grouplist };

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "native-base";
import React from "react";

import { RFValue } from "react-native-responsive-fontsize";
import { Participant } from "./Components/Participant";
import { IParticipantProps } from "./types";

const INITIAL_PARTICIPANTS: IParticipantProps[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://bit.ly/dan-abramov",
    position: "Membro",
  },
  {
    id: "2",
    name: "John Doe",
    avatar: "https://bit.ly/dan-abramov",
    position: "Membro",
  },
  {
    id: "3",
    name: "John Doe",
    avatar: "https://bit.ly/dan-abramov",
    position: "Administrador",
  },
];

const GroupDetails = () => {
  const { goBack } = useNavigation();

  const handleGoBack = () => {
    goBack();
  };

  const sortParticipants = (participants: IParticipantProps[]) => {
    return participants.sort((a: IParticipantProps, b: IParticipantProps) => {
      if (a.position === "Administrador") {
        return -1;
      }
    });
  };

  return (
    <Box flex={1} backgroundColor={"warmGray.900"}>
      <Box bg={"warmGray.800"} height={RFValue(200)} padding={RFValue(4)}>
        <HStack marginTop={10} justifyContent={"space-between"}>
          <IconButton
            onPress={handleGoBack}
            icon={
              <Icon
                as={AntDesign}
                size={"xl"}
                name={"arrowleft"}
                color={"light.50"}
              />
            }
          />
          <IconButton
            icon={
              <Icon
                as={AntDesign}
                size={"xl"}
                name={"ellipsis1"}
                color={"light.50"}
              />
            }
          />
        </HStack>
      </Box>
      <VStack flex={1} paddingX={8}>
        <Heading color={"light.50"} textAlign={"center"} marginTop={6}>
          Nome do grupo
        </Heading>

        <Button
          marginTop={4}
          bg={"violet.500"}
          _text={{
            fontWeight: "bold",
          }}
        >
          Solicitar entrada
        </Button>

        <HStack
          alignItems={"flex-start"}
          marginTop={10}
          justifyContent={"space-between"}
        >
          <VStack alignItems={"center"}>
            <Heading color={"light.300"} size={"md"}>
              Total de Tasks
            </Heading>
            <Text color={"light.100"}>10</Text>
          </VStack>
          <VStack alignItems={"center"}>
            <Heading color={"light.300"} size={"md"}>
              Participantes
            </Heading>
            <Text color={"light.100"}>4</Text>
          </VStack>
        </HStack>
        <Box marginTop={6}>
          <HStack>
            <Heading color={"light.100"}>Membros</Heading>
          </HStack>
          <FlatList
            marginTop={4}
            data={sortParticipants(INITIAL_PARTICIPANTS)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Participant {...item} />}
            showsVerticalScrollIndicator={false}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export { GroupDetails };

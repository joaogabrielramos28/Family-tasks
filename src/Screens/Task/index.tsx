import { AntDesign } from "@expo/vector-icons";
import {
  Avatar,
  CheckIcon,
  Heading,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Select,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";

const Task = () => {
  const [status, setStatus] = useState("");

  return (
    <ScrollView
      background={"warmGray.900"}
      contentContainerStyle={{
        paddingVertical: 20,
      }}
    >
      <VStack
        flex={1}
        background={"warmGray.900"}
        alignItems={"flex-start"}
        paddingY={10}
        paddingX={6}
      >
        <HStack w={"100%"} justifyContent={"space-between"}>
          <IconButton
            icon={
              <Icon
                as={AntDesign}
                size={"xl"}
                name={"close"}
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

        <VStack>
          <HStack
            marginTop={2}
            w={"100%"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Heading color={"light.50"}>Task</Heading>
            <Avatar
              size={"md"}
              source={{
                uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
              }}
            />
          </HStack>

          <Select
            width={142}
            marginTop={2}
            color={"light.50"}
            fontSize={RFValue(12)}
            fontWeight={"bold"}
            backgroundColor={status === "doing" ? "blue.600" : "green.600"}
            borderWidth={0}
            onValueChange={(itemValue) => setStatus(itemValue)}
            dropdownIcon={
              <AntDesign
                name="down"
                color={"white"}
                size={RFValue(10)}
                style={{
                  marginRight: 10,
                }}
              />
            }
          >
            <Select.Item label="Finalizado" value="completed" />
            <Select.Item label="Em progresso" value="doing" />
          </Select>

          <VStack marginTop={4} space={2}>
            <Text
              color={"light.400"}
              fontSize={RFValue(14)}
              fontWeight={"bold"}
            >
              Descrição
            </Text>

            <Text color={"light.50"} fontSize={RFValue(14)} w={RFValue(320)}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              condimentum, nisl ut ultricies lacinia, nisl nisl aliquet nisl,
              sit amet aliquet nisl nisl sit amet dolor. Donec euismod, nisl sit
              amet aliquet lacinia, nisl nisl aliquet nisl, sit amet aliquet
              nisl nisl sit amet dolor. Donec euismod, nisl sit amet aliquet
              lacinia, nisl
            </Text>
          </VStack>
        </VStack>

        <VStack width={"100%"} marginTop={6} space={4}>
          <Text color={"light.400"} fontSize={RFValue(14)}>
            {" "}
            Responsável
          </Text>
          <Select
            fontSize={RFValue(14)}
            borderWidth={0}
            color={"light.50"}
            dropdownIcon={
              <AntDesign name="right" color={"white"} size={RFValue(14)} />
            }
          >
            <Select.Item
              value="joao"
              label="João"
              style={{
                justifyContent: "center",
              }}
              _text={{
                fontSize: RFValue(16),
              }}
              leftIcon={<Avatar size={"sm"} />}
            />
          </Select>
        </VStack>
        <VStack width={"100%"} marginTop={6} space={4}>
          <Text color={"light.400"} fontSize={RFValue(14)}>
            {" "}
            Relator
          </Text>
          <Select
            fontSize={RFValue(14)}
            borderWidth={0}
            color={"light.50"}
            dropdownIcon={
              <AntDesign name="right" color={"white"} size={RFValue(14)} />
            }
          >
            <Select.Item
              value="Lucas"
              label="Lucas"
              style={{
                justifyContent: "center",
              }}
              _text={{
                fontSize: RFValue(16),
              }}
              leftIcon={<Avatar size={"sm"} />}
            />
          </Select>
        </VStack>
        <VStack width={"100%"} marginTop={6} space={4} paddingBottom={10}>
          <Text color={"light.400"} fontSize={RFValue(14)}>
            {" "}
            Categoria
          </Text>
          <Select
            fontSize={RFValue(14)}
            borderWidth={0}
            color={"light.50"}
            dropdownIcon={
              <AntDesign name="right" color={"white"} size={RFValue(14)} />
            }
          >
            <Select.Item
              value="food"
              label="Alimentação"
              style={{
                justifyContent: "center",
              }}
              _text={{
                fontSize: RFValue(16),
              }}
              leftIcon={<Avatar size={"sm"} />}
            />
          </Select>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export { Task };

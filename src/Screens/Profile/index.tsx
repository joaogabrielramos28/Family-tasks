import { AntDesign } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  IconButton,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { Input } from "../../Components";

const Profile = () => {
  const theme = useTheme();
  return (
    <ScrollView
      background={"warmGray.900"}
      flex={1}
      _contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      <KeyboardAvoidingView behavior="position" enabled>
        <Box
          height={"160px"}
          w={"100%"}
          background={"warmGray.800"}
          padding={10}
          alignItems={"flex-end"}
        >
          <BorderlessButton>
            <AntDesign
              name="ellipsis1"
              size={22}
              color={theme.colors.light[200]}
            />
          </BorderlessButton>
        </Box>
        <VStack
          alignItems={"center"}
          style={{
            transform: [
              {
                translateY: -60,
              },
            ],
          }}
          space={2}
        >
          <Avatar
            size={"2xl"}
            borderColor={"light.50"}
            borderWidth={4}
            source={{
              uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            }}
          >
            <Avatar.Badge
              bg={"violet.500"}
              borderWidth={0}
              display="flex"
              alignItems={"center"}
              justifyContent={"center"}
              style={{
                width: 30,
                height: 30,
                borderRadius: 240,
              }}
            >
              <BorderlessButton>
                <AntDesign
                  name="camera"
                  size={20}
                  color={theme.colors.light[200]}
                />
              </BorderlessButton>
            </Avatar.Badge>
          </Avatar>
          <Heading color={"light.300"}>João Gabriel</Heading>
        </VStack>

        <HStack paddingX={10} justifyContent="space-around">
          <VStack alignItems={"center"}>
            <Text color={"light.300"}>Tasks completadas</Text>
            <Heading color={"light.100"}>10</Heading>
          </VStack>
          <VStack alignItems={"center"}>
            <Text color={"light.300"}>Grupos</Text>
            <Heading color={"light.100"}>1</Heading>
          </VStack>
        </HStack>

        <VStack marginTop={4}>
          <FormControl paddingX={10}>
            <FormControl.Label
              _text={{ color: "light.300", fontSize: "sm", fontWeight: 600 }}
            >
              Nome
            </FormControl.Label>
            <Input
              placeholder="Digite seu nome"
              leftElement={
                <AntDesign
                  name="user"
                  color={"gray"}
                  size={22}
                  style={{
                    marginLeft: 2,
                  }}
                />
              }
            />
            <FormControl.Label
              _text={{ color: "light.300", fontSize: "sm", fontWeight: 600 }}
            >
              E-mail
            </FormControl.Label>
            <Input
              placeholder="email@example.com"
              leftElement={
                <AntDesign
                  name="mail"
                  color={"gray"}
                  size={22}
                  style={{
                    marginLeft: 2,
                  }}
                />
              }
            />
            <FormControl.Label
              _text={{ color: "light.300", fontSize: "sm", fontWeight: 600 }}
            >
              Senha
            </FormControl.Label>
            <Input
              placeholder="Digite sua senha"
              leftElement={
                <AntDesign
                  name="lock"
                  color={"gray"}
                  size={22}
                  style={{
                    marginLeft: 2,
                  }}
                />
              }
            />
            <FormControl.Label
              _text={{ color: "light.300", fontSize: "sm", fontWeight: 600 }}
            >
              Confirmar Senha
            </FormControl.Label>
            <Input
              placeholder="Confirme sua senha"
              leftElement={
                <AntDesign
                  name="lock"
                  color={"gray"}
                  size={22}
                  style={{
                    marginLeft: 2,
                  }}
                />
              }
            />
            <Box marginTop={8}>
              <Button
                bgColor={"violet.500"}
                _text={{ fontWeight: "bold" }}
                p={4}
              >
                Atualizar Perfil
              </Button>
            </Box>
          </FormControl>
        </VStack>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export { Profile };
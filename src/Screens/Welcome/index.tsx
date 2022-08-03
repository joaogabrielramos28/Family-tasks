import { useNavigation } from "@react-navigation/native";
import { Box, Button, Heading, ScrollView, Text, VStack } from "native-base";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import WelcomeImg from "../../assets/welcome-bg.svg";

const Welcome = () => {
  const { navigate } = useNavigation<any>();

  const handleGoToSignUp = () => {
    navigate("SignUp");
  };

  const handleGoToRegister = () => {
    navigate("Register");
  };
  return (
    <ScrollView flex={1} bgColor={"warmGray.900"}>
      <Box alignItems={"center"}>
        <WelcomeImg width={360} height={RFValue(350)} />

        <VStack alignItems={"center"} space={2} paddingX={4}>
          <Heading color={"light.100"}>Taskfy</Heading>
          <Heading color={"light.200"} size={"sm"}>
            {" "}
            A simple task manager for your family
          </Heading>
          <Text color={"light.400"} marginTop={2} bold textAlign={"center"}>
            Create tasks, assign {"\n"} them to your family members
          </Text>
        </VStack>
        <VStack space={4} marginTop={4}>
          <Button
            w={300}
            bg={"violet.500"}
            _text={{
              fontWeight: "bold",
            }}
            borderRadius={8}
          >
            Entrar
          </Button>
          <Button
            w={300}
            bg={"transparent"}
            borderWidth={2}
            borderColor={"violet.500"}
            _text={{
              fontWeight: "bold",
            }}
            borderRadius={8}
            onPress={handleGoToSignUp}
          >
            Criar conta
          </Button>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export { Welcome };

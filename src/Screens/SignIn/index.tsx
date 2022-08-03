import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  KeyboardAvoidingView,
  Link,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Input, SocialLoginButton } from "../../Components";

const SignIn = () => {
  const { goBack, navigate } = useNavigation<any>();

  const handleGoBack = () => {
    goBack();
  };

  const handleGoToSignUp = () => {
    navigate("SignUp");
  };
  return (
    <Box
      paddingTop={getStatusBarHeight()}
      paddingX={4}
      flex={1}
      bg={"warmGray.900"}
    >
      <KeyboardAvoidingView enabled behavior="position">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <VStack marginTop={4}>
            <HStack alignItems={"center"}>
              <BorderlessButton onPress={handleGoBack}>
                <IconButton
                  alignItems={"center"}
                  icon={
                    <Icon
                      as={AntDesign}
                      size={"xl"}
                      name={"arrowleft"}
                      color={"light.50"}
                    />
                  }
                />
              </BorderlessButton>
              <Heading size={"xl"} color={"light.100"}>
                Fazer login
              </Heading>
            </HStack>

            <Text color={"light.300"}>
              Faça seu login com uma das contas abaixo
            </Text>

            <HStack marginTop={4} space={4}>
              <SocialLoginButton iconName={"apple1"} onPress={() => {}} />
              <SocialLoginButton iconName={"google"} onPress={() => {}} />
            </HStack>

            <VStack space={6} marginTop={8}>
              <FormControl paddingX={2}>
                <FormControl.Label>
                  <Heading size={"sm"} color={"light.200"}>
                    E-mail
                  </Heading>
                </FormControl.Label>
                <Input placeholder="john.doe@example.com" />
                <FormControl.Label>
                  <Heading size={"sm"} color={"light.200"}>
                    Senha
                  </Heading>
                </FormControl.Label>
                <Input placeholder="Digite sua senha" type="password" />

                <Button
                  marginTop={6}
                  borderRadius={4}
                  bg={"violet.500"}
                  _text={{
                    fontWeight: "bold",
                  }}
                >
                  Entrar
                </Button>
                <Text marginTop={4} textAlign={"center"} color={"light.300"}>
                  Não possui conta?{" "}
                  <Text color={"violet.500"} onPress={handleGoToSignUp}>
                    Criar conta
                  </Text>
                </Text>
              </FormControl>
            </VStack>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Box>
  );
};

export { SignIn };

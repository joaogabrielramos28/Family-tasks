import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  KeyboardAvoidingView,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Button, Input, SocialLoginButton } from "../../Components";
import { useAuth } from "../../hooks";

const SignIn = () => {
  const { goBack, navigate } = useNavigation<any>();
  const { signInWithEmailAndPassword, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoBack = () => {
    goBack();
  };

  const handleGoToSignUp = () => {
    navigate("SignUp");
  };

  const handleLoginWithEmailAndPassword = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(email, password);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
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
              <SocialLoginButton
                iconName={"google"}
                onPress={signInWithGoogle}
              />
            </HStack>

            <VStack space={6} marginTop={8}>
              <FormControl paddingX={2}>
                <FormControl.Label>
                  <Heading size={"sm"} color={"light.200"}>
                    E-mail
                  </Heading>
                </FormControl.Label>
                <Input
                  placeholder="john.doe@example.com"
                  onChangeText={setEmail}
                />
                <FormControl.Label>
                  <Heading size={"sm"} color={"light.200"}>
                    Senha
                  </Heading>
                </FormControl.Label>
                <Input
                  placeholder="Digite sua senha"
                  type="password"
                  onChangeText={setPassword}
                />
                <Button
                  marginTop={6}
                  borderRadius={4}
                  title={"Entrar"}
                  onPress={handleLoginWithEmailAndPassword}
                />

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

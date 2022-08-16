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
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

const SignInPhone = () => {
  const { goBack, navigate } = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  const [displayOTPInput, setDisplayOTPInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const countryCode = "+55";
  const [confirmation, setConfirmation] =
    useState<FirebaseAuthTypes.ConfirmationResult>();

  const [code, setCode] = useState("");

  const handleGoBack = () => {
    goBack();
  };

  const goToConfirmationScreen = (
    confirmation: FirebaseAuthTypes.ConfirmationResult
  ) => {
    setDisplayOTPInput(true);
    navigate("ConfirmationCode", { confirmation });
  };

  const requestOTP = async () => {
    setDisplayOTPInput(true);
    const confirmation = await auth().signInWithPhoneNumber(
      `${countryCode}${phoneNumber}`
    );
    setConfirmation(confirmation);
    goToConfirmationScreen(confirmation);
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
                Fazer Login
              </Heading>
            </HStack>

            <Text color={"light.300"}>
              Para continuar, informe seu número de telefone.
            </Text>

            <VStack space={6} marginTop={8}>
              <FormControl paddingX={2}>
                <FormControl.Label>
                  <Heading size={"sm"} color={"light.200"}>
                    Número de telefone
                  </Heading>
                </FormControl.Label>
                <Input
                  placeholder="(00) 00000-0000"
                  onChangeText={setPhoneNumber}
                />

                <Button
                  marginTop={6}
                  borderRadius={4}
                  title={"Enviar SMS"}
                  onPress={requestOTP}
                />
              </FormControl>
            </VStack>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Box>
  );
};

export { SignInPhone };

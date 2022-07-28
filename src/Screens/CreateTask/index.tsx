import {
  Avatar,
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextArea,
  useTheme,
  VStack,
} from "native-base";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dimensions, Keyboard } from "react-native";

const CreateTask = () => {
  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const changeDate = (event: any, date) => {
    setDate(date);
  };

  const theme = useTheme();

  const { height } = Dimensions.get("screen");

  return (
    <KeyboardAvoidingView>
      <KeyboardAvoidingView behavior="height" enabled>
        <ScrollView
          bgColor={"warmGray.900"}
          _contentContainerStyle={{
            padding: 6,
          }}
        >
          <Box
            bgColor={"warmGray.900"}
            alignItems={"center"}
            display={"flex"}
            height={height}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <Heading color={"light.50"} marginBottom={2}>
                Adicionar Task
              </Heading>
            </HStack>
            <VStack>
              <VStack>
                <Text color={"light.50"} marginBottom={2}>
                  Nome
                </Text>
                <Input
                  color={"light.50"}
                  bgColor={"warmGray.800"}
                  _focus={{ borderWidth: 1, borderColor: "violet.500" }}
                  borderWidth={1}
                  borderColor={"warmGray.600"}
                  placeholder="Nome da task"
                />
              </VStack>
              <VStack marginY={2}>
                <Text color={"light.50"} marginBottom={2}>
                  Descriçao
                </Text>
                <TextArea
                  autoCompleteType={"off"}
                  h={20}
                  placeholder={"Digite a descriçao"}
                  color={"light.50"}
                  bgColor={"warmGray.800"}
                  _focus={{ borderWidth: 1, borderColor: "violet.500" }}
                  borderWidth={1}
                  borderColor={"warmGray.600"}
                />
              </VStack>
              <HStack>
                <VStack>
                  <Text color={"light.50"} marginBottom={2}>
                    Categoria
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    maxWidth="250px"
                    marginY={2}
                  >
                    <Badge
                      bgColor={"warmGray.600"}
                      variant={"solid"}
                      borderRadius={8}
                      _text={{
                        fontSize: 16,
                      }}
                      marginRight={2}
                    >
                      Limpeza
                    </Badge>
                    <Badge
                      bgColor={"warmGray.600"}
                      variant={"solid"}
                      borderRadius={8}
                      _text={{
                        fontSize: 16,
                      }}
                      marginRight={2}
                    >
                      Estudo
                    </Badge>
                    <Badge
                      bgColor={"warmGray.600"}
                      variant={"solid"}
                      borderRadius={8}
                      _text={{
                        fontSize: 16,
                      }}
                      marginRight={2}
                    >
                      Animal de estimação
                    </Badge>
                    <Badge
                      bgColor={"warmGray.600"}
                      variant={"solid"}
                      borderRadius={8}
                      _text={{
                        fontSize: 16,
                      }}
                      marginRight={2}
                    >
                      Alimentação
                    </Badge>
                  </ScrollView>
                </VStack>
              </HStack>
              <HStack marginY={2}>
                <VStack>
                  <Text color={"light.50"} marginBottom={2}>
                    Responsável
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    maxWidth="250px"
                    marginY={2}
                  >
                    <Avatar marginRight={"3px"} />
                    <Avatar marginRight={"3px"} />
                    <Avatar marginRight={"3px"} />
                    <Avatar marginRight={"3px"} />
                    <Avatar marginRight={"3px"} />
                    <Avatar marginRight={"3px"} />
                    <Avatar marginRight={"3px"} />
                  </ScrollView>
                </VStack>
              </HStack>

              <HStack marginY={"10px"}>
                <VStack>
                  <Text color={"light.50"} marginBottom={2}>
                    Data
                  </Text>
                  <DateTimePicker
                    mode="date"
                    display="default"
                    value={date}
                    locale="pt-BR"
                    onChange={changeDate}
                    textColor={theme.colors.red[500]}
                    style={{
                      width: 200,
                      marginLeft: -30,
                      borderRadius: 8,
                      display: "flex",
                    }}
                  />
                </VStack>
              </HStack>
              <Button
                bg={"violet.500"}
                w={"250px"}
                borderRadius={8}
                marginTop={5}
                p={4}
                _text={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Criar Task
              </Button>
            </VStack>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
};

export { CreateTask };

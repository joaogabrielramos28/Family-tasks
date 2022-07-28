import {
  Actionsheet,
  Avatar,
  Badge,
  Button,
  HStack,
  Icon,
  Input,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { ICreateTaskProps } from "./types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";

const CreateTask = ({ isOpen }: ICreateTaskProps) => {
  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const changeDate = (event: any, date) => {
    setDate(date);
  };

  const toggleOpenPicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const closePicker = () => {
    setIsDatePickerOpen(false);
  };

  const theme = useTheme();

  return (
    <Actionsheet isOpen={isOpen}>
      <Actionsheet.Content bgColor={"warmGray.900"}>
        <VStack>
          {isDatePickerOpen && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              locale="pt-BR"
              onChange={changeDate}
              textColor={theme.colors.light[50]}
            />
          )}
          <HStack>
            <VStack>
              <Text color={"light.50"} marginBottom={2}>
                Categoria
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                maxWidth="250px"
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
              <Input
                fontSize={16}
                width={"150px"}
                padding={"2"}
                type="text"
                value={date.toLocaleDateString()}
                color={"light.50"}
                onPressIn={toggleOpenPicker}
                InputRightElement={
                  <Icon
                    as={AntDesign}
                    name="calendar"
                    color={"light.50"}
                    size={5}
                    marginRight={"4"}
                  />
                }
              />
            </VStack>
          </HStack>
          <Button bg={"violet.500"} w={"250px"} borderRadius={8}>
            Criar Task
          </Button>
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export { CreateTask };

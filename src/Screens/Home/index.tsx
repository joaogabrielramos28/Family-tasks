import { Avatar, Box, Fab, Heading, Icon } from "native-base";
import React from "react";
import { WeekCalendar } from "./Components/WeekCalendar";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { ProgressChart } from "./Components/ProgressChart";
import { TasksStatistics } from "./Components/TasksStatistics";
import { Dimensions } from "react-native";

const Home = () => {
  const { height } = Dimensions.get("window");
  return (
    <Box bg={"warmGray.900"} h={height}>
      <Box
        bg={"indigo.500"}
        w={"100%"}
        h={"250px"}
        borderBottomLeftRadius={"20px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        p={"20px"}
      >
        <Box
          w={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={"row"}
        >
          <Heading color={"white"}>Minhas tarefas</Heading>

          <Avatar>
            <Avatar.Badge bg="green.500" />
          </Avatar>
        </Box>

        <Box w={"100%"} marginTop="20px">
          <WeekCalendar />
        </Box>
      </Box>

      <Box marginTop={6} w={"100%"} display={"flex"} alignItems={"center"}>
        <Heading color={"light.100"}>Tasks completadas </Heading>
      </Box>

      <ProgressChart />

      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-around"}
      >
        <TasksStatistics
          title="Tasks diárias"
          icon={"pen"}
          value={8}
          color={"yellow.600"}
        />
        <TasksStatistics
          title="Tasks ativas"
          icon={"toggle-on"}
          color={"success.400"}
          value={12}
        />
      </Box>
    </Box>
  );
};

export default Home;

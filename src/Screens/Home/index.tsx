import { Avatar, Box, Container, Heading } from "native-base";
import React from "react";
import { WeekCalendar } from "./Components/WeekCalendar";

const Home = () => {
  return (
    <>
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
    </>
  );
};

export default Home;

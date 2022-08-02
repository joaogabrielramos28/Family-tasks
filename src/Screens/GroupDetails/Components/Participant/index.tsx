import { Avatar, Box, Heading, HStack, Text, VStack } from "native-base";
import React from "react";
import { IParticipantProps } from "./types";

const Participant = ({ name, position }: IParticipantProps) => {
  return (
    <Box marginBottom={4}>
      <HStack alignItems={"center"}>
        <Avatar
          source={{
            uri: "https://bit.ly/dan-abramov",
          }}
        />
        <VStack marginLeft={4}>
          <Heading color={"light.50"} size={"md"}>
            {name}
          </Heading>
          <Text color={"light.300"}>{position}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export { Participant };

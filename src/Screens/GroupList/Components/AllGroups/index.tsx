import { FlatList } from "native-base";
import React from "react";
import { GroupCard } from "../GroupCard";
const INITIAL_GROUPS = [
  {
    id: "1",
    name: "Group 1",
    description: "Description 1",
  },
  {
    id: "2",
    name: "Group 2",
    description: "Description 2",
  },
  {
    id: "3",
    name: "Group 3",
    description: "Description 3",
  },
];

const AllGroups = () => {
  return (
    <FlatList
      marginTop={10}
      data={INITIAL_GROUPS}
      contentContainerStyle={{
        paddingHorizontal: 20,
      }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <GroupCard name={item.name} description={item.description} />
      )}
    />
  );
};

export { AllGroups };

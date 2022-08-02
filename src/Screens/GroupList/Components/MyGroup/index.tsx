import { Box, FlatList } from "native-base";
import React from "react";
import { GroupCard } from "../GroupCard";

const MY_GROUPS = [
  {
    id: "1",
    name: "Meu Grupo",
    description: "Minha descrição",
  },
];

const MyGroup = () => {
  return (
    <FlatList
      marginTop={10}
      data={MY_GROUPS}
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

export { MyGroup };

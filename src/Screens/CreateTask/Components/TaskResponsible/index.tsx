import { Avatar, useTheme } from "native-base";
import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { ITaskResponsibleProps } from "./types";

const TaskResponsible = ({
  id,
  responsible,
  setResponsible,
}: ITaskResponsibleProps) => {
  const handleResponsible = () => {
    setResponsible(id);
  };
  const theme = useTheme();
  return (
    <BorderlessButton onPress={handleResponsible}>
      <Avatar
        style={{
          borderColor: responsible === id && theme.colors.violet[800],
          borderWidth: responsible === id ? 2 : null,
        }}
        marginRight={3}
      />
    </BorderlessButton>
  );
};

export { TaskResponsible };

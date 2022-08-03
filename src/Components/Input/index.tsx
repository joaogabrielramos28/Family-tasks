import React from "react";
import { Input as NativeInput, IInputProps } from "native-base";

const Input = ({ ...rest }: IInputProps) => {
  return (
    <NativeInput
      {...rest}
      color={"light.50"}
      borderWidth={0}
      borderBottomWidth={2}
      borderBottomColor={"warmGray.400"}
      marginBottom={2}
      _focus={{
        borderBottomColor: "violet.500",
        backgroundColor: "transparent",
      }}
    />
  );
};

export { Input };

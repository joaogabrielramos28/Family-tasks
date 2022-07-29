import React from "react";
import { Input as NativeInput, IInputProps } from "native-base";

const Input = ({ ...rest }: IInputProps) => {
  return (
    <NativeInput
      {...rest}
      color={"light.50"}
      borderWidth={0}
      borderBottomWidth={1}
      borderBottomColor={"warmGray.400"}
      marginBottom={2}
    />
  );
};

export { Input };

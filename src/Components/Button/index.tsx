import React from "react";
import { Button as ButtonNative } from "native-base";
import { IButtonComponentProps } from "./types";

const Button = ({
  title,
  bg = "violet.500",
  ...rest
}: IButtonComponentProps) => {
  return (
    <ButtonNative
      bg={bg}
      _text={{ fontWeight: "bold" }}
      _pressed={{
        bg: bg,
        opacity: 0.5,
      }}
      {...rest}
    >
      {title}
    </ButtonNative>
  );
};

export { Button };

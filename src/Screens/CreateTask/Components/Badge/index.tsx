import { Button, useTheme } from "native-base";
import React from "react";
import { RectButton } from "react-native-gesture-handler";
import { IBadgeProps } from "./types";

const Badge = ({ title, isPress, setIsPress, name }: IBadgeProps) => {
  const handleChangecategory = () => {
    setIsPress(name);
  };

  const theme = useTheme();

  return (
    <RectButton onPress={handleChangecategory}>
      <Button
        borderRadius={12}
        background={"warmGray.600"}
        style={{
          borderColor: isPress === name ? theme.colors.violet[800] : null,
          borderWidth: isPress === name ? 2 : null,
        }}
        marginRight={2}
      >
        {title}
      </Button>
    </RectButton>
  );
};

export { Badge };

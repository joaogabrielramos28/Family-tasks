import { AntDesign } from "@expo/vector-icons";

export interface ISocialButtonLogin {
  iconName: React.ComponentProps<typeof AntDesign>["name"];
  onPress(): void;
}

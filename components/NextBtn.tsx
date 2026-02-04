import { Text, Pressable } from "react-native";
import React from "react";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
}

const NextBtn: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled,
  className,
}) => {
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className={`px-16 py-3 rounded-full items-center justify-center 
        ${disabled ? "bg-gray-300" : "border border-blue-500  active:bg-blue-600"} 
        `}
    >
      <Text
        className={`text-xl ${
          disabled
            ? "text-gray-500"
            : isPressed
              ? "text-white"
              : "text-gray-600"
        }`}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default NextBtn;

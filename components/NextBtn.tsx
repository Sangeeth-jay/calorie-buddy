import {  Text, Pressable } from "react-native";
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
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`px-16 py-3 rounded-full items-center justify-center 
        ${disabled ? "bg-gray-300" : "border border-blue-500 text-gray-500 active:text-white active:bg-blue-600"} 
        ${className || ""}`}
    >
      <Text className="text-xl">{title}</Text>
    </Pressable>
  );
};

export default NextBtn;

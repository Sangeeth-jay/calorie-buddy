import {  Text, Pressable } from "react-native";
import React from "react";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
}

const NextFillBtn: React.FC<ButtonProps> = ({
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
        ${disabled ? "bg-gray-300" : "bg-blue-500 active:bg-blue-600"} 
        ${className || ""}`}
    >
      <Text className="text-2xl font-semibold text-white">{title}</Text>
    </Pressable>
  );
};

export default NextFillBtn;

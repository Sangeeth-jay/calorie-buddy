import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import React from "react";

interface AuthBtnProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const AuthBtn: React.FC<AuthBtnProps> = ({
  title,
  onPress,
  loading,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      className={`w-full py-3 rounded-full items-center justify-center mt-4 ${
        disabled || loading ? "bg-blue-400" : "bg-blue-500"
      }`}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white font-semibold text-xl">
          {loading ? "Loading..." : title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default AuthBtn;

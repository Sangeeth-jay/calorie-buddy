import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface AuthBtnProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const AuthBtn: React.FC<AuthBtnProps> = ({
  title,
  onPress,
  loading: externalLoading,
  disabled,
}) => {
  const [internalLoading, setLoading] = useState(false);
  const loading = externalLoading || internalLoading;

  const handlePress = () => {
    onPress();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
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

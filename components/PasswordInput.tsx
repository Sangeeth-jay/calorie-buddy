import { View, TextInput, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon, LockIcon } from "phosphor-react-native";

interface PasswordInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
}) => {
  const [showPass, setShowPass] = useState<boolean>(false);

  return (
    <View className="mb-4">
      <Text className="mb-1 text-blue-950 font-bold">{label}</Text>
      <View className="flex-row items-center bg-[#F4F4F4] active:border active:border-gray-300 rounded-xl px-3 py-2">
        <LockIcon size={24} color="#999" weight="light" />
        <TextInput
          className="flex-1 ml-2 text-black text-lg"
          placeholder={placeholder || "Enter your password"}
          placeholderTextColor="#999"
          secureTextEntry={!showPass}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          {showPass ? (
            <EyeIcon size={24} color="#999" weight="light" />
          ) : (
            <EyeSlashIcon size={24} color="#999" weight="light" />
          )}
        </TouchableOpacity>
      </View>
      {error && <Text className="text-red-500 mt-1 text-sm">{error}</Text>}
    </View>
  );
};

export default PasswordInput;

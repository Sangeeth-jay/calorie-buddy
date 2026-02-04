import { View, TextInput, Text, TextInputProps } from 'react-native'
import React from 'react'

interface CustomInputProps extends TextInputProps {
    label: string;
    Icon?: React.ReactNode;
    placeholder?: string;
    error?: string;
    onChangeText?: (text: string) => void;
    value?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, Icon, placeholder, error, onChangeText, value, ...props }) => {
  return (
    <View className="mb-4">
      <Text className="mb-1 text-blue-950 font-bold">{label}</Text>
      <View className="flex-row w-full items-center border-none bg-[#F4F4F4] active:border active:border-gray-300 rounded-xl px-3 py-2">
        {Icon && <View className="mr-2">{Icon}</View>}
        <TextInput
          className="flex-1 text-black text-lg"
          placeholder={placeholder}
          placeholderTextColor="#999"
          keyboardType='email-address'
          onChangeText={onChangeText}
          value={value}
          {...props}
        />
      </View>
      {error && <Text className="text-red-500 mt-1 text-sm">{error}</Text>}
    </View>
  )
}

export default CustomInput
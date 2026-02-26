import React from "react";
import { View, Text, Pressable } from "react-native";
import { CheckCircleIcon, XCircleIcon, InfoIcon, XIcon } from "phosphor-react-native";
import Toast, { BaseToastProps } from "react-native-toast-message";

const ToastCard = ({
    title,
    message,
    iconBg,
    titleColor,
    icon,
}: {
    title: string;
    message?: string;
    iconBg: string;
    titleColor: string;
    icon: React.ReactNode;
}) => (
    <View style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 24,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 16,
        gap: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        width: "80%",
    }}>
        <View style={{
            backgroundColor: iconBg,
            borderRadius: 999,
            width: 44,
            height: 44,
            alignItems: "center",
            justifyContent: "center",
        }}>
            {icon}
        </View>
        <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "700", fontSize: 16, color: titleColor }}>{title}</Text>
            {message && <Text style={{ fontSize: 14, color: "#6b7280", marginTop: 2 }}>{message}</Text>}
        </View>
        <Pressable onPress={() => Toast.hide()}>
            <XIcon size={18} color="#9ca3af" />
        </Pressable>
    </View>
);

export const toastConfig = {
    success: ({ text1, text2 }: BaseToastProps) => (
        <ToastCard
            title={text1 ?? "Success!"}
            message={text2}
            iconBg="#22c55e"
            titleColor="#22c55e"
            icon={<CheckCircleIcon size={24} color="#fff" weight="fill" />}
        />
    ),
    error: ({ text1, text2 }: BaseToastProps) => (
        <ToastCard
            title={text1 ?? "Error!"}
            message={text2}
            iconBg="#ef4444"
            titleColor="#ef4444"
            icon={<XCircleIcon size={24} color="#fff" weight="fill" />}
        />
    ),
    info: ({ text1, text2 }: BaseToastProps) => (
        <ToastCard
            title={text1 ?? "Info"}
            message={text2}
            iconBg="#3b82f6"
            titleColor="#3b82f6"
            icon={<InfoIcon size={24} color="#fff" weight="fill" />}
        />
    ),
};
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const NoInternetBanner = () => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected ?? true);
        });

        return () => unsubscribe();
    }, []);

    if (isConnected) return null;

    return (
        <View style={{
            backgroundColor: "#ef4444",
            paddingVertical: 8,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
        }}>
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 14 }}>
                No internet connection
            </Text>
        </View>
    );
};

export default NoInternetBanner;
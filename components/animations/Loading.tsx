import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";

type DotProps = {
  delay: number;
};

const Dot = ({ delay }: DotProps) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    const timeout = setTimeout(() => {
      animation.start();
    }, delay);

    return () => {
      clearTimeout(timeout);
      animation.stop();
    };
  }, [bounceAnim, delay]);

  return (
    <Animated.View
      style={{
        width: 12,
        height: 12,
        borderRadius: 8,
        backgroundColor: "#e5e7eb",
        transform: [{ translateY: bounceAnim }],
      }}
    />
  );
};

const Loading = () => {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Dot delay={0} />
      <Dot delay={150} />
      <Dot delay={300} />
    </View>
  );
};

export default Loading;

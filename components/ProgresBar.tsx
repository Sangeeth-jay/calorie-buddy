import { View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

const AnimatedView = Animated.createAnimatedComponent(View);

type Props = {
  currentStep: number;
  totalSteps: number;
  duration?: number;
};

const ProgresBar: React.FC<Props> = ({
  currentStep,
  totalSteps,
  duration = 300,
}) => {
  const progress = useRef(new Animated.Value(0)).current;

  
  useEffect(() => {
    const ratio = totalSteps > 0 ? currentStep / totalSteps : 0;
    Animated.timing(progress, {
      toValue: ratio,
      duration,
      useNativeDriver: false,
    }).start();
  }, [currentStep, totalSteps, duration, progress]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });
  return (
    <View className="w-8/12 h-2 bg-gray-200 rounded-full overflow-hidden">
      <AnimatedView
        className="h-full bg-blue-500 rounded-full"
        style={{ width }}
      />
    </View>
  );
};

export default ProgresBar;

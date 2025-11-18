import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface DonutChartProps {
  data: {
    percentage: number;
    color: string;
    label: string;
  }[];
  size?: number;
  strokeWidth?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 280,
  strokeWidth = 20,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Animation value
  const animationValue = useRef(new Animated.Value(0)).current;

  // Start animation on mount
  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 900, // 1 second
      useNativeDriver: false,
    }).start();
  }, [animationValue]);

  // Start at -90 degrees (top of circle)
  let rotation = -90;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((item, index) => {
          // Calculate segment length with small gap
          const segmentPercentage = item.percentage; 
          const segmentLength = (segmentPercentage / 100) * circumference;

          const currentRotation = rotation;

          // Update rotation for next segment
          rotation += item.percentage * 3.6;

          // Animate the strokeDashoffset from full circumference to 0
          const animatedOffset = animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [circumference, 0],
          });

          const circle = (
            <AnimatedCircle
              key={index}
              cx={center}
              cy={center}
              r={radius}
              stroke={item.color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${segmentLength} ${circumference}`}
              strokeDashoffset={animatedOffset}
              rotation={currentRotation}
              origin={`${center}, ${center}`}
            />
          );

          return circle;
        })}
      </Svg>

      {/* Center content */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "regular",}} className="text-slate-600">
          2500
        </Text>
        <Text style={{ fontSize: 14, color: "#6B7280" }}>Calories</Text>
      </View>
    </View>
  );
};

export default DonutChart;

import React, { useRef } from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  Animated,
  GestureResponderEvent,
} from "react-native";

type Variant = "primary" | "secondary" | "danger" | "success";

interface ButtonProps {
  title?: string;
  onPress: (e?: GestureResponderEvent) => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string; // opcional, usado por NativeWind si quieres
  variant?: Variant;
}

export default function Button({
  title = "Enviar",
  onPress,
  isLoading = false,
  disabled = false,
  className = "",
  variant = "primary",
}: ButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true, // esto usa transform scale nativo, pero seguro porque lo controlas aquí
      friction: 6,
      tension: 150,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
      tension: 150,
    }).start();
  };

  const variantStyles = {
    primary: "bg-blue-600",
    secondary: "bg-gray-600",
    danger: "bg-red-600",
    success: "bg-green-600",
  } as Record<Variant, string>;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled || isLoading}
      // mantengo className por si usas NativeWind; si no, está OK ignorarlo
      // Nota: Pressable acepta style prop; aquí usamos Animated.View wrapper para scale
    >
      <Animated.View
        style={{ transform: [{ scale: scaleAnim }] }}
        // puedes seguir usando className si NativeWind está funcionando:
        // @ts-ignore - si no usas TypeScript strict, o remueve className prop
        className={`
          ${variantStyles[variant]}
          p-4 rounded-2xl items-center justify-center
          ${disabled || isLoading ? "opacity-50" : ""}
          ${className}
        `}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-base font-semibold tracking-wide">
            {title}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
}
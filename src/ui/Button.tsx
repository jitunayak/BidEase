import React from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { App } from "../Constant";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
  disabled,
  ...rest
}) => {
  const scale = React.useRef(new Animated.Value(1)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.8,
        easing: Easing.linear,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        easing: Easing.linear,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...sizeStyles[size],
      ...(fullWidth && styles.fullWidth),
    };

    const variantStyle = {
      primary: {
        backgroundColor: App.colors.primary,
      },
      secondary: {
        backgroundColor: App.colors.border,
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: App.colors.primary,
      },
      ghost: {
        backgroundColor: "transparent",
      },
      danger: {
        backgroundColor: App.colors.danger,
      },
    };

    const disabledStyle: ViewStyle = disabled ? { opacity: 0.6 } : {};

    return {
      ...baseStyle,
      ...variantStyle[variant],
      ...disabledStyle,
      ...style,
      transform: [{ scale: scale }],
      opacity: opacity,
    };
  };

  const getTextStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...styles.text,
      ...textSizeStyles[size],
    };

    const variantTextStyle = {
      primary: {
        color: "#FFFFFF",
      },
      secondary: {
        color: App.colors.secondary,
      },
      outline: {
        color: App.colors.primary,
      },
      ghost: {
        color: App.colors.primary,
      },
      danger: {
        color: "#FFFFFF",
      },
    };

    return {
      ...baseStyle,
      ...variantTextStyle[variant],
      ...textStyle,
    };
  };

  return (
    <TouchableOpacity
      style={getButtonStyles()}
      disabled={disabled || isLoading}
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          color={
            variant === "outline" || variant === "ghost"
              ? App.colors.primary
              : "#FFFFFF"
          }
          size="small"
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={getTextStyles()}>{title}</Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};

const sizeStyles = {
  sm: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  md: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
};

const textSizeStyles = {
  sm: {
    fontSize: 14,
  },
  md: {
    fontSize: 16,
  },
  lg: {
    fontSize: 18,
  },
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    fontWeight: "500",
    textAlign: "center",
  },
  fullWidth: {
    width: "100%",
  },
});


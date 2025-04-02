import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { App } from "../Constant";

interface PriceRangeSliderProps {
  minValue: number;
  maxValue: number;
  initialLowValue?: number;
  initialHighValue?: number;
  step?: number;
  formatValue?: (value: number) => string;
  onValueChange?: (lowValue: number, highValue: number) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  style?: any;
}

export function PriceRangeSlider({
  minValue,
  maxValue,
  initialLowValue,
  initialHighValue,
  step = 1,
  formatValue = (value: number) => `$${value}`,
  onValueChange,
  label,
  error,
  disabled = false,
  style,
}: PriceRangeSliderProps) {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [lowValue, setLowValue] = useState(initialLowValue || minValue);
  const [highValue, setHighValue] = useState(initialHighValue || maxValue);

  const lowThumbPosition = useRef(new Animated.Value(0)).current;
  const highThumbPosition = useRef(new Animated.Value(0)).current;

  // Store current position values in refs to access in PanResponder
  const lowPositionRef = useRef(0);
  const highPositionRef = useRef(0);

  // Update refs when animated values change
  useEffect(() => {
    const lowListener = lowThumbPosition.addListener(({ value }) => {
      lowPositionRef.current = value;
    });
    const highListener = highThumbPosition.addListener(({ value }) => {
      highPositionRef.current = value;
    });

    return () => {
      lowThumbPosition.removeListener(lowListener);
      highThumbPosition.removeListener(highListener);
    };
  }, []);

  // Update positions when values change externally
  useEffect(() => {
    if (sliderWidth > 0) {
      const lowPos =
        ((lowValue - minValue) / (maxValue - minValue)) * sliderWidth;
      const highPos =
        ((highValue - minValue) / (maxValue - minValue)) * sliderWidth;

      lowThumbPosition.setValue(lowPos);
      highThumbPosition.setValue(highPos);
    }
  }, [sliderWidth, lowValue, highValue, minValue, maxValue]);

  // Initialize with initial values
  useEffect(() => {
    if (
      initialLowValue !== undefined &&
      initialLowValue >= minValue &&
      initialLowValue <= maxValue
    ) {
      setLowValue(initialLowValue);
    }
    if (
      initialHighValue !== undefined &&
      initialHighValue >= minValue &&
      initialHighValue <= maxValue
    ) {
      setHighValue(initialHighValue);
    }
  }, [initialLowValue, initialHighValue, minValue, maxValue]);

  const getValueFromPosition = (position: number): number => {
    const ratio = position / sliderWidth;
    const rawValue = minValue + ratio * (maxValue - minValue);

    // Apply step
    const steppedValue = Math.round(rawValue / step) * step;

    // Ensure value is within bounds
    return Math.max(minValue, Math.min(maxValue, steppedValue));
  };

  const lowThumbPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled,
    onPanResponderGrant: () => {
      lowThumbPosition.setOffset(lowPositionRef.current);
      lowThumbPosition.setValue(0);
    },
    onPanResponderMove: (_, gestureState) => {
      const newPosition = Math.max(
        0,
        Math.min(
          highPositionRef.current,
          gestureState.dx + lowPositionRef.current
        )
      );
      lowThumbPosition.setValue(newPosition - lowPositionRef.current);

      const newValue = getValueFromPosition(newPosition);
      if (newValue !== lowValue) {
        setLowValue(newValue);
        onValueChange?.(newValue, highValue);
      }
    },
    onPanResponderRelease: () => {
      lowThumbPosition.flattenOffset();
    },
  });

  const highThumbPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled,
    onPanResponderGrant: () => {
      highThumbPosition.setOffset(highPositionRef.current);
      highThumbPosition.setValue(0);
    },
    onPanResponderMove: (_, gestureState) => {
      const newPosition = Math.min(
        sliderWidth,
        Math.max(
          lowPositionRef.current,
          gestureState.dx + highPositionRef.current
        )
      );
      highThumbPosition.setValue(newPosition - highPositionRef.current);

      const newValue = getValueFromPosition(newPosition);
      if (newValue !== highValue) {
        setHighValue(newValue);
        onValueChange?.(lowValue, newValue);
      }
    },
    onPanResponderRelease: () => {
      highThumbPosition.flattenOffset();
    },
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setSliderWidth(width);

    // Initialize thumb positions
    const lowPos = ((lowValue - minValue) / (maxValue - minValue)) * width;
    const highPos = ((highValue - minValue) / (maxValue - minValue)) * width;

    lowThumbPosition.setValue(lowPos);
    highThumbPosition.setValue(highPos);
  };

  const trackLeftStyle = {
    width: lowThumbPosition,
    backgroundColor: disabled ? App.colors.border : App.colors.textSecondary,
  };

  const trackMiddleStyle = {
    left: lowThumbPosition,
    right: Animated.subtract(sliderWidth, highThumbPosition),
    backgroundColor: disabled ? App.colors.border : App.colors.primary,
  };

  const trackRightStyle = {
    width: Animated.subtract(sliderWidth, highThumbPosition),
    backgroundColor: disabled ? App.colors.border : App.colors.textSecondary,
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.valuesContainer}>
        <Text style={[styles.valueText, disabled && styles.disabledText]}>
          {formatValue(lowValue)}
        </Text>
        <Text style={styles.rangeText}>to</Text>
        <Text style={[styles.valueText, disabled && styles.disabledText]}>
          {formatValue(highValue)}
        </Text>
      </View>

      <View
        style={[styles.sliderContainer, disabled && styles.disabledContainer]}
        onLayout={handleLayout}
      >
        <Animated.View
          style={[styles.track, styles.trackLeft, trackLeftStyle]}
        />
        <Animated.View
          style={[styles.track, styles.trackMiddle, trackMiddleStyle]}
        />
        <Animated.View
          style={[styles.track, styles.trackRight, trackRightStyle]}
        />

        <Animated.View
          style={[
            styles.thumb,
            disabled && styles.disabledThumb,
            { transform: [{ translateX: lowThumbPosition }] },
          ]}
          {...lowThumbPanResponder.panHandlers}
        />

        <Animated.View
          style={[
            styles.thumb,
            disabled && styles.disabledThumb,
            { transform: [{ translateX: highThumbPosition }] },
          ]}
          {...highThumbPanResponder.panHandlers}
        />
      </View>

      <View style={styles.minMaxContainer}>
        <Text style={[styles.minMaxText, disabled && styles.disabledText]}>
          {formatValue(minValue)}
        </Text>
        <Text style={[styles.minMaxText, disabled && styles.disabledText]}>
          {formatValue(maxValue)}
        </Text>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: App.colors.text,
  },
  valuesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  valueText: {
    fontSize: 16,
    fontWeight: "600",
    color: App.colors.primary,
  },
  rangeText: {
    fontSize: 14,
    color: App.colors.textSecondary,
    marginHorizontal: 8,
  },
  sliderContainer: {
    height: 40,
    position: "relative",
    justifyContent: "center",
  },
  track: {
    position: "absolute",
    height: 4,
    borderRadius: 2,
  },
  trackLeft: {
    left: 0,
  },
  trackMiddle: {
    position: "absolute",
  },
  trackRight: {
    right: 0,
  },
  thumb: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: App.colors.card,
    borderWidth: 2,
    borderColor: App.colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: -14, // Half of the width to center
  },
  disabledThumb: {
    borderColor: App.colors.border,
    backgroundColor: App.colors.background,
  },
  disabledContainer: {
    opacity: 0.7,
  },
  disabledText: {
    color: App.colors.textSecondary,
  },
  minMaxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  minMaxText: {
    fontSize: 12,
    color: App.colors.textSecondary,
  },
  errorText: {
    color: App.colors.error,
    fontSize: 14,
    marginTop: 4,
  },
});

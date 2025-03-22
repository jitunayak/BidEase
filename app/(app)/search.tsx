import { Colors } from "@/src/Constant";
import Octicons from "@expo/vector-icons/Octicons";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text, TextInput, View } from "react-native";

export default function search() {
  const [searchKeyword, setSearchKeyword] = useState("Search");
  const keywords = ["auction", "gold", "property"];
  const keywordIndex = useRef(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      keywordIndex.current = (keywordIndex.current + 1) % keywords.length;
      setSearchKeyword(keywords[keywordIndex.current]);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -20,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => {
        slideAnim.setValue(20);
        opacityAnim.setValue(0);
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.8,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const animatedStyle = {
    transform: [{ translateY: slideAnim }],
    opacity: opacityAnim,
    color: Colors.secondary,
  };

  return (
    <View
      style={{
        flex: 1,
        // alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: Colors.background,
        paddingTop: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          borderWidth: 1,
          borderColor: Colors.border,
          borderRadius: 8,
          gap: 8,
          alignItems: "center",
        }}
      >
        <Octicons name="search" size={18} color={Colors.primary} />
        <View
          style={{
            position: "absolute",
            left: 50,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 4,
          }}
        >
          <Text>Search</Text>
          <Animated.Text style={animatedStyle}>{searchKeyword}</Animated.Text>
        </View>
        {/* Search */}
        <TextInput
          // placeholder=""
          clearButtonMode="always"
          autoFocus={true}
          style={{
            width: "auto",
            fontSize: 16,
            flex: 1,
          }}
          // placeholderTextColor={Colors.secondary}
        />
      </View>

      <Text style={{ color: Colors.text, marginTop: 50, textAlign: "center" }}>
        No matching results found
      </Text>
    </View>
  );
}

import AssetCompactCard from "@/src/components/AssetCompactCard";
import { App, Colors } from "@/src/Constant";
import { useAuctionsWithSearchLazyQuery } from "@/src/gql/generated";
import Octicons from "@expo/vector-icons/Octicons";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  Text,
  TextInput,
  View,
} from "react-native";

const keywords = ["suv", "gold", "home"];
export default function search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKeyword, setSearchKeyword] = useState(keywords[0]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [fetch, { data, loading }] = useAuctionsWithSearchLazyQuery();

  const keywordIndex = useRef(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400); // 400ms debounce
    return () => clearTimeout(handler);
  }, [searchQuery]);

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

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      fetch({
        variables: {
          keyword: debouncedQuery,
        },
      });
    }
  }, [debouncedQuery]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          borderWidth: 1,
          borderColor: App.colors.border,
          borderRadius: App.ui.borderRadius.sm,
          gap: 8,
          marginHorizontal: 10,
          alignItems: "center",
          backgroundColor: App.colors.secondaryBackground,
        }}
      >
        <Octicons name="search" size={18} color={App.colors.text} />
        {searchQuery.length === 0 && (
          <View
            style={{
              position: "absolute",
              left: 36,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Text>Search</Text>
            <Animated.Text style={animatedStyle}>{searchKeyword}</Animated.Text>
          </View>
        )}

        {/* Search */}
        <TextInput
          value={searchQuery}
          // placeholder=""
          onChangeText={(text) => setSearchQuery(text)}
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

      {data?.searchAuctions && data.searchAuctions.length > 0 && (
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text
            style={{
              color: App.colors.textSecondary,
              marginVertical: 10,
              textAlign: "center",
            }}
          >
            {data?.searchAuctions.length} matching results found
          </Text>
        </View>
      )}
      {data?.searchAuctions && data?.searchAuctions.length > 0 ? (
        <FlashList
          data={data?.searchAuctions}
          renderItem={({ item }) => {
            return (
              <AssetCompactCard
                item={item as any}
                onPress={() =>
                  router.navigate(`/asset/${(item as { id: string }).id}`)
                }
              />
            );
          }}
          estimatedItemSize={400}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
        />
      ) : loading ? (
        <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
          <Image
            source={require("@/assets/images/search.png")}
            style={{ width: 120, height: 120 }}
          />
          <Text
            style={{ color: Colors.text, marginTop: 50, textAlign: "center" }}
          >
            No matching results found
          </Text>
        </View>
      )}
    </View>
  );
}

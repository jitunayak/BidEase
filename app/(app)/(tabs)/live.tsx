import AssetCompactCard from "@/src/components/AssetCompactCard";
import Title from "@/src/components/Title";
import { Colors } from "@/src/Constant";
import { wishListedAuctions } from "@/src/data/auctions";
import { HStack } from "@/src/ui/HStack";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Live() {
  const [active, setActive] = React.useState(1);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ marginTop: 60 }} />
      <View style={{ paddingHorizontal: 8, flex: 1 }}>
        <FlatList
          data={wishListedAuctions}
          keyExtractor={(item) => item.id}
          renderItem={AssetCompactCard}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        />

        {/* <View style={{ paddingBottom: 16 }}>
          <Button
            title="Filter"
            variant="secondary"
            onPress={() => {}}
            isLoading={false}
          />
        </View> */}
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={["10%, 50%, 90%"]}
        >
          <BottomSheetView style={{ flex: 1, padding: 2 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                marginBottom: 24,
                alignSelf: "center",
              }}
            >
              Filters
            </Text>

            <View style={{ gap: 16, paddingHorizontal: 8, marginBottom: 16 }}>
              <Title value="Category" />

              <HStack justifyContent="flex-start">
                {["vehicles", "lands", "properties", "gold"].map((item) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.background,
                      padding: 10,
                      borderRadius: 16,
                      marginBottom: 8,
                      borderWidth: 0.6,
                      borderColor: Colors.border,
                      marginRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.text,
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </HStack>

              <Title value="Price Range" />
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {["< 10000", "100000-100000", "100000-300000", "> 300000"].map(
                  (item) => (
                    <TouchableOpacity
                      style={{
                        backgroundColor: Colors.background,
                        padding: 10,
                        borderRadius: 16,
                        marginBottom: 8,
                        borderColor: Colors.border,
                        borderWidth: 0.6,
                        marginRight: 8,
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.text,
                        }}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
              <Title value="Location" style={{ marginBottom: 16 }} />
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {[
                  "Odisha",
                  "Kolkata",
                  "Delhi",
                  "Mumbai",
                  "Pune",
                  "Chennai",
                  "Hyderabad",
                  "Bangalore",
                ].map((item) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.background,
                      padding: 10,
                      borderRadius: 16,
                      marginBottom: 8,
                      borderWidth: 0.6,
                      borderColor: Colors.border,
                      marginRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.text,
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

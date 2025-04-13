import AssetCompactCard from "@/src/components/AssetCompactCard";
import { useAuctionsQuery } from "@/src/gql/generated";
import { EText } from "@/src/ui";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Live() {
  const router = useRouter();
  const [active, setActive] = React.useState(1);
  // const bottomSheetRef = useRef<BottomSheet>(null);

  // const handleSheetChanges = useCallback((index: number) => {
  // console.log("handleSheetChanges", index);
  // }, []);

  const { data: liveAuctions, loading } = useAuctionsQuery();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <EText>Loading...</EText>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <View style={{ paddingHorizontal: 8, flex: 1 }}>
        <SafeAreaView style={{ marginVertical: 4 }} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={liveAuctions?.auctions}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <AssetCompactCard
              item={item.item as any}
              compact={false}
              onPress={() => {
                router.push(`/(app)/app/${item.item.id}`);
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        />
        {/* <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={["10%, 50%, 100%"]}
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

            <ScrollView>
              <View style={{ gap: 16, paddingHorizontal: 8 }}>
                <EText variant="title">Type</EText>
                <HStack justifyContent="flex-start">
                  {["vehicles", "lands", "properties", "gold"].map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={{
                        backgroundColor: Colors.background,
                        padding: 12,
                        borderRadius: App.ui.borderRadius.sm,
                        marginBottom: 8,
                        borderWidth: 1,
                        borderColor:
                          item === "vehicles" ? Colors.primary : Colors.border,
                        marginRight: 8,
                      }}
                    >
                      <Text
                        style={{
                          color:
                            item === "vehicles" ? Colors.primary : Colors.text,
                        }}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </HStack>

                <EText variant="title">Price Range</EText>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {[
                    "< 10000",
                    "100000-100000",
                    "100000-300000",
                    "> 300000",
                  ].map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={{
                        backgroundColor: Colors.background,
                        padding: 10,
                        borderRadius: App.ui.borderRadius.sm,
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
                  ))}
                </View>
                <EText style={{ marginBottom: 16 }}>Location</EText>
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
                      key={item}
                      style={{
                        backgroundColor: Colors.background,
                        padding: 10,
                        borderRadius: App.ui.borderRadius.sm,
                        marginBottom: 8,
                        borderWidth: 0.6,
                        borderColor:
                          item === "Odisha" ? Colors.primary : Colors.border,
                        marginRight: 8,
                      }}
                    >
                      <Text
                        style={{
                          color:
                            item === "Odisha" ? Colors.primary : Colors.text,
                        }}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
            <Button
              title="Apply Filter"
              variant="primary"
              onPress={() => {
                bottomSheetRef.current?.collapse();
              }}
            />
          </BottomSheetView>
        </BottomSheet> */}
      </View>
    </GestureHandlerRootView>
  );
}

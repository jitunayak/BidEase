import AssetCompactCard from "@/src/components/AssetCompactCard";
import { wishListedAuctions } from "@/src/data/auctions";
import Button from "@/src/ui/Button";
import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Live() {
  const [active, setActive] = React.useState(1);

  return (
    <View style={{ paddingHorizontal: 8, flex: 1 }}>
      <SafeAreaView />
      <FlatList
        data={wishListedAuctions}
        keyExtractor={(item) => item.id}
        renderItem={AssetCompactCard}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
      <View style={{ paddingBottom: 16 }}>
        <Button
          title="Filter"
          variant="secondary"
          onPress={() => {}}
          isLoading={false}
        />
        {/* <AssetCategoryFilter active={active} onChange={setActive} /> */}
      </View>
    </View>
  );
}

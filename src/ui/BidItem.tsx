import { Bid } from "@/src/types";
import { Check, User } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { App } from "../Constant";
import { formatCurrency, formatRelativeTime } from "../lib/format";

interface BidItemProps {
  bid: Bid;
  isCurrentUserBid?: boolean;
}

export const BidItem: React.FC<BidItemProps> = ({
  bid,
  isCurrentUserBid = false,
}) => {
  return (
    <View style={[styles.container, isCurrentUserBid && styles.currentUserBid]}>
      <View style={styles.userContainer}>
        <View style={styles.avatarContainer}>
          <User size={16} color={App.colors.card} />
        </View>
        <View>
          <Text style={styles.userName}>
            {isCurrentUserBid ? "You" : bid.userName}
            {bid.status === "winning" && (
              <Text style={styles.winningText}> (Highest Bid)</Text>
            )}
          </Text>
          <Text style={styles.timestamp}>
            {formatRelativeTime(new Date(bid.timestamp))}
          </Text>
        </View>
      </View>

      <View style={styles.bidInfo}>
        <Text style={styles.bidAmount}>{formatCurrency(bid.amount)}</Text>
        {bid.status === "winning" && (
          <View style={styles.winningBadge}>
            <Check size={12} color={App.colors.card} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: App.colors.borderLight,
  },
  currentUserBid: {
    backgroundColor: App.colors.borderLight,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: App.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
    color: App.colors.text,
  },
  winningText: {
    color: App.colors.success,
    fontWeight: "500",
  },
  timestamp: {
    fontSize: 12,
    color: App.colors.textSecondary,
    marginTop: 2,
  },
  bidInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bidAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: App.colors.primary,
  },
  winningBadge: {
    backgroundColor: App.colors.success,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

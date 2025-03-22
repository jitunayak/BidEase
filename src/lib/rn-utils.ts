import * as Haptics from "expo-haptics";

export const RNUtils = {
  giveHapticFeedback: () =>
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
};

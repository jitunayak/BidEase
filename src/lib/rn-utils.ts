import Color from "color";
import * as Haptics from "expo-haptics";

export const RNUtils = {
  giveHapticFeedback: () =>
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),

  getLighterColor: (color: string, amount: number) => {
    const c = Color(color);
    return c.alpha(amount / 100).string();
  },
};

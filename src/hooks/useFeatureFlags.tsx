import { useLDClient } from "@launchdarkly/react-native-client-sdk";

import { useEffect, useState } from "react";

export default function useFeatureFlag(
  flagKey: "network-inspector",
  defaultValue: boolean | string | number | object
) {
  const client = useLDClient();
  const [flagValue, setFlagValue] = useState(defaultValue);

  useEffect(() => {
    if (!client) return;

    // Get initial value
    const getValue = () => {
      if (typeof defaultValue === "boolean") {
        return client.boolVariation(flagKey, defaultValue);
      } else if (typeof defaultValue === "string") {
        return client.stringVariation(flagKey, defaultValue);
      } else if (typeof defaultValue === "number") {
        return client.numberVariation(flagKey, defaultValue);
      } else {
        return client.jsonVariation(flagKey, defaultValue);
      }
    };

    setFlagValue(getValue() as typeof defaultValue);

    // Listen for flag changes
    const listener = () => {
      setFlagValue(getValue() as typeof defaultValue);
    };

    client.on("change", listener);

    return () => {
      client.off("change", listener);
    };
  }, [client, flagKey, defaultValue]);

  return flagValue;
}

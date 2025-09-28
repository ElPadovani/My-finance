import { config as defaultConfig } from "@gluestack-ui/config";

export const customConfig = {
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    fonts: {
      heading: "Poppins_700Bold",
      body: "Poppins_400Regular",
      mono: "Poppins_600SemiBold",
    },
  },
};
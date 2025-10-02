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
  components: {
    ...defaultConfig.components,
    Input: {
      ...defaultConfig.components?.Input,
      theme: {
        ...defaultConfig.components?.Input?.theme,
        ":focus": { borderColor: "#5e3f44ff" }
      }
    }
  }
};
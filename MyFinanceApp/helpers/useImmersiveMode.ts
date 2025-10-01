import { useEffect } from "react";
import { StatusBar } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

export function useImmersiveMode() {
  useEffect(() => {
    // StatusBar transparente
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setBarStyle("light-content");

    // NavigationBar escondida (a parte que funciona em edge-to-edge)
    NavigationBar.setVisibilityAsync("hidden");
  }, []);
}

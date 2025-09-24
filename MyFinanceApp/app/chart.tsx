import { Box } from "@gluestack-ui/themed";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import React from "react";

export default function ChartScreen() {
  return (
    <Box flex={1} safeArea p={5} alignItems="center" justifyContent="center">
      <BarChart
        data={{
          labels: ["Mercado", "Transporte", "Lazer", "Contas"],
          datasets: [{ data: [150, 50, 80, 200] }],
        }}
        width={Dimensions.get("window").width - 30}
        height={220}
        yAxisLabel="R$"
        chartConfig={{
          backgroundColor: "#1e3d59",
          backgroundGradientFrom: "#1e3d59",
          backgroundGradientTo: "#1e3d59",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
        }}
        verticalLabelRotation={30}
      />
    </Box>
  );
}

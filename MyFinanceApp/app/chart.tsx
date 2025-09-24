import { Box } from "@gluestack-ui/themed";
import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { StatusBar } from "expo-status-bar";

export default function ChartScreen() {
  const width = Dimensions.get("window").width - 30;

  return (
    <Box flex={1} bg="$black" alignItems="center" justifyContent="center">
      {/* Esconde a barra de notificações só nesta tela */}
      <StatusBar hidden />

      <BarChart
        data={{
          labels: ["Mercado", "Transporte", "Lazer", "Contas"],
          datasets: [{ data: [150, 50, 80, 200] }],
        }}
        width={width}
        height={220}
        yAxisLabel="R$"
        chartConfig={{
          backgroundColor: "transparent",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
        }}
        verticalLabelRotation={30}
      />
    </Box>
  );
}

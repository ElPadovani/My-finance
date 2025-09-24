import { Box } from "@gluestack-ui/themed";
import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function ChartScreen() {
  const width = Dimensions.get("window").width - 30;

  return (
    <Box sx={{ flex: 1, p: "$5", alignItems: "center", justifyContent: "center" }}>
      <BarChart
        data={{
          labels: ["Mercado", "Transporte", "Lazer", "Contas"],
          datasets: [{ data: [150, 50, 80, 200] }],
        }}
        width={width}
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

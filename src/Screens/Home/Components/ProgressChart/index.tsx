import { Box, Heading, Text, useTheme } from "native-base";
import React from "react";
import { ProgressChart as CustomProgressChart } from "react-native-chart-kit";

const ProgressChart = () => {
  const theme = useTheme();
  const data = {
    labels: ["Jan"],
    data: [0.6],
  };
  return (
    <Box display={"flex"} alignItems="center" position={"relative"}>
      <CustomProgressChart
        data={data}
        width={250}
        height={250}
        strokeWidth={16}
        radius={100}
        hideLegend={true}
        chartConfig={{
          backgroundColor: theme.colors.warmGray[900],
          backgroundGradientFrom: theme.colors.warmGray[900],
          backgroundGradientTo: theme.colors.warmGray[900],

          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,

          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          position: "relative",
          borderRadius: 16,
        }}
      />
      <Box
        position={"absolute"}
        borderRadius={100}
        height={150}
        width={150}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        style={{
          backgroundColor: theme.colors.light[200],
          bottom: "21%",
        }}
      >
        <Heading color={"indigo.600"} fontSize={"4xl"}>
          42%
        </Heading>
      </Box>
    </Box>
  );
};

export { ProgressChart };

import React from "react";
import Chart from "react-apexcharts";

export const Chart1 = () => {
  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
    },
    series: [
      {
        name: "Sales",
        data: [30, 40, 35, 50, 49, 60, 70],
      },
    ],
  };
  return (
    <Chart
      options={state.options}
      series={state.series}
      type="bar"
      width="500"
    />
  );
};

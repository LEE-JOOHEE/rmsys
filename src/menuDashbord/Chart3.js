import React, { useState } from "react";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";

export const Chart3 = () => {
  const colors = [
    "#FDCFDA",
    "#FBA7BB",
    "#F9839F",
    "#F86285",
    "#F7446D",
    "#F62655",
    "#F50B40",
    "#DD0939",
    "#C70833",
  ];

  const [series] = useState([25, 15, 44, 55, 41, 17, 55]);

  const options = {
    chart: {
      width: "100%",
      height: "100%",
      type: "pie",
    },
    labels: [
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
      "일요일",
    ],
    colors: colors,
    theme: {
      monochrome: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <div className="plr-16">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        // height={350}
      />
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";

export const Chart5 = ({ isMiniSize, isMiniSizeHide, dataTable1 }) => {
  // 전체 Value 계산
  const totalValue = dataTable1.reduce((sum, item) => sum + item.value, 0);

  // 랜덤 숫자 생성 함수
  const generateRandomData = (days) => {
    return Array.from({ length: days }, (_, i) => ({
      x: `${i + 1}일`,
      y: Math.floor(Math.random() * 100), // 50~150 사이의 랜덤 숫자
    }));
  };

  // 2023년 9월과 2024년 9월 데이터 생성
  const data = [
    {
      id: "2023년 09월(작년)",
      data: generateRandomData(30),
    },
    {
      id: "2024년 09월(올해)",
      data: generateRandomData(30),
    },
  ];

  // 반응형 테이터 제어
  const [visibleData, setVisibleData] = useState(data);
  const updateVisibleData = () => {
    const width = window.innerWidth;
    if (width < 1200 && width > 600) {
      setVisibleData(
        data.map((dataset) => ({
          ...dataset,
          data: dataset.data.slice(-10), // 10개만 표시
        }))
      );
    } else if (width < 600) {
      setVisibleData(
        data.map((dataset) => ({
          ...dataset,
          data: dataset.data.slice(-5), // 5개만 표시
        }))
      );
    } else {
      setVisibleData(data); // 전체 데이터 표시
    }
  };

  useEffect(() => {
    updateVisibleData();
    window.addEventListener("resize", updateVisibleData);
    return () => {
      window.removeEventListener("resize", updateVisibleData);
    };
  }, []);

  return (
    <>
      <div
        className="chart-wrap line-wrap"
        // style={isMiniSizeHide ? { height: "22rem" } : { height: "25rem" }}
      >
        <ResponsiveLine
          data={visibleData}
          margin={{ top: 20, right: 20, bottom: 90, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: 0,
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "날짜",
            legendOffset: 44,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "평균 판매수",
            legendOffset: -48,
            legendPosition: "middle",
          }}
          // enableGridX={false}
          colors={{ scheme: "pink_yellowGreen" }}
          lineWidth={3}
          pointSize={10}
          enablePoints={true}
          pointColor="#ffffff"
          pointBorderColor={{ from: "serieColor" }}
          pointBorderWidth={2}
          pointLabel="y"
          useMesh={true}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 80,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 140,
              itemHeight: 20,
              itemOpacity: 0.85,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </>
  );
};

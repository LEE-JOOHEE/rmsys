import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";

export const Chart4 = ({ isMiniSize, isMiniSizeHide, dataTable1 }) => {
  // 전체 Value 계산
  const totalValue = dataTable1.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className="chart-wrap"
      style={isMiniSizeHide ? { height: "22rem" } : { height: "25rem" }}
    >
      <ResponsivePie
        data={dataTable1}
        margin={
          isMiniSize
            ? { top: 20, right: 20, bottom: 20, left: 20 }
            : { top: 40, right: 80, bottom: 40, left: 100 }
        }
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "purpleRed_green" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        animate={true}
        motionConfig="gentle"
        enableArcLinkLabels={isMiniSize ? false : true}
        arcLinkLabel={(e) => {
          const salesValue =
            dataTable1.find((item) => item.id === e.id)?.sales || 0;
          return isMiniSize
            ? `${e.id}(￦${salesValue.toLocaleString()})`
            : `${e.id}(${e.value})￦${salesValue.toLocaleString()}`;
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsOffset={isMiniSizeHide ? -6 : 0}
        arcLinkLabelsDiagonalLength={isMiniSizeHide ? 0 : 14}
        arcLinkLabelsStraightLength={isMiniSizeHide ? 0 : 12}
        arcLinkLabelsTextOffset={isMiniSizeHide ? 26 : 6}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabel={(e) => {
          const valuePercentage = ((e.value / totalValue) * 100).toFixed(1);
          return isMiniSize ? `${e.id}(${e.value}건)` : `${valuePercentage} %`;
        }}
        tooltip={(e) => {
          const salesValue =
            dataTable1.find((item) => item.id === e.datum.id)?.sales || 0;
          const valuePercentage = ((e.datum.value / totalValue) * 100).toFixed(
            1
          );
          return (
            <div className="nivo-tooltip">
              <div className="tit">
                {e.datum.id}
                <span style={{ color: `${e.datum.color}` }}>
                  &nbsp;({valuePercentage}%)
                </span>
              </div>
              건수 : <strong>{e.datum.value}</strong>건
              <br />
              매출 : <strong>{salesValue.toLocaleString()}</strong>원
            </div>
          );
        }}
        arcLabelsSkipAngle={10}
        arcLabelsTextSize={16}
        // arcLabelsTextColor={{
        //   from: "color",
        //   modifiers: [["darker", 2]],
        // }}
        arcLabelsTextColor={{ theme: "grid.line.stroke" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          // {
          //   match: {
          //     id: "숙박",
          //   },
          //   id: "dots",
          // },
          {
            match: {
              id: "대실",
            },
            id: "lines",
          },
        ]}
        legends={
          isMiniSizeHide
            ? []
            : [
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 130,
                  translateY: 40,
                  itemsSpacing: 8,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]
        }
      />
    </div>
  );
};

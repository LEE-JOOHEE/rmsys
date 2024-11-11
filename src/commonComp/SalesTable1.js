import { Table } from "antd";
import React from "react";

export const SalesTable1 = () => {
  // table
  const data = [
    {
      key: "1",
      category: "대실",
      name: "현금",
      count: 17,
      value: 393000,
      unpauidCount: 3,
      unpauid: 73988,
    },
    {
      key: "2",
      category: "대실",
      name: "계좌",
      count: 0,
      value: 0,
      unpauidCount: 3,
      unpauid: 73988,
    },
    {
      key: "3",
      category: "대실",
      name: "카드",
      count: 3,
      value: 3012,
      unpauidCount: 3,
      unpauid: 73988,
    },
    {
      key: "4",
      category: "대실",
      name: "OTA",
      count: 0,
      value: 0,
      unpauidCount: 3,
      unpauid: 73988,
    },

    {
      key: "5",
      category: "숙박",
      name: "현금",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },
    {
      key: "6",
      category: "숙박",
      name: "계좌",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },
    {
      key: "7",
      category: "숙박",
      name: "카드",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },
    {
      key: "8",
      category: "숙박",
      name: "OTA",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },

    {
      key: "9",
      category: "장기",
      name: "현금",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },
    {
      key: "10",
      category: "장기",
      name: "계좌",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },
    {
      key: "11",
      category: "장기",
      name: "카드",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },
    {
      key: "12",
      category: "장기",
      name: "OTA",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },

    {
      key: "13",
      category: "기타",
      name: "",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },
  ];

  // 카테고리별로 데이터 그룹화 및 합계 계산
  const groupedData = data.reduce((acc, item) => {
    const lastGroup = acc[acc.length - 1];
    if (!lastGroup || lastGroup.category !== item.category) {
      acc.push({ category: item.category, children: [item] });
    } else {
      lastGroup.children.push(item);
    }
    return acc;
  }, []);

  // 각 카테고리의 합계를 계산하고 최종 데이터 생성
  const finalData = [];
  groupedData.forEach((group) => {
    const categoryTotal = group.children.reduce(
      (sum, item) => sum + item.value,
      0
    );
    const categoryCountTotal = group.children.reduce(
      (sum, item) => sum + item.count,
      0
    );
    const unpauidCountTotal = group.children.reduce(
      (sum, item) => item.unpauidCount,
      0
    );
    const unpauidTotal = group.children.reduce((sum, item) => item.unpauid, 0);

    finalData.push(...group.children); // 원본 데이터를 추가
    finalData.push({
      key: `${group.category}-total`,
      category: group.category,
      name: "Total",
      count: categoryCountTotal,
      value: categoryTotal,
    }); // 합계 행 추가
    finalData.push({
      key: `${group.category}-unpauid-total`,
      category: group.category,
      name: "미결제",
      count: unpauidCountTotal,
      value: unpauidTotal,
    });
  });

  // 특정 조건에 따라 클래스 이름을 설정
  const rowClassName = (record) => {
    return record.name === "Total" || record.name === "미결제"
      ? "total-row"
      : "";
  };

  // 테이블 컬럼 정의
  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "20%",
      render: (text, record, index) => {
        // 합계 행이면 카테고리 이름을 null로 설정
        if (record.name === "Total" || record.name === "미결제") {
          return null;
        }
        return text;

        // 이전 행과 같은 카테고리인 경우 null 반환
        if (index > 0 && record.category === text) {
          return {
            props: {
              rowSpan: 1,
            },
            children: null,
          };
        }

        // 같은 카테고리의 개수 계산
        const count = data.filter((item) => item.category === text).length;
        console.log(count);
        return {
          props: {
            rowSpan: count, // 해당 카테고리의 개수를 rowSpan으로 설정
          },
          children: null,
        };
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "건수",
      dataIndex: "count",
      key: "count",
      width: "20%",
      render: (text, record, index) => {
        return <>{record.count} 건</>;
      },
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      width: "20%",
      render: (text, record) => {
        const fommatValue = `${record.value}`.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        return <>￦ {fommatValue}</>;
      },
    },
  ];

  return (
    <>
      <Table
        dataSource={finalData}
        columns={columns}
        pagination={false}
        rowKey="key"
        showHeader={false}
        rowClassName={rowClassName}
      />
    </>
  );
};

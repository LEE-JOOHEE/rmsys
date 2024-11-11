import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import koKR from "antd/lib/locale/ko_KR";
import { CardDashArea } from "./CardDashArea";
import { Chart1 } from "./Chart1";
import { Chart2 } from "./Chart2";
import { Chart3 } from "./Chart3";
import { Chart4 } from "./Chart4";
import { Chart5 } from "./Chart5";
import { Button, Card, ConfigProvider, DatePicker, Table, Tabs } from "antd";
import {
  DateFormatterSymbol,
  disabledDate,
  disabledTime,
  formatNumber,
} from "../util";
import { calc } from "antd/es/theme/internal";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

export const DashbordMain = () => {
  // 카드섹션 width 구하기(반응형)
  const cardRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [isMiniSize, setIsMiniSize] = useState(false);
  const [isMiniSizeHide, setIsMiniSizeHide] = useState(false);

  useEffect(() => {
    const updateCardWidth = () => {
      if (cardRef.current) {
        const width = cardRef.current.offsetWidth;
        setCardWidth(width);

        setIsMiniSizeHide(width <= 520);
        setIsMiniSize(width <= 450);
      }
    };

    const observer = new ResizeObserver(updateCardWidth);
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    updateCardWidth();

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isMiniSize, isMiniSizeHide]);

  // console.log("cardWidth : ", cardWidth);
  // console.log("isMiniSize : ", isMiniSize);

  const dataTable1 = [
    { id: "대실", value: 27, key: 1, sales: 5000 * 30 },
    { id: "숙박", value: 56, key: 2, sales: 10000 * 40 },
    { id: "장기", value: 13, key: 3, sales: 5000 * 20 },
    { id: "기타", value: 8, key: 4, sales: undefined },
  ];

  // 테이블 합계
  const calculateTotals = (dataTable1) => {
    const totalValue = dataTable1.reduce((sum, item) => sum + item.value, 0);
    const totalSales = dataTable1.reduce(
      (sum, item) => sum + (item.sales || 0),
      0
    );
    return { totalValue, totalSales };
  };
  const { totalValue, totalSales } = calculateTotals(dataTable1);

  // 테이블 컬럼 생성
  const columns = [
    {
      title: "분류",
      dataIndex: "type",
      key: "type",
      width: "25%",
      align: "center",
      ellipsis: true,
      render: (text, record, index) => {
        return <div className="font-700">{record.id}</div>;
      },
    },
    {
      title: "건수",
      dataIndex: "count",
      key: "count",
      width: "25%",
      align: "center",
      ellipsis: true,
      render: (text, record, index) => {
        return record.value;
      },
    },
    {
      title: <div className="text-c">매출</div>,
      dataIndex: "sales",
      key: "sales",
      width: "50%",
      align: "right",
      ellipsis: true,
      render: (text, record, index) => {
        const sales = record.sales != null ? record.sales : 0;
        return sales.toLocaleString();
      },
    },
  ];

  // tab
  const items = [
    {
      key: "1",
      label: "숙박유형",
      children: (
        <>
          <div className="grid-col-3 pb-32">
            <Card ref={cardRef} className="grid-span-2">
              {/* 측정된 너비 표시 */}
              {/* <div>Card Width: {cardWidth}px</div> */}
              <Chart4
                isMiniSize={isMiniSize}
                isMiniSizeHide={isMiniSizeHide}
                dataTable1={dataTable1}
              />
            </Card>
            <div className="table-wrap-antd grid-span-1">
              <Table
                columns={columns}
                dataSource={dataTable1}
                pagination={false}
                bordered
                rowKey="key"
                scroll={{ x: "100%" }}
                className="ant-table-respons"
                summary={(pageData) => (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} align="center">
                        <div className="font-700 text-gray-600">합계</div>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} align="center">
                        <div className="font-700">{totalValue}</div>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2} align="right">
                        <div className="font-700">
                          {totalSales.toLocaleString()}
                        </div>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                )}
              />
            </div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "입금구분",
      children: "입금구분",
    },
    {
      key: "3",
      label: "객실타입별",
      children: "객실타입별",
    },
  ];

  const onChangeTab = (key) => {
    console.log(key);
  };

  // 달력
  const today = dayjs();
  const startOfMonth = today.startOf("month");
  const startOfYear = today.subtract(1, "year");
  const [dates, setDates] = useState([startOfMonth, today]);
  // console.log(dates.map((date) => date.format("YYYY-MM-DD")));

  const onChangeDatePicker = (dates) => {
    setDates(dates || []);
  };

  // 자동 날짜 설정 - 일
  const handleDayClick = () => {
    setDates([today, today]);
  };

  // 자동 날짜 설정 - 월
  const handleMonthClick = () => {
    setDates([startOfMonth, today]);
  };

  // 자동 날짜 설정 - 년
  const handleYearClick = () => {
    setDates([startOfYear, today]);
  };

  return (
    <div className="p-16 dashbord">
      <h2>매출 차트</h2>

      <ConfigProvider locale={koKR}>
        <div className="flex-row flex-wrap gap-8 mtb-16">
          <RangePicker
            onChange={onChangeDatePicker}
            value={dates}
            className="dashbord-date-picker"
            format="YYYY-MM-DD"
            style={{ minWidth: "8.75rem" }}
            placement={"bottomLeft"}
            disabledDate={disabledDate}
            disabledTime={disabledTime}
          />
          <div className="btn-group">
            <Button
              type="primary"
              htmlType="button"
              onClick={handleDayClick}
              className="btn-round"
            >
              일
            </Button>
            <Button
              type="primary"
              htmlType="button"
              onClick={handleMonthClick}
              className="btn-round"
            >
              월
            </Button>
            <Button
              type="primary"
              htmlType="button"
              onClick={handleYearClick}
              className="btn-round"
            >
              년
            </Button>
          </div>
        </div>

        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChangeTab}
          type="card"
          className="setting-card-tab w-100"
        />
      </ConfigProvider>

      <CardDashArea />

      <Card>
        <h2 className="mb-16">전년도 올해 평균 판매개수 비교차트(임시)</h2>
        <Chart5
          isMiniSize={isMiniSize}
          isMiniSizeHide={isMiniSizeHide}
          dataTable1={dataTable1}
        />
      </Card>
    </div>
  );
};

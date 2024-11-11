import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import koKR from "antd/lib/locale/ko_KR";
import { roomSaleSearchApi } from "../api/api";
import { Button, ConfigProvider, DatePicker, Table } from "antd";
import { disabledDate, disabledTime, formatNumber } from "../util";

export const CheckAdmissionHistory = () => {
  // API 테스트
  const [checkInList, setCheckInList] = useState([]);
  const [columns, setColumns] = useState([]);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 15 });

  //const [startDateTime, setStartDateTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
  const [startDateTime, setStartDateTime] = useState(dayjs());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await roomSaleSearchApi(startDateTime);

        const resArray = Object.entries(res.room_sales);
        const saleArray = resArray.map(([key, value]) => {
          value.key = key;
          value.room_sale_id = key;
          value.check_in_time = dayjs(value.check_in_time).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          value.check_out_sched_time = dayjs(value.check_out_sched_time).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          value.check_out_time = dayjs(value.check_out_time).format(
            "YYYY-MM-DD HH:mm:ss"
          );

          if (
            value.check_out_time != "" &&
            value.check_out_time != "1970-01-01 09:00:00"
          ) {
            value.check_out_time2 = value.check_out_time;
          } else {
            value.check_out_time2 = value.check_out_sched_time;
          }

          return value;
        });
        setCheckInList(saleArray);

        let room_id_filter = [
          ...new Set(saleArray.map((item) => item.room_id)),
        ].map((room_id) => ({
          value: room_id,
          text: room_id,
        }));

        let room_type_id_filter = [
          ...new Set(saleArray.map((item) => item.room_type_id)),
        ].map((room_type_id) => ({
          value: room_type_id,
          text: room_type_id,
        }));

        let stay_type_filter = [
          ...new Set(saleArray.map((item) => item.stay_type)),
        ].map((stay_type) => ({
          value: stay_type,
          text: stay_type,
        }));

        let check_in_time_filter = [
          ...new Set(saleArray.map((item) => item.check_in_time)),
        ].map((check_in_time) => ({
          value: check_in_time,
          text: check_in_time,
        }));

        let check_out_time_filter = [
          ...new Set(saleArray.map((item) => item.check_out_time2)),
        ].map((check_out_time2) => ({
          value: check_out_time2,
          text: check_out_time2,
        }));

        let channel_id_filter = [
          ...new Set(saleArray.map((item) => item.channel_id)),
        ].map((channel_id) => ({
          value: channel_id,
          text: channel_id,
        }));

        let phones_filter = [
          ...new Set(saleArray.map((item) => item.phones)),
        ].map((phones) => ({
          value: phones,
          text: phones,
        }));

        let car_no_filter = [
          ...new Set(saleArray.map((item) => item.car_no)),
        ].map((car_no) => ({
          value: car_no,
          text: car_no,
        }));

        let person_count_filter = [
          ...new Set(saleArray.map((item) => item.person_count)),
        ].map((person_count) => ({
          value: person_count,
          text: person_count,
        }));

        let fee_filter = [...new Set(saleArray.map((item) => item.fee))].map(
          (fee) => ({
            value: fee,
            text: fee,
          })
        );

        setColumns([
          {
            title: <div className="text-c">객실명</div>,
            dataIndex: "room_id",
            key: "room_id",
            filterSearch: true,
            filters: room_id_filter,
            filteredValue: filteredInfo.room_id || null,
            onFilter: (value, record) =>
              record.room_id.toString() == value.toString(),
            sorter: (a, b) => a.room_id.localeCompare(b.room_id),
            sortOrder:
              sortedInfo.columnKey == "room_id" ? sortedInfo.order : null,
            ellipsis: true,
          },
          {
            title: <div className="text-c">유형명</div>,
            dataIndex: "room_type_id",
            key: "room_type_id",
            filterSearch: true,
            filters: room_type_id_filter,
            filteredValue: filteredInfo.room_type_id || null,
            onFilter: (value, record) => record.room_type_id == value,
            sorter: (a, b) => a.room_type_id.localeCompare(b.room_type_id),
            sortOrder:
              sortedInfo.columnKey == "room_type_id" ? sortedInfo.order : null,
            ellipsis: true,
            responsive: ["sm"],
          },
          {
            title: <div className="text-c">입실유형</div>,
            dataIndex: "stay_type",
            key: "stay_type",
            filterSearch: true,
            filters: stay_type_filter,
            filteredValue: filteredInfo.stay_type || null,
            onFilter: (value, record) => record.stay_type == value,
            sorter: (a, b) => a.stay_type.localeCompare(b.stay_type),
            sortOrder:
              sortedInfo.columnKey == "stay_type" ? sortedInfo.order : null,
            ellipsis: true,
            align: "center",
          },
          {
            title: <div className="text-c">입실시간</div>,
            dataIndex: "check_in_time",
            key: "check_in_time",
            filterSearch: true,
            filters: check_in_time_filter,
            filteredValue: filteredInfo.check_in_time || null,
            onFilter: (value, record) => record.check_in_time == value,
            sorter: (a, b) => a.check_in_time.localeCompare(b.check_in_time),
            sortOrder:
              sortedInfo.columnKey == "check_in_time" ? sortedInfo.order : null,
            ellipsis: true,
            align: "center",
          },
          {
            title: <div className="text-c">퇴실(예정)시간</div>,
            dataIndex: "check_out_time2",
            key: "check_out_time2",
            filterSearch: true,
            filters: check_out_time_filter,
            filteredValue: filteredInfo.check_out_time2 || null,
            onFilter: (value, record) => record.check_out_time2 == value,
            sorter: (a, b) =>
              a.check_out_time2.localeCompare(b.check_out_time2),
            sortOrder:
              sortedInfo.columnKey == "check_out_time2"
                ? sortedInfo.order
                : null,
            ellipsis: true,
            align: "center",
          },
          {
            title: <div className="text-c">무인판매</div>,
            dataIndex: "channel_id",
            key: "channel_id",
            filterSearch: true,
            filters: channel_id_filter,
            filteredValue: filteredInfo.channel_id || null,
            onFilter: (value, record) => record.channel_id == value,
            sorter: (a, b) => Number(a.channel_id) < Number(b.channel_id),
            sortOrder:
              sortedInfo.columnKey == "channel_id" ? sortedInfo.order : null,
            ellipsis: true,
            align: "center",
          },
          {
            title: <div className="text-c">전화번호</div>,
            dataIndex: "phones",
            key: "phones",
            filterSearch: true,
            filters: phones_filter,
            filteredValue: filteredInfo.phones || null,
            onFilter: (value, record) => record.phones == value,
            sorter: (a, b) => Number(a.phones) < Number(b.phones),
            sortOrder:
              sortedInfo.columnKey == "phones" ? sortedInfo.order : null,
            ellipsis: true,
            align: "center",
          },
          {
            title: <div className="text-c">차량번호</div>,
            dataIndex: "car_no",
            key: "car_no",
            filterSearch: true,
            filters: car_no_filter,
            filteredValue: filteredInfo.car_no || null,
            onFilter: (value, record) => record.car_no == value,
            sorter: (a, b) => Number(a.car_no) < Number(b.car_no),
            sortOrder:
              sortedInfo.columnKey == "car_no" ? sortedInfo.order : null,
            ellipsis: true,
            align: "center",
          },
          {
            title: <div className="text-c">인원수</div>,
            dataIndex: "person_count",
            key: "person_count",
            filterSearch: true,
            filters: person_count_filter,
            filteredValue: filteredInfo.person_count || null,
            onFilter: (value, record) => record.person_count == value,
            sorter: (a, b) => Number(a.person_count) < Number(b.person_count),
            sortOrder:
              sortedInfo.columnKey == "person_count" ? sortedInfo.order : null,
            ellipsis: true,
            align: "center",
          },
          {
            title: <div className="text-c">요금</div>,
            dataIndex: "fee",
            key: "fee",
            filterSearch: true,
            filters: fee_filter,
            filteredValue: filteredInfo.fee || null,
            onFilter: (value, record) => record.fee == value,
            sorter: (a, b) => a.fee.localeCompare(b.fee),
            sortOrder: sortedInfo.columnKey == "fee" ? sortedInfo.order : null,
            render: (text) => formatNumber(text) || 0,
            ellipsis: true,
            align: "right",
          },
          // {
          //   title: "현장결제",
          //   dataIndex: "credit_card_no",
          //   key: "credit_card_no",
          //   filterSearch: true,
          //   filters: credit_card_no_filter,
          //   filteredValue: filteredInfo.credit_card_no || null,
          //   onFilter: (value, record) => record.credit_card_no == value,
          //   sorter: (a, b) => a.credit_card_no.localeCompare(b.credit_card_no),
          //   sortOrder:
          //     sortedInfo.columnKey == "credit_card_no"
          //       ? sortedInfo.order
          //       : null,
          //   ellipsis: true,
          // },
          // {
          //   title: "OTA결제",
          //   dataIndex: "amount_paid_agent",
          //   key: "amount_paid_agent",
          //   filterSearch: true,
          //   filters: amount_paid_agent_filter,
          //   filteredValue: filteredInfo.amount_paid_agent || null,
          //   onFilter: (value, record) => record.amount_paid_agent == value,
          //   sorter: (a, b) => Number(a.amount_paid_agent) < Number(b.amount_paid_agent),
          //   sortOrder:
          //     sortedInfo.columnKey == "amount_paid_agent"
          //       ? sortedInfo.order
          //       : null,
          //   ellipsis: true,
          // },
        ]);

        // console.log("columns");
        // console.log(columns);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [startDateTime, filteredInfo, sortedInfo]);

  // 달력
  const onChangeDatePicker = (date, dateString) => {
    console.log(dateString);

    const timestamp = Date.parse(dateString.replace(" ", "T"));

    console.log(timestamp);
    setStartDateTime(timestamp);
  };

  // 테이블 데이터 예시
  // const data = [
  //   {
  //     key: "1",
  //     name: "204",
  //     roomName: "일반실1",
  //     stayType: "대실",
  //     paymentDate: "2024-10-01 15:37",
  //   },
  //   {
  //     key: "2",
  //     name: "502",
  //     roomName: "일반실2",
  //     stayType: "숙박",
  //     paymentDate: "2024-10-01 11:20",
  //   },
  //   {
  //     key: "3",
  //     name: "307",
  //     roomName: "파티룸",
  //     stayType: "대실",
  //     paymentDate: "2024-09-20 01:22",
  //   },
  //   {
  //     key: "4",
  //     name: "306",
  //     roomName: "VIP",
  //     stayType: "숙박",
  //     paymentDate: "2024-08-26 16:10",
  //   },
  //   {
  //     key: "5",
  //     name: "502",
  //     roomName: "일반실2",
  //     stayType: "장기",
  //     paymentDate: "2024-10-07 19:51",
  //   },
  // ];

  // 객실명 필터
  //let filteredRoomId = [];
  // let filteredName = [...new Set(data.map((item) => item.name))].map(
  //   (name) => ({
  //     text: name,
  //     value: name,
  //   })
  // );

  // 유형명 필터
  //let filteredRoomTypeId = [];
  // let filteredRoomTypeId = [...new Set(data.map((item) => item.roomName))].map(
  //   (roomName) => ({
  //     text: roomName,
  //     value: roomName,
  //   })
  // );
  // 입실유형 필터
  //let filteredStayType = [];
  // let filteredStayType = [...new Set(data.map((item) => item.stayType))].map(
  //   (stayType) => ({
  //     text: stayType,
  //     value: stayType,
  //   })
  // );
  // 결제일자 필터
  // filteredPaymentDate = [];
  // let filteredPaymentDate = [
  //   ...new Set(
  //     data.map((item) => dayjs(item.paymentDate).format("YYYY-MM-DD"))
  //   ),
  // ].map((paymentDate) => ({
  //   text: paymentDate,
  //   value: paymentDate,
  // }));

  // 테이블 컬럼 생성

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
    setPagination(pagination);
  };
  // 필터 초기화 버튼
  const clearFilters = () => {
    setFilteredInfo({});
  };
  // 모두 초기화 버튼
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setPagination({ current: 1, pageSize: 100 });
  };
  // 날짜별 정렬 버튼
  const setPaymentDate = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "payment_date",
    });
  };

  return (
    <div className="p-16 pb-0">
      <h2>입실 내역 조회</h2>

      <ConfigProvider locale={koKR}>
        <div className="flex-row flex-wrap gap-8 mt-16 mb-8">
          {/* <DatePicker
            showTime
            onChange={onChangeDatePicker}
            defaultValue={dayjs()}
            format="YYYY-MM-DD HH:mm:ss"
            style={{ minWidth: "8.75rem" }}
            placement={"bottomLeft"}
            disabledDate={disabledDate}
            disabledTime={disabledTime}
          /> */}

          <DatePicker
            showTime
            onChange={onChangeDatePicker}
            defaultValue={dayjs()}
            format="YYYY-MM-DD HH:mm:ss"
            style={{ minWidth: "8.75rem" }}
            placement={"bottomLeft"}
            disabledDate={disabledDate}
            disabledTime={disabledTime}
          />

          <div className="btn-group ml-auto">
            <Button onClick={setPaymentDate}>날짜별 정렬</Button>
            <Button onClick={clearFilters}>전체 필터초기화</Button>
            <Button onClick={clearAll}>모두 초기화</Button>
          </div>
        </div>

        <div className="table-wrap-antd">
          <Table
            columns={columns}
            dataSource={checkInList}
            onChange={handleChange}
            pagination={pagination}
            rowKey="key"
            // scroll={{ y: "28.8rem", x: "2600px" }}
            scroll={{ y: "27.8rem", x: "max-content" }}
            className="ant-table-respons"
            id={"checkAdmissionHistory"}
          />
        </div>
      </ConfigProvider>
    </div>
  );
};

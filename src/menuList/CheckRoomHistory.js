import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import koKR from "antd/lib/locale/ko_KR";
import { roomStateLogApi } from "../api/api";
import { Button, ConfigProvider, DatePicker, Table } from "antd";
import { disabledDate, disabledTime } from "../util";

export const CheckRoomHistory = () => {
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
        const res = await roomStateLogApi(startDateTime);
        console.log(res);
        const resArray = Object.entries(res.room_state_logs);
        const stateLogArray = resArray.map(([key, value]) => {
          value.key = key;
          value.room_state_log_id = key;
          value.registed_time_date = dayjs(value.registed_time).format(
            "YYYY-MM-DD"
          );
          value.registed_time_time = dayjs(value.registed_time).format(
            "HH:mm:ss"
          );
          value.change_data_name = "";

          if (
            typeof value.changed_datas.key != "undefined" &&
            value.changed_datas.key != ""
          ) {
            value.key_name = value.changed_datas.key;
          }

          if (
            typeof value.changed_datas.previous_key != "undefined" &&
            value.changed_datas.previous_key != ""
          ) {
            value.previous_key_name = value.changed_datas.previous_key;
          }

          return value;
        });
        setCheckInList(stateLogArray);

        // console.log("checkInList : ", checkInList);

        let registed_time_date_filter = [
          ...new Set(stateLogArray.map((item) => item.registed_time_date)),
        ].map((registed_time_date) => ({
          value: registed_time_date,
          text: registed_time_date,
        }));

        let registed_time_time_filter = [
          ...new Set(stateLogArray.map((item) => item.registed_time_time)),
        ].map((registed_time_time) => ({
          value: registed_time_time,
          text: registed_time_time,
        }));

        let room_id_filter = [
          ...new Set(stateLogArray.map((item) => item.room_id)),
        ].map((room_id) => ({
          value: room_id,
          text: room_id,
        }));

        let check_in_time_filter = [
          ...new Set(stateLogArray.map((item) => item.check_in_time)),
        ].map((check_in_time) => ({
          value: check_in_time,
          text: check_in_time,
        }));

        let check_out_time_filter = [
          ...new Set(stateLogArray.map((item) => item.check_out_time2)),
        ].map((check_out_time2) => ({
          value: check_out_time2,
          text: check_out_time2,
        }));

        // let channel_id_filter = [
        //   ...new Set(stateLogArray.map((item) => item.channel_id)),
        // ].map((channel_id) => ({
        //   value: channel_id,
        //   text: channel_id,
        // }));

        // console.log("channel_id_filter");
        // console.log(channel_id_filter);

        // let phones_filter = [
        //   ...new Set(stateLogArray.map((item) => item.phones)),
        // ].map((phones) => ({
        //   value: phones,
        //   text: phones,
        // }));

        // console.log("phones_filter");
        // console.log(phones_filter);

        // let car_no_filter = [
        //   ...new Set(stateLogArray.map((item) => item.car_no)),
        // ].map((car_no) => ({
        //   value: car_no,
        //   text: car_no,
        // }));

        // console.log("car_no_filter");
        // console.log(car_no_filter);

        // let person_count_filter = [
        //   ...new Set(
        //     stateLogArray.map((item) => item.person_count)
        //   ),
        // ].map((person_count) => ({
        //   value: person_count,
        //   text: person_count,
        // }));

        // console.log("person_count_filter");
        // console.log(person_count_filter);

        // let fee_filter = [
        //   ...new Set(
        //     stateLogArray.map((item) => item.fee)
        //   ),
        // ].map((fee) => ({
        //   value: fee,
        //   text: fee,
        // }));

        // console.log("fee_filter");
        // console.log(fee_filter);

        setColumns([
          {
            title: "날짜",
            dataIndex: "registed_time_date",
            key: "registed_time_date",
            filterSearch: true,
            filters: registed_time_date_filter,
            filteredValue: filteredInfo.registed_time_date || null,
            onFilter: (value, record) => record.registed_time_date === value,
            sorter: (a, b) =>
              a.registed_time_date.localeCompare(b.registed_time_date),
            sortOrder:
              sortedInfo.columnKey == "registed_time_date"
                ? sortedInfo.order
                : null,
            ellipsis: true,
          },
          {
            title: "시간",
            dataIndex: "registed_time_time",
            key: "registed_time_time",
            filterSearch: true,
            filters: registed_time_time_filter,
            filteredValue: filteredInfo.registed_time_time || null,
            onFilter: (value, record) => {
              const time = dayjs(record.registed_time_time, "HH:mm:ss");
              return time.isValid() && time.format("HH:mm:ss") === value;
            },
            sorter: (a, b) =>
              a.registed_time_time.localeCompare(b.registed_time_time),
            sortOrder:
              sortedInfo.columnKey == "registed_time_time"
                ? sortedInfo.order
                : null,
            ellipsis: true,
            render: (text) => {
              const time = dayjs(text, "HH:mm:ss");
              return time.isValid()
                ? time.format("HH:mm:ss")
                : "유효하지 않은 시간";
            },
          },
          {
            title: "객실명",
            dataIndex: "room_id",
            key: "room_id",
            filterSearch: true,
            filters: room_id_filter,
            filteredValue: filteredInfo.room_id || null,
            onFilter: (value, record) => record.room_id.includes(value),
            sorter: (a, b) => a.room_id.localeCompare(b.room_id),
            sortOrder:
              sortedInfo.columnKey == "room_id" ? sortedInfo.order : null,
            ellipsis: true,
          },
          // {
          //   title: "상태변경내용",
          //   dataIndex: "roomCondition",
          //   key: "roomCondition",
          //   filterSearch: true,
          //   filters: filteredRoomCondition,
          //   filteredValue: filteredInfo.roomCondition || null,
          //   onFilter: (value, record) => record.roomCondition.includes(value),
          //   sorter: (a, b) => a.roomCondition.localeCompare(b.roomCondition),
          //   sortOrder:
          //     sortedInfo.columnKey === "roomCondition" ? sortedInfo.order : null,
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
    const timestamp = Date.parse(dateString.replace(' ', 'T'));

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
      <h2>객실 상태 변경 이력 조회</h2>

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
            scroll={{ y: "28.8rem", x: "100%" }}
            className="ant-table-respons"
          />
        </div>
      </ConfigProvider>
    </div>
  );
};

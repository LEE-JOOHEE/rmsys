import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import koKR from "antd/lib/locale/ko_KR";
import { roomStateLogApi_roomId } from "../api/api";
import { Button, ConfigProvider, DatePicker, Table, Select } from "antd";
import {
  disabledDateThreeMonthsAgo,
  //disabledTime,
  TimeFormatterSymbol,
  DateFormatterSymbol,
} from "../util";
import { useCode } from "../login/CodeContext";

export const ModalTab4 = ({ rooms }) => {
  const containType = [
    { label: "전체", value: "" },
    /*
    {label: "키", value: ""},
    {label: "통신", value: ""},
    {label: "문", value: ""},
    {label: "설정온도", value: ""},
    {label: "메인전원", value: ""},
    {label: "입실", value: ""},
    {label: "차량호출", value: ""},
    {label: "객실이동", value: ""},
    {label: "입실취소", value: ""},*/
    { label: "전원차단", value: "power_down_request" },
    { label: "청소", value: "clean_order" },
    { label: "외출", value: "outing" },
    { label: "객실클릭", value: "is_interrupt" },
  ];

  // 공통 코드 불러오는 부분
  const { coderead } = useCode();
  const code = coderead();
  const codeRoomType = Object.entries(code.roomType);
  const codeRoomTypeList = codeRoomType.map(([key, value]) => {
    return {
      key: key,
      value: value.display_name,
    };
  });
  const codeStayType = Object.entries(code.stayType);
  const codeStayTypeList = codeStayType.map(([key, value]) => {
    return { key: key, value: value };
  });

  // ===================================================================
  const curDateStr = dayjs().format("YYYY-MM-DD");
  const [startDateTime, setStartDateTime] = useState(dayjs(curDateStr + " 23:59:59").valueOf());
  const [endDateTime, setEndDateTime] = useState(dayjs(curDateStr + " 00:00:00").valueOf());
  const [containsKey, setContainsKey] = useState("");
  //const [roomSalePaymentList, setRoomSalePaymentList] = useState([]);
  const [roomInfoStateLogList, setRoomInfoStateLogList] = useState([]);

  // 달력
  const onChangeDatePicker = (date, dateString) => {
    // 1. date를 Timestamp로 변환
    /*
    if (date) {
      const timestampFromDate = date.valueOf();
      setStartDateTime(timestampFromDate);
       console.log("Timestamp from date:", timestampFromDate);
    }*/
    // 2. dateString을 dayjs로 변환 후 Timestamp로 변환
    if (dateString) {
      setStartDateTime(dayjs(dateString + " 23:59:59").valueOf());
      setEndDateTime(dayjs(dateString + " 00:00:00").valueOf());
      // console.log("Timestamp from dateString:", timestampFromDateString);
    }
  };

  const onChangeContainsKey = (value) => {
    setContainsKey(value);
  };

  // 테이블 설정
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  //console.log("sortedInfo ===> ", sortedInfo);

  // 날짜 필터
  const filteredDate = [
    ...new Set(roomInfoStateLogList.map((item) => item.stateLogDateFormat)),
  ].map((date) => ({
    text: date,
    value: date,
  }));

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
    setPagination({ current: 1, pageSize: 10 });
  };
  // 날짜별 정렬 버튼
  const setStateLogDate = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "stateLogDate",
    });
  };

  // 테이블 컬럼 생성
  const columns = [
    {
      title: "날짜",
      dataIndex: "stateLogDate",
      key: "stateLogDate",
      width: "20%",
      align: "center",
      filterSearch: true,
      filters: filteredDate,
      filteredValue: filteredInfo.stateLogDate || null,
      onFilter: (value, record) => record.stateLogDateFormat.includes(value),
      sorter: (a, b) =>
        a.stateLogDateFormat.localeCompare(b.stateLogDateFormat),
      sortOrder:
        sortedInfo.columnKey === "stateLogDate" ? sortedInfo.order : null,
      ellipsis: true,
      render: (text, record, index) => {
        return <DateFormatterSymbol dateTime={record.stateLogDate} />;
      },
    },
    {
      title: "시간",
      dataIndex: "stateLogTime",
      key: "stateLogTime",
      width: "20%",
      align: "center",
      sorter: (a, b) =>
        a.stateLogTimeFormat.localeCompare(b.stateLogTimeFormat),
      sortOrder:
        sortedInfo.columnKey === "stateLogTime" ? sortedInfo.order : null,
      ellipsis: true,
      render: (text, record, index) => {
        return <TimeFormatterSymbol dateTime={record.stateLogDate} />;
      },
    },
    {
      title: "객실명",
      dataIndex: "name",
      key: "name",
      width: "15%",
      align: "center",
      ellipsis: true,
      render: () => {
        return rooms.no;
      },
    },
    {
      title: "객실유형",
      dataIndex: "type",
      key: "type",
      width: "15%",
      align: "center",
      ellipsis: true,
      render: (_, record) => {
        return (
          <>
            {codeRoomTypeList?.find(
              (roomType) => roomType.key === rooms.value.room_type_id
            )?.value || ""}
          </>
        );
      },
    },
    {
      title: "상태변경내용",
      dataIndex: "state",
      key: "state",
      align: "center",
      ellipsis: true,
      render: (_, record) => {
        //console.log(record.value.changed_datas);
        if (Object.keys(record.value.changed_datas).includes("is_interrupt")) {
          return "객실 클릭";
        } else if (
          Object.keys(record.value.changed_datas).includes("clean_order")
        ) {
          let add_msg = "";
          if (Object.keys(record.value.changed_datas).includes("stay_type")) {
            add_msg =
              record.value.changed_datas.stay_type === null
                ? " (퇴실 -> 공실)"
                : "";
          }
          return (
            (record.value.changed_datas.clean_order ? "청소요청" : "청소완료") +
            add_msg
          );
        } else if (Object.keys(record.value.changed_datas).includes("outing")) {
          return "외출";
        } else if (
          Object.keys(record.value.changed_datas).includes("stay_type")
        ) {
          return (
            codeStayTypeList?.find(
              (code) => code.key === record.value.changed_datas.stay_type
            )?.value || ""
          );
        } else if (
          Object.keys(record.value.changed_datas).includes("power_down_request")
        ) {
          return record.value.changed_datas.power_down_request
            ? "전원강제차단"
            : "";
        } else if (
          Object.keys(record.value.changed_datas).includes("inspect_order")
        ) {
          return record.value.changed_datas.inspect_order ? "점검요청" : "점검완료";
        } else {
          return "변경내용 미설정";
        }
      },
    },
  ];

  // api
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await roomSalePaymentApi(startDateTime);
        const resArray = Object.entries(res.room_payments);
        const roomPaymentArray = resArray.map(([key, value]) => {
          return {
            key: key,
            value: value,
            saleId: value.sale_id,
            roomId: value.room_id,
            roomReserveId: value.room_reserve_id,
            roomTypeId: value.room_type_id,
            paymentDate: value.payment_date,
            paymentDateFormat: dayjs(value.payment_date).format("YYYY-MM-DD"),
            paymentTimeFormat: dayjs(value.payment_date).format("HH:mm:ss"),
          };
        });
        setRoomSalePaymentList(roomPaymentArray);
        //console.log("roomPaymentArray : ", roomPaymentArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [startDateTime, filteredInfo, sortedInfo]);
  */

  // api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await roomStateLogApi_roomId(
          startDateTime,
          endDateTime,
          rooms.key,
          containsKey
        );
        const resArray = Object.entries(res.room_state_logs);
        const roomInfoStateLogArray = resArray.map(([key, value]) => {
          return {
            key: key,
            value: value,
            saleId: value.sale_id,
            roomId: value.room_id,
            roomReserveId: value.room_reserve_id,
            roomTypeId: value.room_type_id,
            stateLogDate: value.registed_time,
            stateLogDateFormat: dayjs(value.registed_time).format("YYYY-MM-DD"),
            stateLogTimeFormat: dayjs(value.registed_time).format("HH:mm:ss"),
          };
        });
        setRoomInfoStateLogList(
          roomInfoStateLogArray.filter(
            (item) =>
              !Object.keys(item.value.changed_datas).includes("is_interrupt") ||
              (Object.keys(item.value.changed_datas).includes("is_interrupt") &&
                item.value.changed_datas.is_interrupt)
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [startDateTime, endDateTime, rooms.key, containsKey, filteredInfo, sortedInfo]);
  console.log("roomInfoStateLogList : ", roomInfoStateLogList);

  return (
    <>
      {/* <h2>이력조회</h2> */}

      <ConfigProvider locale={koKR}>
        <div className="flex-row flex-wrap gap-8 mt-16 mb-8">
        <DatePicker
            //showTime
            onChange={onChangeDatePicker}
            defaultValue={dayjs()}
            //format="YYYY-MM-DD HH:mm:ss"
            format="YYYY-MM-DD"
            style={{ minWidth: "8.75rem" }}
            placement={"bottomLeft"}
            disabledDate={disabledDateThreeMonthsAgo}
            //disabledTime={disabledTime}
          />
          <Select
            placeholder="상태필터"
            options={containType}
            style={{
              width: "100%",
              minWidth: "100px",
              maxWidth: "160px",
              textAlign: "left",
              flex: 1,
            }}
            onChange={onChangeContainsKey}
          ></Select>

          <div className="btn-group ml-auto" style={{ display: "none"}}>
            <Button onClick={setStateLogDate}>날짜별 정렬</Button>
            <Button onClick={clearFilters}>전체 필터초기화</Button>
            <Button onClick={clearAll}>모두 초기화</Button>
          </div>
        </div>

        <div className="table-wrap-antd">
          <Table
            columns={columns}
            dataSource={roomInfoStateLogList}
            onChange={handleChange}
            pagination={pagination}
            rowKey="key"
            scroll={{ y: "23.8rem", x: "520px" }}
            className="ant-table-respons"
          />
        </div>
      </ConfigProvider>
    </>
  );
};

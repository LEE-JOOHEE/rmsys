import React, { useEffect, useState } from "react";
import { roomReserveAllByAccomSearchApi } from "../api/api";
import dayjs from "dayjs";
import {
  Input,
  Select,
  ConfigProvider,
  DatePicker,
  Table,
  Button,
  Modal,
  Tabs,
} from "antd";
import { AlertOutlined } from "@ant-design/icons";
import koKR from "antd/lib/locale/ko_KR";
import { disabledDate, disabledTime } from "../util";
import { useCode } from "../login/CodeContext";
import { ReserveRegistrationModal } from "./ReserveRegistrationModal";

export const ReserveMain = () => {
  const [searchText, setSearchText] = useState("");

  // 공통 코드 불러오는 부분
  const { coderead } = useCode();
  const code = coderead();
  const codeRoom = Object.entries(code.room);
  const codeRoomList = codeRoom.map(([key, value]) => {
    return {
      key: key,
      value: value.display_name,
    };
  });
  const codeRoomType = Object.entries(code.roomType);
  const codeRoomTypeList = codeRoomType.map(([key, value]) => {
    return {
      key: key,
      value: value.display_name,
    };
  });
  const codeState = Object.entries(code.state);
  const codeStateList = codeState.map(([key, value, label]) => {
    return {
      key: key,
      value: key,
      label: value,
    };
  });
  const codeStayType = Object.entries(code.stayType);
  const codeStayTypeList = codeStayType.map(([key, value]) => {
    return {
      key: key,
      value: value,
    };
  });

  const [reveAllList, setReveAllList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await roomReserveAllByAccomSearchApi();
        const resArray = Object.entries(res.room_reserves);
        const reveAllList = resArray.map(([key, value]) => {
          return {
            key: key,
            value: value,
            agent: value.agent,
            internal_reserve_no: value.internal_reserve_no,
            stay_type: value.stay_type,
            state: value.state,
            check_in_sched: value.check_in_sched,
            check_out_sched: value.check_out_sched,
            phone: value.phone,
            room_type_id: value.room_type_id,
            room_id: value.room_id,
            ota_room_name: value.ota_room_name,
            name: value.name,
            fee: value.fee,
            prepaid: value.prepaid,
          };
        });
        //.sort((a, b) => a.no - b.no);
        //console.log(reveAllList);
        setReveAllList(reveAllList);
        setFilteredData(reveAllList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [filteredData, setFilteredData] = useState(reveAllList);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  // 달력
  const onChangeDatePicker = (date, dateString) => {
    const filtered = reveAllList.filter(
      (item) =>
        dayjs(item.check_in_sched).format("YYYY-MM-DD") ===
        dayjs(dateString).format("YYYY-MM-DD")
    );
    setFilteredData(filtered);
  };

  // 결제일자 필터
  const filteredCheckinDate = [
    ...new Set(
      reveAllList.map((item) => dayjs(item.check_in_sched).format("YYYY-MM-DD"))
    ),
  ].map((check_in_sched) => ({
    text: check_in_sched,
    value: check_in_sched,
  }));

  // 날짜별 정렬 버튼
  const setCheckinDate = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "check_in_sched",
    });
  };

  const handleSelectChange = (value) => {
    const filtered = reveAllList.filter((item) => item.state === value);
    setFilteredData(filtered);
  };

  // 검색 input(입력폼)
  const handleSearch = (value) => {
    const filtered = reveAllList.filter(
      (item) =>
        item.key.includes(value) ||
        item.internal_reserve_no.includes(value) ||
        item.name.includes(value)
    );
    setFilteredData(filtered);
    setSearchText(value);
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
    setPagination(pagination);
  };

  // 테이블 컬럼 생성
  const columns = [
    {
      title: "채널",
      dataIndex: "agent",
      key: "agent",
      width: "5%",
      align: "center",
    },
    {
      title: "OTA예약번호",
      dataIndex: "key",
      key: "key",
      width: "10%",
      align: "center",
    },
    {
      title: "예약번호",
      dataIndex: "internal_reserve_no",
      key: "internal_reserve_no",
      width: "5%",
      align: "center",
    },
    {
      title: "입실유형",
      dataIndex: "stay_type",
      key: "stay_type",
      width: "5%",
      align: "center",
      render: (text, record, index) => {
        return (
          codeStayTypeList?.find((state) => state.key === text)?.value || ""
        );
      },
    },
    {
      title: "상태",
      dataIndex: "state",
      key: "state",
      width: "5%",
      align: "center",
      render: (text, record, index) => {
        return codeStateList?.find((state) => state.key === text)?.label || "";
      },
    },
    {
      title: "입실시간",
      dataIndex: "check_in_sched",
      key: "check_in_sched",
      width: "10%",
      align: "center",
      render: (text, record, index) => {
        return dayjs(text).format("YYYY-MM-DD HH:mm:ss");
      },

      filterSearch: true,
      filters: filteredCheckinDate,
      filteredValue: filteredInfo.check_in_sched || null,
      onFilter: (value, record) =>
        dayjs(record.check_in_sched).format("YYYY-MM-DD") === value,
      sorter: (a, b) => a.check_in_sched.localeCompare(b.check_in_sched),
      sortOrder:
        sortedInfo.columnKey === "check_in_sched" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "퇴실시간",
      dataIndex: "check_out_sched",
      key: "check_out_sched",
      width: "10%",
      align: "center",
      render: (text, record, index) => {
        return dayjs(text).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "휴대폰",
      dataIndex: "phone",
      key: "phone",
      width: "10%",
      align: "center",
    },
    {
      title: "객실명",
      dataIndex: "room_id",
      key: "room_id",
      width: "5%",
      align: "center",
      render: (text, record, index) => {
        return (
          codeRoomList?.find((room) => room.key === text)?.value || "미배정"
        );
      },
    },
    {
      title: "객실유형",
      dataIndex: "room_type_id",
      key: "room_type_id",
      width: "5%",
      align: "center",
      render: (text, record, index) => {
        return (
          codeRoomTypeList?.find((roomType) => roomType.key === text)?.value ||
          ""
        );
      },
    },
    {
      title: "상품유형(OTA)",
      dataIndex: "ota_room_name",
      key: "ota_room_name",
      width: "10%",
      align: "center",
    },
    {
      title: "예약자",
      dataIndex: "name",
      key: "name",
      width: "10%",
      align: "center",
    },
    {
      title: "요금미수",
      dataIndex: "fee",
      key: "fee",
      width: "5%",
      align: "center",
      render: (text, record, index) => {
        return text - record.prepaid;
      },
    },
  ];

  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    Modal.confirm({
      title: "저장하시겠습니까?",
      width: "440px",
      icon: (
        <AlertOutlined style={{ transform: "scale(1.3)", color: "#a46bff" }} />
      ),
      content: (
        <span style={{ fontSize: "1rem" }}>
          입실정보/상태정보에서 변경한 모든 내역이 저장됩니다.
        </span>
      ),
      okText: "예",
      cancelText: "아니오",
      centered: true,
      onOk() {
        // if (childComponentRef_tab1.current !== undefined) {
        //   childComponentRef_tab1.current.WillBeUsedInParentComponent();
        // }
        // console.log(childComponentRef_tab2);
        // if (childComponentRef_tab2.current !== undefined) {
        //   childComponentRef_tab2.current.WillBeUsedInParentComponent();
        // }
        setIsModalOpen(false);
      },
      onCancel() {
        // handleSubmit(false);
      },
    });
  };

  return (
    <>
      <div className="p-16 pb-0">
        <h2>예약 관리</h2>

        <ConfigProvider locale={koKR}>
          <div className="flex-row flex-wrap gap-8 mt-16 mb-8">
            <DatePicker
              showTime
              onChange={onChangeDatePicker}
              defaultValue={dayjs()}
              format="YYYY-MM-DD"
              style={{ minWidth: "8.75rem" }}
              placement={"bottomLeft"}
              disabledDate={disabledDate}
              disabledTime={disabledTime}
            />
            {/**
        <div className="btn-group ml-auto">
          <Button onClick={setPaymentDate}>날짜별 정렬</Button>
          <Button onClick={clearFilters}>전체 필터초기화</Button>
          <Button onClick={clearAll}>모두 초기화</Button>
        </div>
          */}
            <Select
              placeholder="예약상태"
              options={codeStateList}
              style={{
                width: "100%",
                minWidth: "100px",
                maxWidth: "160px",
                textAlign: "left",
              }}
              onChange={(key) => handleSelectChange(key)}
            ></Select>

            <div className="flex-row flex-wrap gap-8 ml-auto">
              <Input
                placeholder="예약번호 또는 예약자명으로 검색하세요"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: "18.75rem" }}
              />
              <Button type="primary" htmlType="button" onClick={showModal}>
                예약등록
              </Button>
            </div>
          </div>

          <div className="table-wrap-antd">
            <Table
              columns={columns}
              dataSource={filteredData}
              onChange={handleChange}
              pagination={pagination}
              rowKey="key"
              scroll={{
                y: "28.8rem",
                x: "2400px",
              }}
              className="ant-table-respons"
            />
          </div>
        </ConfigProvider>
      </div>

      <Modal
        title={<h2>예약 등록</h2>}
        open={isModalOpen}
        onOk={handleOk}
        okText="저장"
        onCancel={handleCancel}
        cancelText="닫기"
        width={1000}
        maskClosable={false}
      >
        <ReserveRegistrationModal />
      </Modal>
    </>
  );
  //<h1>예약메뉴의 메인페이지 입니다.</h1>;
};

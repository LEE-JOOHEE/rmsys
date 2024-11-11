import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import koKR from "antd/lib/locale/ko_KR";
import { MileageMemberSearchApi } from "../api/api";
import { Button, Input, ConfigProvider, DatePicker, Table } from "antd";
import { disabledDate, disabledTime } from "../util";


export const MileageMemberInquiry = () => {
  // API 테스트
  const [checkInList, setCheckInList] = useState([]);
  const [columns, setColumns] = useState([]);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 15 });

  const [memberPhoneNum, setMemberPhoneNum] = useState("");
  const [searchPhoneNum, setSearchPhoneNum] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(searchPhoneNum != ""){
          const res = await MileageMemberSearchApi(memberPhoneNum);
        
          const resArray = Object.entries(res.mileage_members);
          const mileageArray = resArray.map(([key, value]) => {
            value.key = key;
            value.mileage_member_id = key;
            value.update_time2 = dayjs(value.update_time).format("YYYY-MM-DD HH:mm:ss");
            
            return value;
          });
          setCheckInList(mileageArray);
          
          // console.log("mileageArray : ", mileageArray);

          let phone_filter = [
            ...new Set(mileageArray.map((item) => item.phone)),
          ].map((phone) => ({
            value: phone,
            text: phone,
          }));

          let name_filter = [
            ...new Set(mileageArray.map((item) => item.name)),
          ].map((name) => ({
            value: name,
            text: name,
          }));

          let point_filter = [
            ...new Set(mileageArray.map((item) => item.point)),
          ].map((point) => ({
            value: point,
            text: point,
          }));

          let update_time2_filter = [
            ...new Set(mileageArray.map((item) => item.update_time2)),
          ].map((update_time2) => ({
            value: update_time2,
            text: update_time2,
          }));

          setColumns([
            {
              title: "전화번호",
              dataIndex: "phone",
              key: "phone",
              filterSearch: true,
              filters: phone_filter,
              filteredValue: filteredInfo.phone || null,
              onFilter: (value, record) => record.phone.toString() == value.toString(),
              sorter: (a, b) => a.phone.localeCompare(b.phone),
              sortOrder: sortedInfo.columnKey == "phone" ? sortedInfo.order : null,
              ellipsis: true,
            },
            {
              title: "이름",
              dataIndex: "name",
              key: "name",
              filterSearch: true,
              filters: name_filter,
              filteredValue: filteredInfo.name || null,
              onFilter: (value, record) => record.name == value,
              sorter: (a, b) => a.name.localeCompare(b.name),
              sortOrder: sortedInfo.columnKey == "name" ? sortedInfo.order : null,
              ellipsis: true,
            },
            {
              title: "포인트",
              dataIndex: "point",
              key: "point",
              filterSearch: true,
              filters: point_filter,
              filteredValue: filteredInfo.point || null,
              onFilter: (value, record) => record.point == value,
              sorter: (a, b) => a.point.localeCompare(b.point),
              sortOrder: sortedInfo.columnKey == "point" ? sortedInfo.order : null,
              ellipsis: true,
            },
            {
              title: "수정",
              dataIndex: "update_time2",
              key: "update_time2",
              filterSearch: true,
              filters: update_time2_filter,
              filteredValue: filteredInfo.update_time2 || null,
              onFilter: (value, record) => record.update_time2 == value,
              sorter: (a, b) => a.update_time2.localeCompare(b.update_time2),
              sortOrder: sortedInfo.columnKey == "update_time2" ? sortedInfo.order : null,
              ellipsis: true,
            },
          ]);
        }
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [searchPhoneNum, filteredInfo, sortedInfo]);

  const handlePhoneNumberChange = (e) => {
    setMemberPhoneNum(e.target.value);
  };

  const lookupPhoneNumber = () => {
    // API 호출 로직
    console.log(`Lookup phone number: ${memberPhoneNum}`);
    setSearchPhoneNum(memberPhoneNum);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      lookupPhoneNumber();
    }
  };

  const handleBlur = () => {
    lookupPhoneNumber();
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
      <h2>마일리지 회원 조회</h2>

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

          <div className="flex-row mb-20">
            <Input 
              onChange={handlePhoneNumberChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder="연락처" />
            
          </div>

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
            scroll={{ y: "28.8rem", x: "2600px" }}
            className="ant-table-respons"
          />
        </div>
      </ConfigProvider>
    </div>
  );
};

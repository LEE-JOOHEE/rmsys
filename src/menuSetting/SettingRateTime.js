import React, { Children, useEffect, useState } from "react";
import dayjs from "dayjs";
import koKR from "antd/lib/locale/ko_KR";
import { Tabs } from "antd";
import { roomTypeInfoOnlyApi } from "../api/api";
import RoomTypeTabCont from "../commonComp/RoomTypeTabCont";
import { useCode } from "../login/CodeContext";

export const SettingRateTime = () => {
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

  // 룸타입 정보 (API 연결)
  // const [roomTypeAllList, setRoomTypeAllList] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await roomTypeAllByAccomSearchApi();
  //       const resArray = Object.entries(res.room_types);
  //       const roomTypeAllArray = resArray.map(([key, value]) => {
  //         return {
  //           key: key,
  //           value: value,
  //           // label: value.display_name,
  //           // description: value.display_name,
  //           // children: <RoomTypeTabCont description={value.display_name} />,
  //         };
  //       });
  //       setRoomTypeAllList(roomTypeAllArray);
  //       // console.log("roomTypeAllArray : ", roomTypeAllArray);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // console.log("codeRoomTypeList : ", codeRoomTypeList);

  // API : 객실 유형 정보를 1개
  const [roomTypeId, setRoomTypeId] = useState(codeRoomTypeList[0].key);
  const [roomTypeInfoOnly, setRoomTypeInfoOnly] = useState({}); //룸타입 정보

  // const [timesPricing, setTimesPricing] = useState([]); //대실 요금제
  // const [daysPricing, setDaysPricing] = useState([]); //숙박 요금제

  // 대실 추가 시간 요금(1시간당)
  const [timePerTimeWeekdayAm, setTimePerTimeWeekdayAm] = useState(0); //평일 오전
  const [timePerTimeWeekdayPm, setTimePerTimeWeekdayPm] = useState(0); //평일 오후
  const [timePerTimeWeekendAm, setTimePerTimeWeekendAm] = useState(0); //주말 오전
  const [timePerTimeWeekendPm, setTimePerTimeWeekendPm] = useState(0); //주말 오후

  // 대실 추가 인원당 요금 (기본 인원 수 초과시)
  const [timePerPersonWeekdayAm, setTimePerPersonWeekdayAm] = useState(0); //평일 오전
  const [timePerPersonWeekdayPm, setTimePerPersonWeekdayPm] = useState(0); //평일 오후
  const [timePerPersonWeekendAm, setTimePerPersonWeekendAm] = useState(0); //주말 오전
  const [timePerPersonWeekendPm, setTimePerPersonWeekendPm] = useState(0); //주말 오후

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await roomTypeInfoOnlyApi(roomTypeId);
        const resArray = Object.entries(res.room_types);

        // 룸타입 정보
        setRoomTypeInfoOnly(resArray[0][1]);

        // 숙박 요금제
        // const daysPricingArr = resArray[0][1].days_pricing.map((item) => item);
        // // setDaysPricing(daysPricingArr);

        // 대실 요금제
        // const timesPricingArr = resArray[0][1].times_pricing.map(
        //   (item) => item
        // );
        // setTimesPricing(timesPricingArr);

        //대실 추가 시간 요금(1시간당) - 평일 오전
        setTimePerTimeWeekdayAm(
          resArray[0][1].times_pricing[0].increment_price_per_time
        );
        //대실 추가 시간 요금(1시간당) - 평일 오후
        setTimePerTimeWeekdayPm(
          resArray[0][1].times_pricing[1].increment_price_per_time
        );
        //대실 추가 시간 요금(1시간당) - 주말 오전
        setTimePerTimeWeekendAm(
          resArray[0][1]?.times_pricing[10]?.increment_price_per_time ?? 0
        );
        //대실 추가 시간 요금(1시간당) - 주말 오후
        setTimePerTimeWeekendPm(
          resArray[0][1]?.times_pricing[11]?.increment_price_per_time ?? 0
        );

        // 대실 추가 인원당 요금 - 평일 오전
        setTimePerPersonWeekdayAm(
          resArray[0][1].times_pricing[0].increment_price_per_person
        );
        // 대실 추가 인원당 요금 - 평일 오후
        setTimePerPersonWeekdayPm(
          resArray[0][1].times_pricing[1].increment_price_per_person
        );
        // 대실 추가 인원당 요금 - 주말 오전
        setTimePerPersonWeekendAm(
          resArray[0][1]?.times_pricing[10]?.increment_price_per_person ?? 0
        );
        // 대실 추가 인원당 요금 - 주말 오후
        setTimePerPersonWeekendPm(
          resArray[0][1]?.times_pricing[11]?.increment_price_per_person ?? 0
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [roomTypeId]);

  // Tab
  const onChangeTab = (key) => {
    setRoomTypeId(key);
    // console.log(key);
  };

  return (
    <div className="pt-16 plr-24 pb-24">
      <h2 className="mb-16">요금 및 시간 설정</h2>
      <Tabs
        type="card"
        className="setting-card-tab w-100"
        defaultActiveKey={
          codeRoomTypeList.length > 0 ? codeRoomTypeList[0].key : "1"
        }
        items={
          codeRoomTypeList?.map((roomType) => {
            // console.log("roomType ==> ", roomType);
            return {
              key: roomType.key,
              label: roomType.value,
              children: (
                <RoomTypeTabCont
                  description={roomType.value}
                  roomTypeInfoOnly={roomTypeInfoOnly}
                  timePerTimeWeekdayAm={timePerTimeWeekdayAm}
                  setTimePerTimeWeekdayAm={setTimePerTimeWeekdayAm}
                  timePerTimeWeekdayPm={timePerTimeWeekdayPm}
                  setTimePerTimeWeekdayPm={setTimePerTimeWeekdayPm}
                  timePerTimeWeekendAm={timePerTimeWeekendAm}
                  setTimePerTimeWeekendAm={setTimePerTimeWeekendAm}
                  timePerTimeWeekendPm={timePerTimeWeekendPm}
                  setTimePerTimeWeekendPm={setTimePerTimeWeekendPm}
                  timePerPersonWeekdayAm={timePerPersonWeekdayAm}
                  setTimePerPersonWeekdayAm={setTimePerPersonWeekdayAm}
                  timePerPersonWeekdayPm={timePerPersonWeekdayPm}
                  setTimePerPersonWeekdayPm={setTimePerPersonWeekdayPm}
                  timePerPersonWeekendAm={timePerPersonWeekendAm}
                  setTimePerPersonWeekendAm={setTimePerPersonWeekendAm}
                  timePerPersonWeekendPm={timePerPersonWeekendPm}
                  setTimePerPersonWeekendPm={setTimePerPersonWeekendPm}
                />
              ),
            };
          })
          // .sort((a, b) => a.label.localeCompare(b.label))
        }
        onChange={onChangeTab}
      />
    </div>
  );
};

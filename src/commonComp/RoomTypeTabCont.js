import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, InputNumber } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import {
  handleInputNumberKeyDown,
  handleInputNumberOnInput,
  formatNumber,
} from "../util";

const RoomTypeTabCont = (props) => {
  // console.log("props ===> ", props);
  const {
    timePerTimeWeekdayAm,
    setTimePerTimeWeekdayAm,
    timePerTimeWeekdayPm,
    setTimePerTimeWeekdayPm,
    timePerTimeWeekendAm,
    setTimePerTimeWeekendAm,
    timePerTimeWeekendPm,
    setTimePerTimeWeekendPm,
    timePerPersonWeekdayAm,
    setTimePerPersonWeekdayAm,
    timePerPersonWeekdayPm,
    setTimePerPersonWeekdayPm,
    timePerPersonWeekendAm,
    setTimePerPersonWeekendAm,
    timePerPersonWeekendPm,
    setTimePerPersonWeekendPm,
  } = props;

  const roomType = props.roomTypeInfoOnly;
  const roomTypeDays = props.roomTypeInfoOnly.days_pricing;
  const roomTypeTimes = props.roomTypeInfoOnly.times_pricing;
  const roomTypeLong = props.roomTypeInfoOnly.long_days_pricing;

  const onChangeInputNumber = (value) => {
    console.log("value", value);
  };
  // 기본 대실 요금
  const onChangeInputNumber1 = (value) => {
    console.log("기본 대실 요금", value);
    setDefaultHoursFee(value);
  };
  // 기본 숙박 요금
  const onChangeInputNumber2 = (value) => {
    console.log("기본 숙박 요금", value);
    setDefaultDaysFee(value);
  };
  // 일일 평일 대실 마감 시작 시간
  const onChangeInputNumber3 = (value) => {
    setDailyWeekdayHoursStayDeadlineStartTime(value);
  };
  // 일일 평일 대실 마감 시간
  const onChangeInputNumber4 = (value) => {
    setDailyWeekdayHoursStayDeadlineTime(value);
  };
  // 일일 주말 대실 마감 시작 시간
  const onChangeInputNumber33 = (value) => {
    setDailyWeekendHoursStayDeadlineStartTime(value);
  };
  // 일일 주말 대실 마감 시간
  const onChangeInputNumber34 = (value) => {
    setDailyWeekendHoursStayDeadlineTime(value);
  };
  // 대실 기본 이용 시간 - 평일 오전
  const onChangeInputNumber5 = (value) => {
    setTimeWeekdayMorning(value);
  };
  // 대실 기본 이용 시간 - 평일 오후
  const onChangeInputNumber6 = (value) => {
    setTimeWeekdayAfternoon(value);
  };
  // 대실 기본 이용 시간 - 주말 오전
  const onChangeInputNumber7 = (value) => {
    setTimeWeekendMorning(value);
  };
  // 대실 기본 이용 시간 - 주말 오후
  const onChangeInputNumber8 = (value) => {
    setTimeWeekendAfternoon(value);
  };
  // 대실 추가 시간 요금(1시간당) - 평일 오전
  const onChangeInputNumber9 = (value) => {
    console.log("평일 오전", value);
    setTimePerTimeWeekdayAm(value);
  };
  // 대실 추가 시간 요금(1시간당) - 평일 오후
  const onChangeInputNumber10 = (value) => {
    console.log("평일 오후", value);
    setTimePerTimeWeekdayPm(value);
  };
  // 대실 추가 시간 요금(1시간당) - 주말 오전
  const onChangeInputNumber11 = (value) => {
    console.log("주말 오전", value);
    setTimePerTimeWeekendAm(value);
  };
  // 대실 추가 시간 요금(1시간당) - 주말 오후
  const onChangeInputNumber12 = (value) => {
    console.log("주말 오후", value);
    setTimePerTimeWeekendPm(value);
  };
  // 대실 추가 인원당 요금 - 평일 오전
  const onChangeInputNumber13 = (value) => {
    console.log("평일 오전", value);
    setTimePerPersonWeekdayAm(value);
  };
  // 대실 추가 인원당 요금 - 평일 오후
  const onChangeInputNumber14 = (value) => {
    console.log("평일 오후", value);
    setTimePerPersonWeekdayPm(value);
  };
  // 대실 추가 인원당 요금 - 주말 오전
  const onChangeInputNumber15 = (value) => {
    console.log("주말 오전", value);
    setTimePerPersonWeekendAm(value);
  };
  // 대실 추가 인원당 요금 - 주말 오후
  const onChangeInputNumber16 = (value) => {
    console.log("주말 오후", value);
    setTimePerPersonWeekendPm(value);
  };
  // 장기 (연박) 요금 설정 - 월화
  const onChangeInputNumber17 = (value) => {
    console.log("월화", value);
    setLongMondayToTuesday(value);
  };
  // 장기 (연박) 요금 설정 - 화수
  const onChangeInputNumber18 = (value) => {
    console.log("화수", value);
    setLongTuesdayToWednesday(value);
  };
  // 장기 (연박) 요금 설정 - 수목
  const onChangeInputNumber19 = (value) => {
    console.log("수목", value);
    setLongWednesdayToThursday(value);
  };
  // 장기 (연박) 요금 설정 - 목금
  const onChangeInputNumber20 = (value) => {
    console.log("목금", value);
    setLongThursdayToFriday(value);
  };
  // 장기 (연박) 요금 설정 - 금토
  const onChangeInputNumber21 = (value) => {
    console.log("금토", value);
    setLongFridayToSaturday(value);
  };
  // 장기 (연박) 요금 설정 - 토일
  const onChangeInputNumber22 = (value) => {
    console.log("토일", value);
    setLongSaturdayToSunday(value);
  };
  // 장기 (연박) 요금 설정 - 일월
  const onChangeInputNumber23 = (value) => {
    console.log("일월", value);
    setLongSundayToMonday(value);
  };
  // 숙박 인원당 추가 요금 설정 - 월화
  const onChangeInputNumber24 = (value) => {
    console.log("월화", value);
    setLongMondayToTuesdayPerson(value);
  };
  // 숙박 인원당 추가 요금 설정 - 화수
  const onChangeInputNumber25 = (value) => {
    console.log("화수", value);
    setLongTuesdayToWednesdayPerson(value);
  };
  // 숙박 인원당 추가 요금 설정 - 수목
  const onChangeInputNumber26 = (value) => {
    console.log("수목", value);
    setLongWednesdayToThursdayPerson(value);
  };
  // 숙박 인원당 추가 요금 설정 - 목금
  const onChangeInputNumber27 = (value) => {
    console.log("목금", value);
    setLongThursdayToFridayPerson(value);
  };
  // 숙박 인원당 추가 요금 설정 - 금토
  const onChangeInputNumber28 = (value) => {
    console.log("금토", value);
    setLongFridayToSaturdayPerson(value);
  };
  // 숙박 인원당 추가 요금 설정 - 토일
  const onChangeInputNumber29 = (value) => {
    console.log("토일", value);
    setLongSaturdayToSundayPerson(value);
  };
  // 숙박 인원당 추가 요금 설정 - 일월
  const onChangeInputNumber30 = (value) => {
    console.log("일월", value);
    setLongSundayToMondayPerson(value);
  };
  // 숙박 기본 퇴실 시간 설정 - 평일 퇴실 시간
  const onChangeInputNumber31 = (value) => {
    console.log("평일 퇴실 시간", value);
    setDaysWeekdayCheckOutTime(value);
  };
  // 숙박 기본 퇴실 시간 설정 - 주말 퇴실 시간
  const onChangeInputNumber32 = (value) => {
    console.log("주말 퇴실 시간", value);
    setDaysWeekendCheckOutTime(value);
  };

  // CheckBox
  const onChangeCheckbox1 = (e) => {
    const value = e.target.checked;
    console.log(`프론트 사용 여부 = ${value}`);
    setLongFrontManager(value);
  };
  const onChangeCheckbox2 = (e) => {
    const value = e.target.checked;
    console.log(`키오스크 사용 여부 = ${value}`);
    setLongUseKiosk(value);
  };

  const [defaultDaysFee, setDefaultDaysFee] = useState(0); //기본 숙박 요금
  const [defaultHoursFee, setDefaultHoursFee] = useState(0); //기본 대실 요금

  // 대실 이용 가능 시간 설정
  const [
    dailyWeekdayHoursStayDeadlineStartTime,
    setDailyWeekdayHoursStayDeadlineStartTime,
  ] = useState("00:00"); //일일 평일 대실 마감 시작 시간
  const [
    dailyWeekdayHoursStayDeadlineTime,
    setDailyWeekdayHoursStayDeadlineTime,
  ] = useState("00:00"); //일일 평일 대실 마감 시간
  const [
    dailyWeekendHoursStayDeadlineStartTime,
    setDailyWeekendHoursStayDeadlineStartTime,
  ] = useState("00:00"); //일일 주말 대실 마감 시작 시간
  const [
    dailyWeekendHoursStayDeadlineTime,
    setDailyWeekendHoursStayDeadlineTime,
  ] = useState("00:00"); //일일 주말 대실 마감 시간

  // 대실 기본 이용 시간 설정
  const [timeWeekdayMorning, setTimeWeekdayMorning] = useState(0); //평일 오전
  const [timeWeekdayAfternoon, setTimeWeekdayAfternoon] = useState(0); //평일 오후
  const [timeWeekendMorning, setTimeWeekendMorning] = useState(0); //주말 오전
  const [timeWeekendAfternoon, setTimeWeekendAfternoon] = useState(0); //주말 오후

  // 숙박 기본 퇴실 시간 설정
  const [daysWeekdayCheckOutTime, setDaysWeekdayCheckOutTime] = useState(0); //평일 퇴실 시간
  const [daysWeekendCheckOutTime, setDaysWeekendCheckOutTime] = useState(0); //주말 퇴실 시간

  // 장기 (연박) 요금 설정
  const [longFrontManager, setLongFrontManager] = useState(
    roomTypeLong?.use_front_manager || false
  ); //프론트 사용 여부
  const [longUseKiosk, setLongUseKiosk] = useState(
    roomTypeLong?.use_kiosk || false
  ); //키오스크 사용 여부
  const [longMondayToTuesday, setLongMondayToTuesday] = useState(); //월-화
  const [longTuesdayToWednesday, setLongTuesdayToWednesday] = useState(); //화-수
  const [longWednesdayToThursday, setLongWednesdayToThursday] = useState(); //수-목
  const [longThursdayToFriday, setLongThursdayToFriday] = useState(); //목-금
  const [longFridayToSaturday, setLongFridayToSaturday] = useState(); //금-토
  const [longSaturdayToSunday, setLongSaturdayToSunday] = useState(); //토-일
  const [longSundayToMonday, setLongSundayToMonday] = useState(); //일-월

  // 숙박 인원당 추가 요금 설정
  const [longMondayToTuesdayPerson, setLongMondayToTuesdayPerson] = useState(); //월-화
  const [longTuesdayToWednesdayPerson, setLongTuesdayToWednesdayPerson] =
    useState(); //화-수
  const [longWednesdayToThursdayPerson, setLongWednesdayToThursdayPerson] =
    useState(); //수-목
  const [longThursdayToFridayPerson, setLongThursdayToFridayPerson] =
    useState(); //목-금
  const [longFridayToSaturdayPerson, setLongFridayToSaturdayPerson] =
    useState(); //금-토
  const [longSaturdayToSundayPerson, setLongSaturdayToSundayPerson] =
    useState(); //토-일
  const [longSundayToMondayPerson, setLongSundayToMondayPerson] = useState(); //일-월

  // string <-> number 타입 변환 함수
  const convert = (timeString) => {
    if (typeof timeString === "number") {
      timeString = `${timeString < 10 ? "0" : ""}${timeString}:00`;
    }
    if (!timeString || typeof timeString !== "string") {
      throw new Error("유효한 시간 문자열이 아닙니다.");
    }
    const [hours, minutes] = timeString.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
      throw new Error("시간 형식이 잘못되었습니다.");
    }
    return hours;
  };

  useEffect(() => {
    // 기본 요금 설정
    setDefaultDaysFee(roomType.default_days_fee);
    setDefaultHoursFee(roomType.default_hours_fee);

    // 대실 이용 가능 시간
    setDailyWeekdayHoursStayDeadlineStartTime(
      convert(roomType.daily_weekday_hours_stay_deadline_start_time || "00:00")
    );
    setDailyWeekdayHoursStayDeadlineTime(
      convert(roomType.daily_weekday_hours_stay_deadline_time || "00:00")
    );
    setDailyWeekendHoursStayDeadlineStartTime(
      convert(roomType.daily_weekend_hours_stay_deadline_start_time || "00:00")
    );
    setDailyWeekendHoursStayDeadlineTime(
      convert(roomType.daily_weekend_hours_stay_deadline_time || "00:00")
    );

    // 대실 기본 이용 시간
    setTimeWeekdayMorning(roomType.hours_stay_weekday_morning_use_hours);
    setTimeWeekdayAfternoon(roomType.hours_stay_weekday_afternoon_use_hours);
    setTimeWeekendMorning(roomType.hours_stay_weekend_morning_use_hours);
    setTimeWeekendAfternoon(roomType.hours_stay_weekend_afternoon_use_hours);

    // 숙박 기본 퇴실 시간 설정
    setDaysWeekdayCheckOutTime(roomType.days_stay_weekday_check_out_time);
    setDaysWeekendCheckOutTime(roomType.days_stay_weekend_check_out_time);

    // 장기 (연박) 요금 설정
    setLongFrontManager(roomTypeLong?.use_front_manager);
    setLongUseKiosk(roomTypeLong?.use_kiosk);
    setLongMondayToTuesday(roomTypeLong?.monday_to_tuesday.price_per_days);
    setLongTuesdayToWednesday(
      roomTypeLong?.tuesday_to_wednesday.price_per_days
    );
    setLongWednesdayToThursday(
      roomTypeLong?.wednesday_to_thursday.price_per_days
    );
    setLongThursdayToFriday(roomTypeLong?.thursday_to_friday.price_per_days);
    setLongFridayToSaturday(roomTypeLong?.friday_to_saturday.price_per_days);
    setLongSaturdayToSunday(roomTypeLong?.saturday_to_sunday.price_per_days);
    setLongSundayToMonday(roomTypeLong?.sunday_to_monday.price_per_days);

    // 숙박 인원당 추가 요금 설정
    setLongMondayToTuesdayPerson(
      roomTypeLong?.monday_to_tuesday.price_per_person
    );
    setLongTuesdayToWednesdayPerson(
      roomTypeLong?.tuesday_to_wednesday.price_per_person
    );
    setLongWednesdayToThursdayPerson(
      roomTypeLong?.wednesday_to_thursday.price_per_person
    );
    setLongThursdayToFridayPerson(
      roomTypeLong?.thursday_to_friday.price_per_person
    );
    setLongFridayToSaturdayPerson(
      roomTypeLong?.friday_to_saturday.price_per_person
    );
    setLongSaturdayToSundayPerson(
      roomTypeLong?.saturday_to_sunday.price_per_person
    );
    setLongSundayToMondayPerson(
      roomTypeLong?.sunday_to_monday.price_per_person
    );
  }, [props]);
  // console.log(props.roomTypeInfoOnly);

  return (
    <>
      <div className="grid-col-12">
        <Card
          title={<h3 className="text-l">기본 사용 시간 설정</h3>}
          className="setting-card narrow grid-span-8"
        >
          <div className="flex-col gap-4">
            <h4 className="text-purple">기본 요금 설정</h4>
            <p className="font-13 text-gray-500 flex-row flex-items-start mb-8">
              <QuestionCircleFilled
                className="mr-4"
                style={{ width: "14px", height: "14px", marginTop: "2px" }}
              />
              세부 요금설정을 하지 않은경우 적용되는 기본 요금 입니다.
            </p>
            <div className="flex-row flex-wrap gap-16">
              <div className="flex-row flex-wrap gap-8">
                <h4>대실 기본 요금</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={1000}
                  value={defaultHoursFee}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber1}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "10rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>숙박 기본 요금</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={1000}
                  value={defaultDaysFee}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber2}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "10rem" }}
                />
              </div>
            </div>
          </div>

          <div className="flex-col gap-4 pt-24">
            <h4 className="text-purple">대실 이용 가능 시간 설정</h4>
            <p className="font-13 text-gray-500 flex-row flex-items-start mb-8">
              <QuestionCircleFilled
                className="mr-4"
                style={{ width: "14px", height: "14px", marginTop: "2px" }}
              />
              대실 이용 시간을 설정합니다. 퇴실시간이 대실 시간을 지날 경우,
              퇴실 시간은 대실 마감시간이 됩니다. <br />
              (예 : 대실 마감시간 - 18시, 체크인 시간 - 15시, 대실 - 4시간
              사용일 경우 퇴실 시간은 19시가 아닌 18시가 됩니다.)
            </p>
            <div className="flex-row flex-wrap gap-16">
              <div className="flex-row flex-wrap gap-8">
                <h4>평일 마감 시간</h4>
                <InputNumber
                  min={0}
                  max={23}
                  value={dailyWeekdayHoursStayDeadlineStartTime}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber3}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "5rem" }}
                />
                ~
                <InputNumber
                  min={0}
                  max={23}
                  value={dailyWeekdayHoursStayDeadlineTime}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber4}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "5rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>주말 마감 시간</h4>
                <InputNumber
                  min={0}
                  max={23}
                  value={dailyWeekendHoursStayDeadlineStartTime}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber33}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "5rem" }}
                />{" "}
                ~
                <InputNumber
                  min={0}
                  max={23}
                  value={dailyWeekendHoursStayDeadlineTime}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber34}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "5rem" }}
                />
              </div>
            </div>
          </div>

          <div className="flex-col gap-4 pt-24">
            <h4 className="text-purple">대실 기본 이용 시간 설정</h4>
            <p className="font-13 text-gray-500 flex-row flex-items-start mb-8">
              <QuestionCircleFilled
                className="mr-4"
                style={{ width: "14px", height: "14px", marginTop: "2px" }}
              />
              기본 요금제의 대실 기본 사용시간을 설정합니다.
            </p>
            <div className="flex-row flex-wrap gap-16">
              <div className="flex-row flex-wrap gap-8">
                <h4>평일 오전</h4>
                <InputNumber
                  min={0}
                  max={23}
                  value={timeWeekdayMorning}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber5}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "5rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>평일 오후</h4>
                <InputNumber
                  min={0}
                  max={23}
                  value={timeWeekdayAfternoon}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber6}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "5rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>주말 오전</h4>
                <InputNumber
                  min={0}
                  max={23}
                  value={timeWeekendMorning}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber7}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "5rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>주말 오후</h4>
                <InputNumber
                  min={0}
                  max={23}
                  value={timeWeekendAfternoon}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber8}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "5rem" }}
                />
              </div>
            </div>
          </div>

          <div className="flex-col gap-4 pt-24">
            <h4 className="text-purple">숙박 기본 퇴실 시간 설정</h4>
            <p className="font-13 text-gray-500 flex-row flex-items-start mb-8">
              <QuestionCircleFilled
                className="mr-4"
                style={{ width: "14px", height: "14px", marginTop: "2px" }}
              />
              기본 숙박 요금제의 퇴실 시간을 설정합니다. 주말 퇴실 시간은 금-토,
              토-일 숙박시 적용됩니다.
            </p>
            <div className="flex-row flex-wrap gap-16">
              <div className="flex-row flex-wrap gap-8">
                <h4>평일 퇴실 시간</h4>
                <InputNumber
                  min={0}
                  max={23}
                  value={daysWeekdayCheckOutTime}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber31}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "5rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>주말 퇴실 시간</h4>
                <InputNumber
                  min={0}
                  max={23}
                  value={daysWeekendCheckOutTime}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber32}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "5rem" }}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card
          title={<h3 className="text-l">기본 요금 설정</h3>}
          className="setting-card narrow grid-span-4"
        >
          <div className="flex-col gap-4">
            <h4 className="text-purple">객실 관리 요금 설정</h4>
            <p className="font-13 text-gray-500 flex-row flex-items-start mb-8">
              <QuestionCircleFilled
                className="mr-4"
                style={{ width: "14px", height: "14px", marginTop: "2px" }}
              />
              해당 요금 설정은 객실관리 프로그램(Eagle)에만 적용되며, 키오스크는
              적용되지 않습니다.
            </p>
            <Button type="primary" htmlType="button">
              설정하기
            </Button>
          </div>

          <div className="flex-col gap-4 pt-24">
            <h4 className="text-purple">키오스크 요금 설정</h4>
            <p className="font-13 text-gray-500 flex-row flex-items-start mb-8">
              <QuestionCircleFilled
                className="mr-4"
                style={{ width: "14px", height: "14px", marginTop: "2px" }}
              />
              해당 요금 설정은 키오스크에만 적용되며, 객실관리
              프로그램(Eagle)에는 적용되지 않습니다. 또한, 지정되지 않은
              시간대에선 객실을 판매하지 않습니다.
            </p>
            <Button type="primary" htmlType="button">
              설정하기
            </Button>
          </div>
        </Card>

        <Card
          title={<h3 className="text-l">추가 요금 설정</h3>}
          className="setting-card narrow grid-span-8"
        >
          <div className="flex-col gap-4">
            <h4 className="text-purple">대실 추가 시간 요금 (1시간당)</h4>
            <p className="font-13 text-gray-500 flex-row flex-items-start mb-8">
              <QuestionCircleFilled
                className="mr-4"
                style={{ width: "14px", height: "14px", marginTop: "2px" }}
              />
              심플, 요금제 설정의 대실 사용기간을 설정합니다. 퇴실시간이 대실
              마감시간을 지날 경우, 퇴실 시간은 대실 마감시간이 됩니다. <br />
              (예 : 대실 마감시간 - 18시, 체크인 시간 - 15시, 대실 - 4시간
              사용일 경우 퇴실 시간은 19시가 아닌 18시가 됩니다.)
            </p>
            <div className="flex-row flex-wrap gap-16">
              <div className="flex-row flex-wrap gap-8">
                <h4>평일 오전</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={1000}
                  value={timePerTimeWeekdayAm}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber9}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>평일 오후</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={1000}
                  value={timePerTimeWeekdayPm}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber10}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>주말 오전</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={1000}
                  value={timePerTimeWeekendAm}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber11}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>주말 오후</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={1000}
                  value={timePerTimeWeekendPm}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber12}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
            </div>
          </div>

          <div className="flex-col gap-4 pt-24">
            <h4 className="text-purple">
              대실 추가 인원당 요금 (기본 인원 수 초과시)
            </h4>
            <p className="font-13 text-gray-500 flex-row flex-items-start mb-8">
              <QuestionCircleFilled
                className="mr-4"
                style={{ width: "14px", height: "14px", marginTop: "2px" }}
              />
              대실의 추가 인원당 추가 요금을 부과합니다. 기본 인원수를 초과시
              부과되며, 최대 인원수를 초과할 수 없습니다.
            </p>
            <div className="flex-row flex-wrap gap-16">
              <div className="flex-row flex-wrap gap-8">
                <h4>평일 오전</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={1000}
                  value={timePerPersonWeekdayAm}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber13}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>평일 오후</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={1000}
                  value={timePerPersonWeekdayPm}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber14}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>주말 오전</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={1000}
                  value={timePerPersonWeekendAm}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber15}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>주말 오후</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={1000}
                  value={timePerPersonWeekendPm}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber16}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
            </div>
          </div>

          <div className="flex-col gap-4 pt-24">
            <h4 className="text-purple">장기 (연박) 요금 설정</h4>
            <p className="font-13 text-gray-500 flex-row flex-items-start mb-8">
              <QuestionCircleFilled
                className="mr-4"
                style={{ width: "14px", height: "14px", marginTop: "2px" }}
              />
              첫 1박은 숙박 요금제가 적용되며, 이후 2박부터 장기(연박) 요금제가
              적용됩니다.
            </p>
            <div className="flex-row flex-wrap gap-8 mb-8">
              <Checkbox checked={longFrontManager} onChange={onChangeCheckbox1}>
                프론트 사용 여부
              </Checkbox>
              <Checkbox
                checked={longUseKiosk}
                value={roomTypeLong?.use_kiosk}
                onChange={onChangeCheckbox2}
              >
                키오스크 사용 여부
              </Checkbox>
            </div>
            <div className="flex-row flex-wrap gap-16">
              <div className="flex-row flex-wrap gap-8">
                <h4>월-화</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={5000}
                  value={longMondayToTuesday}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber17}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>화-수</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={5000}
                  value={longTuesdayToWednesday}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber18}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>수-목</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={5000}
                  value={longWednesdayToThursday}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber19}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>목-금</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={5000}
                  value={longThursdayToFriday}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber20}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>금-토</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={5000}
                  value={longFridayToSaturday}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber21}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>토-일</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={5000}
                  value={longSaturdayToSunday}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber22}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>일-월</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={5000}
                  value={longSundayToMonday}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber23}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
            </div>
          </div>

          <div className="flex-col gap-4 pt-24">
            <h4 className="text-purple">숙박 인원당 추가 요금 설정</h4>
            <p className="font-13 text-gray-500 flex-row flex-items-start mb-8">
              <QuestionCircleFilled
                className="mr-4"
                style={{ width: "14px", height: "14px", marginTop: "2px" }}
              />
              숙박 및 장기(연박) 요금제에 적용되며, 투숙일수 *추가인원*
              추가요금으로 계산됩니다.
            </p>
            <div className="flex-row flex-wrap gap-16">
              <div className="flex-row flex-wrap gap-8">
                <h4>월-화</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={1000}
                  value={longMondayToTuesdayPerson}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber24}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>화-수</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={1000}
                  value={longTuesdayToWednesdayPerson}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber25}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>수-목</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={1000}
                  value={longWednesdayToThursdayPerson}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber26}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>목-금</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={1000}
                  value={longThursdayToFridayPerson}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber27}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>금-토</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={1000}
                  value={longFridayToSaturdayPerson}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber28}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>토-일</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={1000}
                  value={longSaturdayToSundayPerson}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber29}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
              <div className="flex-row flex-wrap gap-8">
                <h4>일-월</h4>
                <InputNumber
                  min={0}
                  max={9999999999}
                  step={1000}
                  value={longSundayToMondayPerson}
                  formatter={formatNumber}
                  onChange={onChangeInputNumber30}
                  onKeyDown={handleInputNumberKeyDown}
                  onInput={handleInputNumberOnInput}
                  style={{ maxWidth: "11rem" }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default RoomTypeTabCont;

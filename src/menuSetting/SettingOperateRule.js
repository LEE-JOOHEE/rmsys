import { Card, Radio, Checkbox, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { accomIdApi } from "../api/api";
import {
  handleInputNumberKeyDown,
  handleInputNumberOnInput,
  formatNumber,
} from "../util";

export const SettingOperateRule = () => {
  // 업소 정보 (API 연결)
  const [acoomList, setAcoomList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await accomIdApi();
        const resArray = Object.entries(res.accoms);
        const acoomAllArray = resArray.map(([key, value]) => {
          return {
            key: key,
            value: value,
            //고객키 제거시 운영 규칙
            guestKeyRemovedHours:
              value.on_guest_key_removed.check_out.if_stay_type_is_hours,
            guestKeyRemovedLongDays:
              value.on_guest_key_removed.check_out.if_stay_type_is_long_days,
            guestKeyRemovedDays:
              value.on_guest_key_removed.check_out.if_stay_type_is_days,
            guestKeyRemovedCheckOutTime:
              value.on_guest_key_removed.check_out.if_expired_check_out_time,
            // 고객키 삽입시 운영 규칙
            guestKeyInsertedHours:
              value.on_guest_key_inserted.check_in.if_hours_stay_sched,
            guestKeyInsertedDays:
              value.on_guest_key_inserted.check_in.if_days_stay_sched,
            // 퇴실시 운영 규칙
            checkOutCleanOrder: value.on_check_out.clean_order,
            checkOutPowerDown:
              value.on_check_out.power_down.if_guest_key_inserted_after_minutes,
            // 청소키 제거시 운영 규칙
            cleanKeyRemovedInspect: value.on_clean_key_removed.inspect_order, //(사용안함, 항상점검대기, 퇴실상태에서만 점검대기)
            cleanKeyRemovedRequest:
              value.on_clean_key_removed.request_state_clear, //(항상 공실처리)
            // 매출 정산 규칙
            dailySaleDeadlineTime: value.daily_sale_deadline_time,
            roomSaleSaveDays: value.room_sale_save_days,
            defaultPaymentType: value.default_payment_type,
            // 키오스크 예약입실 가능 시간
            reserveConfigMinutes:
              value.reserve_config.can_check_in_begin_minutes,
            // 객실관리 옵션
            chbLedFlexibleMode: value.chb_led_flexible_mode,
            unuseEmeCall: value.unuse_eme_call,
            unuseCarCall: value.unuse_car_call,
            // 마일리지
            cashMileageRate: value.mileage_config.cash_mileage_rate,
            cardMileageRate: value.mileage_config.card_mileage_rate,
            otaMileageRate: value.mileage_config.ota_mileage_rate,
          };
        });
        setAcoomList(acoomAllArray);
        console.log("acoomAllArray : ", acoomAllArray);

        //고객키 제거시 운영 규칙
        setGuestKeyRemovedHours(acoomAllArray[0].guestKeyRemovedHours);
        setGuestKeyRemovedLongDays(acoomAllArray[0].guestKeyRemovedLongDays);
        setGuestKeyRemovedDays(acoomAllArray[0].guestKeyRemovedDays);
        setGuestKeyRemovedCheckOutTime(
          acoomAllArray[0].guestKeyRemovedCheckOutTime
        );
        // 고객키 삽입시 운영 규칙
        setGuestKeyInsertedHours(acoomAllArray[0].guestKeyInsertedHours);
        setGuestKeyInsertedDays(acoomAllArray[0].guestKeyInsertedDays);
        // 퇴실시 운영 규칙
        setCheckOutCleanOrder(acoomAllArray[0].checkOutCleanOrder);
        setCheckOutPowerDown(acoomAllArray[0].checkOutPowerDown);
        // 청소키 제거시 운영 규칙
        setCleanKeyRemovedInspect(acoomAllArray[0].cleanKeyRemovedInspect);
        setCleanKeyRemovedRequest(acoomAllArray[0].cleanKeyRemovedRequest);
        // 매출 정산 규칙
        setDailySaleDeadlineTime(
          convert(acoomAllArray[0].dailySaleDeadlineTime) || "00:00"
        );
        setRoomSaleSaveDays(acoomAllArray[0].roomSaleSaveDays);
        setDefaultPaymentType(acoomAllArray[0].defaultPaymentType);
        // 키오스크 예약입실 가능 시간
        setReserveConfigMinutes(acoomAllArray[0].reserveConfigMinutes);
        // 객실관리 옵션
        setChbLedFlexibleMode(acoomAllArray[0].chbLedFlexibleMode);
        setUnuseEmeCall(acoomAllArray[0].unuseEmeCall);
        setUnuseCarCall(acoomAllArray[0].unuseCarCall);
        // 마일리지
        setCashMileageRate(acoomAllArray[0].cashMileageRate);
        setCardMileageRate(acoomAllArray[0].cardMileageRate);
        setOtaMileageRate(acoomAllArray[0].otaMileageRate);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //고객키 제거시 운영 규칙
  const [guestKeyRemovedHours, setGuestKeyRemovedHours] = useState(false);
  const [guestKeyRemovedLongDays, setGuestKeyRemovedLongDays] = useState(false);
  const [guestKeyRemovedDays, setGuestKeyRemovedDays] = useState(false);
  const [guestKeyRemovedCheckOutTime, setGuestKeyRemovedCheckOutTime] =
    useState(false);
  // 고객키 삽입시 운영 규칙
  const [guestKeyInsertedHours, setGuestKeyInsertedHours] = useState(false);
  const [guestKeyInsertedDays, setGuestKeyInsertedDays] = useState(false);
  // 퇴실시 운영 규칙
  const [checkOutCleanOrder, setCheckOutCleanOrder] = useState(false);
  const [checkOutPowerDown, setCheckOutPowerDown] = useState(0);
  // 청소키 제거시 운영 규칙
  const [cleanKeyRemovedInspect, setCleanKeyRemovedInspect] = useState(null);
  const [cleanKeyRemovedRequest, setCleanKeyRemovedRequest] = useState(null);
  // 매출 정산 규칙
  const [dailySaleDeadlineTime, setDailySaleDeadlineTime] = useState("");
  const [roomSaleSaveDays, setRoomSaleSaveDays] = useState(0);
  const [defaultPaymentType, setDefaultPaymentType] = useState("");
  // 키오스크 예약입실 가능 시간
  const [reserveConfigMinutes, setReserveConfigMinutes] = useState(0);
  // 객실관리 옵션
  const [chbLedFlexibleMode, setChbLedFlexibleMode] = useState(false);
  const [unuseEmeCall, setUnuseEmeCall] = useState(false);
  const [unuseCarCall, setUnuseCarCall] = useState(false);
  // 마일리지
  const [cashMileageRate, setCashMileageRate] = useState(0);
  const [cardMileageRate, setCardMileageRate] = useState(0);
  const [otaMileageRate, setOtaMileageRate] = useState(0);

  // 고객키 제거시 운영 규칙 : radio
  const onChangeRadio1Hours = (e) => {
    console.log("radio-1-Hours", e.target.value);
    setGuestKeyRemovedHours(e.target.value === "true");
  };
  const onChangeRadio1LongDays = (e) => {
    console.log("radio-1-LongDays", e.target.value);
    setGuestKeyRemovedLongDays(e.target.value === "true");
  };
  const onChangeRadio1Days = (e) => {
    console.log("radio-1-Days", e.target.value);
    setGuestKeyRemovedDays(e.target.value === "true");
  };
  // 청소키 제거시 운영 규칙 : radio
  const onChangeRadio2Inspect = (e) => {
    console.log("radio-2-Inspect", e.target.value);
    setCleanKeyRemovedInspect(e.target.value);
  };
  const onChangeRadio2Request = (e) => {
    console.log("radio-2-Request", e.target.value);
    setCleanKeyRemovedRequest(e.target.value);
  };
  // 매출 정산 규칙 : radio
  const onChangeRadio3PaymentType = (e) => {
    console.log("radio-3-PaymentType", e.target.value);
    setDefaultPaymentType(e.target.value);
  };

  // 고객키 제거시 운영 규칙 : checkbox
  const onChangeCheckbox1 = (e) => {
    console.log(`checked-1 = ${e.target.checked}`);
    setGuestKeyRemovedCheckOutTime(e.target.checked);
  };
  // 고객키 삽입시 운영 규칙 : checkbox
  const onChangeCheckbox2Hours = (e) => {
    console.log(`checked-2-Hours = ${e.target.checked}`);
    setGuestKeyInsertedHours(e.target.checked);
  };
  const onChangeCheckbox2Days = (e) => {
    console.log(`checked-2-Days = ${e.target.checked}`);
    setGuestKeyInsertedDays(e.target.checked);
  };
  // 퇴실시 운영 규칙 : checkbox
  const onChangeCheckbox3CleanOrder = (e) => {
    console.log(`checked-3-CleanOrder = ${e.target.checked}`);
    setCheckOutCleanOrder(e.target.checked);
  };
  const onChangeCheckbox3PowerDown = (e) => {
    console.log(`checked-3-PowerDown = ${e.target.checked}`);
    setCheckOutPowerDown(e.target.checked ? 0 : 1); // 0 = true, 1 = false (?)
  };
  // 객실관리 옵션 : checkbox
  const onChangeCheckbox4ChbLedMode = (e) => {
    console.log(`checked-4-ChbLedMode = ${e.target.checked}`);
    setChbLedFlexibleMode(e.target.checked);
  };
  const onChangeCheckbox4EmeCall = (e) => {
    console.log(`checked-4-EmeCall = ${e.target.checked}`);
    setUnuseEmeCall(e.target.checked);
  };
  const onChangeCheckbox4CarCall = (e) => {
    console.log(`checked-4-CarCall = ${e.target.checked}`);
    setUnuseCarCall(e.target.checked);
  };

  // 일일 매출 마감 시간 : InputNumber
  const onChangeInputNumber1 = (value) => {
    setDailySaleDeadlineTime(value);
  };
  // 매출 저장 일 수 : InputNumber
  const onChangeInputNumber2 = (value) => {
    setRoomSaleSaveDays(value);
  };
  // 키오스크 예약 입실 가능 시간 (시간 : 데이터없음x) : InputNumber
  const onChangeInputNumberHour = (value) => {
    // setReserveConfigHour(value);
  };
  // 키오스크 예약 입실 가능 시간 (분) : InputNumber
  const onChangeInputNumberMinutes = (value) => {
    setReserveConfigMinutes(value);
  };
  // 마일리지 : InputNumber
  const onChangeInputNumberMileageCash = (value) => {
    console.log("Cash", value);
    setCashMileageRate(value);
  };
  const onChangeInputNumberMileageCard = (value) => {
    console.log("Card", value);
    setCardMileageRate(value);
  };
  const onChangeInputNumberMileageOta = (value) => {
    console.log("Ota", value);
    setOtaMileageRate(value);
  };
  // 임시 : : InputNumber
  const onChangeInputNumber = (value) => {
    console.log("changed", value);
  };

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

  return (
    <div className="pt-16 plr-24 pb-24">
      <h2 className="mb-16">운영 규칙 설정</h2>

      <div className="grid-col-2">
        <Card
          title={<h3 className="text-l">고객키 제거시 운영 규칙</h3>}
          actions={[
            <Checkbox
              checked={guestKeyRemovedCheckOutTime}
              onChange={onChangeCheckbox1}
            >
              퇴실 예정 시간을 초과한 경우에만 퇴실 처리 (그 외는 외출처리)
            </Checkbox>,
          ]}
          className="setting-card"
        >
          <div className="flex-col gap-4 text-l">
            <div className="flex-row gap-8 flex-wrap">
              <h4 className="mr-16">대실 입실중인 경우</h4>
              <Radio.Group
                onChange={onChangeRadio1Hours}
                value={guestKeyRemovedHours.toString()}
              >
                <Radio value={false.toString()}>외출</Radio>
                <Radio value={true.toString()}>퇴실</Radio>
              </Radio.Group>
            </div>

            <div className="flex-row gap-8 flex-wrap">
              <h4 className="mr-16">장기 입실중인 경우</h4>
              <Radio.Group
                onChange={onChangeRadio1LongDays}
                value={guestKeyRemovedLongDays.toString()}
              >
                <Radio value={false.toString()}>외출</Radio>
                <Radio value={true.toString()}>퇴실</Radio>
              </Radio.Group>
            </div>

            <div className="flex-row gap-8 flex-wrap">
              <h4 className="mr-16">숙박 입실중인 경우</h4>
              <Radio.Group
                onChange={onChangeRadio1Days}
                value={guestKeyRemovedDays.toString()}
              >
                <Radio value={false.toString()}>외출</Radio>
                <Radio value={true.toString()}>퇴실</Radio>
              </Radio.Group>
            </div>
          </div>
        </Card>

        <Card
          title={<h3 className="text-l">고객키 삽입시 운영 규칙</h3>}
          className="setting-card"
        >
          <div className="flex-col gap-8">
            <Checkbox
              checked={guestKeyInsertedHours}
              onChange={onChangeCheckbox2Hours}
            >
              대실 시간일 경우 자동 대실
            </Checkbox>
            <Checkbox
              checked={guestKeyInsertedDays}
              onChange={onChangeCheckbox2Days}
            >
              숙박 시간일 경우 자동 숙박
            </Checkbox>
          </div>
        </Card>

        <Card
          title={<h3 className="text-l">퇴실시 운영 규칙</h3>}
          className="setting-card"
        >
          <Checkbox
            checked={checkOutCleanOrder}
            onChange={onChangeCheckbox3CleanOrder}
          >
            퇴실시 청소 요청
          </Checkbox>
          <Checkbox
            checked={checkOutPowerDown === 0}
            onChange={onChangeCheckbox3PowerDown}
          >
            퇴실시 객실 전원 차단
          </Checkbox>
        </Card>

        <Card
          title={<h3 className="text-l">청소키 제거시 운영 규칙</h3>}
          className="setting-card"
        >
          <Radio.Group
            onChange={onChangeRadio2Inspect}
            value={cleanKeyRemovedInspect}
          >
            <Radio value={"USE_IF_NOT_USED"}>사용안함</Radio>
            <Radio value={"ALWAYS_REQUEST"}>항상 점검요청</Radio>
            <Radio value={"USE_IF_CHECK_OUT"}>퇴실 상태에서만 점검대기</Radio>
            <Radio value={"ALWAYS_VACANT"}>항상 퇴실처리</Radio>
          </Radio.Group>
          <div className="text-c">
            <p className="font-12-500">
              현재 선택된 점검 상태 (사용안함, 항상점검대기, 퇴실상태에서만
              점검대기): {cleanKeyRemovedInspect}
            </p>
            <p className="font-12-500">
              모르는 데이터 (항상 공실처리): {cleanKeyRemovedRequest}
            </p>
          </div>
        </Card>

        <Card
          title={<h3 className="text-l">매출 정산 규칙</h3>}
          className="setting-card"
        >
          <div className="flex-col gap-10 text-l">
            <div className="flex-row gap-8 flex-wrap">
              <h4 className="mr-8">일일 매출 마감 시간</h4>
              <InputNumber
                min={0}
                max={23}
                value={dailySaleDeadlineTime}
                formatter={formatNumber}
                onChange={onChangeInputNumber1}
                onKeyDown={handleInputNumberKeyDown}
                onInput={handleInputNumberOnInput}
              />
            </div>

            <div className="flex-row gap-8 flex-wrap">
              <h4 className="mr-8">매출 저장 일 수</h4>
              <InputNumber
                min={0}
                max={1830}
                value={roomSaleSaveDays}
                formatter={formatNumber}
                onChange={onChangeInputNumber2}
                onKeyDown={handleInputNumberKeyDown}
                onInput={handleInputNumberOnInput}
              />
            </div>

            <div className="flex-row gap-8 flex-wrap">
              <h4 className="mr-8">기본 결제 방법</h4>
              <Radio.Group
                onChange={onChangeRadio3PaymentType}
                value={defaultPaymentType}
              >
                <Radio value={"NOT_PAYMENT"}>사용안함</Radio>
                <Radio value={"CASH_PAYMENT"}>현금결제</Radio>
                <Radio value={"CARD_PAYMENT"}>카드결제</Radio>
                <Radio value={"OTA_PAYMENT"}>OTA결제</Radio>
              </Radio.Group>
            </div>
          </div>
        </Card>

        <Card
          title={<h3 className="text-l">키오스크 예약 입실 가능 시간</h3>}
          className="setting-card"
        >
          <h4 className="mb-8">체크인 시간</h4>
          <div className="flex-row gap-8 flex-wrap">
            <InputNumber
              min={0}
              max={23}
              // defaultValue={0} // value값이 아직 없음
              formatter={formatNumber}
              onChange={onChangeInputNumber}
              onKeyDown={handleInputNumberKeyDown}
              onInput={handleInputNumberOnInput}
            />
            시간
            <InputNumber
              min={0}
              max={59}
              value={reserveConfigMinutes}
              formatter={formatNumber}
              onChange={onChangeInputNumberMinutes}
              onKeyDown={handleInputNumberKeyDown}
              onInput={handleInputNumberOnInput}
            />
            분 전부터 입실 가능
          </div>
        </Card>

        <Card
          title={<h3 className="text-l">객실관리 옵션</h3>}
          className="setting-card"
        >
          <div className="flex-col gap-8">
            <Checkbox
              checked={chbLedFlexibleMode}
              onChange={onChangeCheckbox4ChbLedMode}
            >
              CHB LED 외출 구분 모드 (씨리얼, 아이크루 객실관리 전용)
            </Checkbox>
            <Checkbox
              onChange={onChangeCheckbox4EmeCall}
              checked={unuseEmeCall}
            >
              비상호출 비활성화
            </Checkbox>
            <Checkbox
              onChange={onChangeCheckbox4CarCall}
              checked={unuseCarCall}
            >
              차량호출 비활성화
            </Checkbox>
          </div>
        </Card>

        <Card
          title={<h3 className="text-l">마일리지</h3>}
          className="setting-card"
        >
          <div className="flex-col gap-10 text-l">
            <div className="flex-row gap-8 flex-wrap">
              <h4 className="mr-8">현금&nbsp; 적립율</h4>
              <InputNumber
                min={0}
                max={99}
                value={cashMileageRate}
                formatter={formatNumber}
                onChange={onChangeInputNumberMileageCash}
                onKeyDown={handleInputNumberKeyDown}
                onInput={handleInputNumberOnInput}
              />
            </div>

            <div className="flex-row gap-8 flex-wrap">
              <h4 className="mr-8">카드&nbsp; 적립율</h4>
              <InputNumber
                min={0}
                max={99}
                value={cardMileageRate}
                formatter={formatNumber}
                onChange={onChangeInputNumberMileageCard}
                onKeyDown={handleInputNumberKeyDown}
                onInput={handleInputNumberOnInput}
              />
            </div>

            <div className="flex-row gap-8 flex-wrap">
              <h4 className="mr-8">OTA 적립율</h4>
              <InputNumber
                min={0}
                max={99}
                value={otaMileageRate}
                formatter={formatNumber}
                onChange={onChangeInputNumberMileageOta}
                onKeyDown={handleInputNumberKeyDown}
                onInput={handleInputNumberOnInput}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

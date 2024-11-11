import {
  Button,
  ConfigProvider,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
} from "antd";
import React, { useState } from "react";
import { useCode } from "../login/CodeContext";
import dayjs from "dayjs";
import koKR from "antd/lib/locale/ko_KR";
import {
  handleInputNumberKeyDown,
  handleInputNumberOnInput,
  formatNumber,
  disabledDate,
  disabledDateThreeMonthsAgo,
  disabledTime,
  DateTimeFormatterSymbol,
} from "../util";
import { CloseOutlined } from "@ant-design/icons";

export const ReserveRegistrationModal = () => {
  // 공통 코드 불러오는 부분
  const { coderead } = useCode();
  const code = coderead();
  const codeRoomType = Object.entries(code.roomType);
  const codeRoomTypeList = codeRoomType.map(([key, value]) => {
    return { key: key, value: value.display_name };
  });
  const codeRoomTypeList_selectbox = codeRoomType.map(([key, value]) => {
    return { value: key, label: value.display_name };
  });
  const codeAgentType = Object.entries(code.agentType);
  const codeAgentTypeList = codeAgentType.map(([key, value]) => {
    return { key: key, value: value };
  });
  const codeAgentTypeList_selectbox = codeAgentType.map(([key, value]) => {
    return { value: key, label: value };
  });
  const codeStayType = Object.entries(code.stayType);
  const codeStayTypeList = codeStayType.map(([key, value]) => {
    return { key: key, value: value };
  });

  // selectbox 검색
  const onSearchSelect = (value) => {
    console.log("search:", value);
  };
  // 대행사 selectbox
  const handleChangeAgency = (value) => {
    console.log("selected : ", value);
  };
  // 객실 유형 selectbox
  const handleChangeType = (value) => {
    console.log("selected : ", value);
  };
  // 객실 배정 selectbox
  const handleChangeRoomHo = (value) => {
    console.log("selected : ", value);
  };

  // datePicker
  const handleChangeDatePicker = (date, dateString) => {
    console.log(date, dateString);
  };

  // 전화번호 : Input
  const handleInputChange_Phones = (e) => {
    // setPhones(e.target.value);
  };

  // 방문 유형 : Radio
  const [value1, setValue1] = useState(1);
  const onChangeRadio1 = (e) => {
    console.log("radio-1 checked", e.target.value);
    setValue1(e.target.value);
  };

  // 판매가 : NumberInput
  const onChangeInputNumber1 = (value) => {
    console.log("판매가", value);
  };

  // 메모 : Input
  const [memo, setMemo] = useState(""); //메모
  const handleInputChange = (e) => {
    setMemo(e.target.value);
  };
  const handleClearInput = () => {
    setMemo("");
  };

  return (
    <>
      <ConfigProvider locale={koKR}>
        <div
          className="resRegModal grid-col-2 p-16"
          style={{ borderTop: "1px solid #efefef" }}
        >
          <div className="flex-row">
            <h3 className="label">투숙 형태 &nbsp;:</h3>
            <div className="btn-group text-l">
              <Radio.Group
                optionType="button"
                buttonStyle="solid"
                className="room-stay-type"
                defaultValue={"DAYS"}
                // onChange={onChangeRadio_stayType}
              >
                <Radio name="stay_type" value={"HOURS"} label={"HOURS"}>
                  대실
                </Radio>
                <Radio name="stay_type" value={"DAYS"} label={"DAYS"}>
                  숙박
                </Radio>
                <Radio name="stay_type" value={"LONG_DAYS"} label={"LONG_DAYS"}>
                  장기
                </Radio>
              </Radio.Group>
            </div>
          </div>

          <div className="flex-row">
            <h3 className="label">
              상<span className="mr-32"></span>태 &nbsp;:
            </h3>
            <div className="flex-row flex-wrap w-full gap-8">
              <h2 className="text-purple text-underline">예약 등록</h2>
              {/* <h2 className="text-purple text-underline">정상 예약</h2> */}
              <Button
                type="primary"
                htmlType="button"
                className="ml-auto"
                ghost
                disabled
              >
                예약 취소
              </Button>
            </div>
          </div>

          <div className="flex-row">
            <h3 className="label">예약 방법 &nbsp;:</h3>
            <Select
              showSearch
              placeholder="선택하세요"
              defaultValue={"프론트"}
              optionFilterProp="label"
              onChange={(value) => handleChangeAgency(value)}
              onSearch={onSearchSelect}
              placement={"bottomLeft"}
              value={codeAgentTypeList_selectbox.value}
              options={codeAgentTypeList_selectbox}
              className="w-full mr-32"
            />
          </div>

          <div className="flex-row">
            <h3 className="label">수정 일시 &nbsp;:</h3>
            <DatePicker
              showTime
              onChange={(value) => handleChangeDatePicker(value)}
              style={{ minWidth: "8.75rem" }}
              className="mr-32 w-full readonly"
              format="YYYY-MM-DD HH:mm:ss"
              defaultValue={dayjs()}
              disabled //비활성이지만 readonly상태 : className에 readonly 추가 필수
              disabledDate={disabledDate}
              onKeyDown={handleInputNumberKeyDown}
              onInput={handleInputNumberOnInput}
              placement={"topLeft"}
            />
          </div>

          <div className="flex-row">
            <h3 className="label">객실 유형 &nbsp;:</h3>
            <Select
              showSearch
              placeholder="선택하세요"
              defaultValue={"VIP"}
              optionFilterProp="label"
              onChange={(value) => handleChangeType(value)}
              onSearch={onSearchSelect}
              placement={"bottomLeft"}
              value={codeRoomTypeList_selectbox.value}
              options={codeRoomTypeList_selectbox}
              className="w-full mr-32"
            />
          </div>

          <div className="flex-row">
            <h3 className="label">객실 배정 &nbsp;:</h3>
            <Select
              showSearch
              placeholder="선택하세요"
              defaultValue={"방호수가져오기"}
              optionFilterProp="label"
              onChange={(value) => handleChangeRoomHo(value)}
              onSearch={onSearchSelect}
              placement={"bottomLeft"}
              // value={codeRoomTypeList_selectbox.value}
              // options={codeRoomTypeList_selectbox}
              className="w-full mr-32"
            />
          </div>

          <div className="flex-row">
            <h4 className="label pt-4 pr-10">입실 예정일 &nbsp;:</h4>
            <DatePicker
              showTime
              onChange={(value) => handleChangeDatePicker(value)}
              style={{ minWidth: "8.75rem" }}
              className="mr-32 w-full"
              format="YYYY-MM-DD HH:mm:ss"
              defaultValue={dayjs()}
              disabledDate={disabledDateThreeMonthsAgo}
              onKeyDown={handleInputNumberKeyDown}
              onInput={handleInputNumberOnInput}
              placement={"topLeft"}
            />
          </div>

          <div className="flex-row">
            <h4 className="label pt-4 pr-10">퇴실 예정일 &nbsp;:</h4>
            <DatePicker
              showTime
              onChange={(value) => handleChangeDatePicker(value)}
              style={{ minWidth: "8.75rem" }}
              className="mr-32 w-full"
              format="YYYY-MM-DD HH:mm:ss"
              defaultValue={dayjs()}
              disabledDate={disabledDateThreeMonthsAgo}
              onKeyDown={handleInputNumberKeyDown}
              onInput={handleInputNumberOnInput}
              placement={"topLeft"}
            />
          </div>

          <div className="flex-row">
            <h4 className="label pt-4 pr-10">휴대폰 번호 &nbsp;:</h4>
            <Input
              placeholder="-없이"
              // value={phones}
              onChange={handleInputChange_Phones}
              className="mr-32"
            />
          </div>

          <div className="flex-row">
            <h3 className="label">예약 번호 &nbsp;:</h3>
            <Input
              placeholder="예약번호"
              // value={phones}
              onChange={handleInputChange_Phones}
              className="mr-32"
            />
          </div>

          <div className="flex-row">
            <h3 className="label mr-10">고&nbsp;객&nbsp;명 &nbsp;:</h3>
            <Input
              placeholder="고객명"
              // value={phones}
              onChange={handleInputChange_Phones}
              className="mr-32"
            />
          </div>

          <div className="flex-row">
            <h3 className="label">방문 유형 &nbsp;:</h3>
            <Radio.Group
              onChange={onChangeRadio1}
              value={value1}
              className="mt-4"
            >
              <Radio value={1}>도보방문</Radio>
              <Radio value={2}>차량방문</Radio>
            </Radio.Group>
          </div>

          <div className="flex-row">
            <h3 className="label mr-10">판&nbsp;매&nbsp;가 &nbsp;:</h3>
            <InputNumber
              min={0}
              max={999999999999}
              step={5000}
              style={{ maxWidth: "10.625rem", minWidth: "7.625rem" }}
              defaultValue={80000}
              // value={}
              formatter={formatNumber}
              onChange={onChangeInputNumber1}
              onKeyDown={handleInputNumberKeyDown}
              onInput={handleInputNumberOnInput}
            />
          </div>

          <div className="flex-row">
            <h3 className="label">OTA 결제 &nbsp;:</h3>
            <InputNumber
              min={0}
              max={999999999999}
              step={5000}
              style={{ maxWidth: "10.625rem", minWidth: "7.625rem" }}
              defaultValue={80000}
              // value={}
              formatter={formatNumber}
              onChange={onChangeInputNumber1}
              onKeyDown={handleInputNumberKeyDown}
              onInput={handleInputNumberOnInput}
            />
          </div>

          <div className="flex-row grid-span-2">
            <h3 className="label">고객메모 &nbsp;:</h3>
            <Input
              maxLength={100}
              count={{
                show: true,
                max: 100,
              }}
              placeholder="최대 100자"
              value={memo}
              onChange={handleInputChange}
            />
            <Button
              type="primary"
              ghost
              htmlType="button"
              className="ml-8"
              style={{ padding: "0 1.125rem" }}
              icon={<CloseOutlined />}
              onClick={handleClearInput}
            ></Button>
          </div>

          {/*  */}
        </div>
      </ConfigProvider>
    </>
  );
};

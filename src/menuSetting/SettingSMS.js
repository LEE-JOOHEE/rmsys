import React, { useState } from "react";
import { Button, Input, InputNumber } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import {
  handleInputNumberKeyDown,
  handleInputNumberOnInput,
  formatNumber,
} from "../util";

const { TextArea } = Input;

export const SettingSMS = () => {
  // InputNumber
  const onChangeInputNumber = (value) => {
    console.log("changed", value);
  };

  // TextArea
  const [valueSMSTextarea, setValueSMSTextarea] = useState("");

  const handleChangeTextarea = (e) => {
    setValueSMSTextarea(e.target.value);
  };

  return (
    <div className="pt-16 plr-24 pb-24" style={{ height: "42.438rem" }}>
      <h2 className="mb-16">예약 문자 설정</h2>

      <div className="mobile-bg"></div>
      <div className="cont-area">
        <div className="flex-row gap-8 flex-wrap pt-16">
          <h4>미리예약 일괄 발송 시간</h4>
          <InputNumber
            min={1}
            max={9999}
            defaultValue={9}
            formatter={formatNumber}
            onChange={onChangeInputNumber}
            onKeyDown={handleInputNumberKeyDown}
            onInput={handleInputNumberOnInput}
          />
          <h4>시 발송</h4>
        </div>

        <p className="font-13 text-gray-500 flex-row flex-items-start mtb-8 text-l">
          <QuestionCircleFilled
            className="mr-8"
            style={{ width: "14px", height: "14px", marginTop: "2px" }}
          />
          당일 예약은 즉시 문자가 발송되며, 미리 예약은 입실 당일, 위에 설정한
          시간대에 일관 발송 됩니다.
        </p>

        <div className="flex-row gap-8 flex-wrap pt-16">
          <h4>문자 하단 사용자 지정 문구</h4>
          <TextArea
            value={valueSMSTextarea}
            onChange={handleChangeTextarea}
            rows={9}
            maxLength={60}
            allowClear
            count={{
              show: true,
              max: 60,
            }}
            style={{ resize: "none", minHeight: "18.75rem" }}
            placeholder="여기에 내용을 입력하세요 (60자 이하)"
          />
        </div>

        <div className="flex-row gap-8 flex-wrap pt-24 pb-16 mt-auto">
          {/* <Button type="defalut" htmlType="button" className="flex-1">
            닫기
          </Button> */}
          <Button type="primary" htmlType="button" className="flex-1">
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};

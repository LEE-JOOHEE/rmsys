import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useCode } from "../login/CodeContext";
import { Button, Input, InputNumber, Modal, Radio, message } from "antd";
import {
  KeyOutlined,
  ClearOutlined,
  BulbOutlined,
  SunOutlined,
  ApiOutlined,
  PoweroffOutlined,
  CloseOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import airConditioner from "../images/icon/air-conditioner.png";
import {
  handleInputNumberKeyDown,
  handleInputNumberOnInput,
  formatNumber,
} from "../util";
import { roomInfoOnlyApi, roomUpdateApi } from "../api/api";

export const ModalTab2 = forwardRef(({ rooms }, ref) => {
  // 변수
  const [roomMap, setRoomMap] = useState({}); //객실 정보 리스트
  const [outing, setOuting] = useState(false); //외출
  const [cleanOrder, setCleanOrder] = useState(false); //청소요청
  const [lightMap, setLightMap] = useState([]); //전등상태
  const [airconPower, setAirconPower] = useState(false); //에어컨전원
  const [mainPower, setMainPower] = useState(false); //메인전원
  const [powerDownReq, setPowerDownReq] = useState(false); //전원강제차단
  const [temp, setTemp] = useState(0); //현재온도
  const [tempSet, setTempSet] = useState(0); //설정온도
  const [tempRequest, setTempRequest] = useState(0); //설정온도제어
  const [tempCleanOrder, setTempCleanOrder] = useState(0); //청소 지시시 온도
  const [tempOuting, setTempOuting] = useState(0); //외출시 온도
  const [tempEmpty, setTempEmpty] = useState(0); //공실시 온도
  const [tempUsing, setTempUsing] = useState(0); //사용중 온도
  const [tempCleaning, setTempCleaning] = useState(0); //청소중 온도
  const [airconPowerRule, setAirconPowerRule] = useState(0); //냉방설정
  const [kioskHoursStop, setKioskHoursStop] = useState(0); //키오스크 대실 강제 판매 중단
  const [kioskDaysStop, setKioskDaysStop] = useState(0); //키오스크 숙박 강제 판매 중단
  const [kioskReveStop, setKioskReveStop] = useState(0); //키오스크 예약 판매 중단
  const [memo, setMemo] = useState(""); //메모

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

  // 데이터 불러오는 부분
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await roomInfoOnlyApi(rooms.key);
        const resMap = Object.entries(res.rooms);

        console.log("roomMap ==>", resMap[0][1]);
        setRoomMap(resMap[0][1]);
        setOuting(resMap[0][1].outing);
        setCleanOrder(resMap[0][1].clean_order);
        setAirconPower(resMap[0][1].aircon_power);
        setMainPower(resMap[0][1].main_power);
        setLightMap(resMap[0][1].lights);
        setPowerDownReq(resMap[0][1].power_down_request);
        setTemp(resMap[0][1].temp);
        setTempSet(resMap[0][1].set_temp);
        setTempRequest(resMap[0][1].request_temp);
        setTempCleanOrder(resMap[0][1].on_clean_order_temp);
        setTempOuting(resMap[0][1].on_outing_temp);
        setTempEmpty(resMap[0][1].on_empty_temp);
        setTempUsing(resMap[0][1].on_using_temp);
        setTempCleaning(resMap[0][1].on_cleaning_temp);
        setAirconPowerRule(resMap[0][1].aircon_power_rule);
        setKioskHoursStop(resMap[0][1].kiosk_hours_sale_stop);
        setKioskDaysStop(resMap[0][1].kiosk_days_sale_stop);
        setKioskReveStop(resMap[0][1].kiosk_reserve_sale_stop);
        setMemo(resMap[0][1].memo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [rooms.key]);

  // form change
  const onClickPowerDownReq = () => {
    setPowerDownReq(!powerDownReq ? true : false);
  };

  const onChangeTemp = (value) => {
    setTemp(value);
  };

  const onChangeTempSet = (value) => {
    setTempSet(value);
  };

  const onChangeTempRequest = (value) => {
    setTempRequest(value);
  };

  const onChangeTempUsing = (value) => {
    setTempUsing(value);
  };

  const onChangeTempOuting = (value) => {
    setTempOuting(value);
  };

  const onChangeTempCleanOrder = (value) => {
    setTempCleanOrder(value);
  };

  const onChangeTempCleaning = (value) => {
    setTempCleaning(value);
  };

  const onChangeTempEmpty = (value) => {
    setTempEmpty(value);
  };

  // radio
  const onChangeAirconPowerRule = (e) => {
    setAirconPowerRule(e.target.value);
  };

  const onClickOuting = () => {
    setOuting(outing ? false : true);
  };

  const onClickCleanOrder = () => {
    setCleanOrder(cleanOrder ? false : true);
  };

  const onClickKioskHoursStop = () => {
    setKioskHoursStop(kioskHoursStop ? false : true);
  };

  const onClickKioskDaysStop = () => {
    setKioskDaysStop(kioskDaysStop ? false : true);
  };

  const onClickKioskReveStop = () => {
    setKioskReveStop(kioskReveStop ? false : true);
  };

  // Input : 객실표시
  const handleInputChange = (e) => {
    setMemo(e.target.value);
  };
  const handleClearInput = () => {
    setMemo("");
  };

  // alert : 4개 카드 토출 가능(버튼)
  const confirm = () => {
    Modal.confirm({
      title: "카드키를 배출하시겠습니까?",
      width: "440px",
      icon: (
        <AlertOutlined style={{ transform: "scale(1.3)", color: "#a46bff" }} />
      ),
      content: (
        <span style={{ fontSize: "1rem" }}>
          키오스크에서 {rooms.value.display_name}호 카드키 한개를 강제로
          배출합니다.
        </span>
      ),
      okText: "예",
      cancelText: "아니오",
      centered: true,
      onOk() {
        handleSubmit(true);
      },
      onCancel() {
        handleSubmit(false);
      },
    });
  };

  const handleSubmit = (isConfirmed) => {
    if (isConfirmed) {
      console.log("확인되었습니다.");
    } else {
      console.log("취소되었습니다.");
    }
  };

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    WillBeUsedInParentComponent,
  }));

  const WillBeUsedInParentComponent = async () => {
    console.log("model tab2 func");

    const param = {
      room_type_id: roomMap.room_type_id,
      memo: memo,
      outing: outing,
      clean_order: cleanOrder,
      kiosk_hours_sale_stop: kioskHoursStop,
      kiosk_days_sale_stop: kioskDaysStop,
      kiosk_reserve_sale_stop: kioskReveStop,
      on_clean_order_temp: tempCleanOrder,
      on_outing_temp: tempOuting,
      on_empty_temp: tempEmpty,
      on_using_temp: tempUsing,
      on_cleaning_temp: tempCleaning,
      aircon_power_rule: airconPowerRule,
      request_temp: tempRequest,
      //aircon_power: null,
      //lights: null,
      //main_power: null,
      power_down_request: powerDownReq,
    };
    console.log(param);

    try {
      const res = await roomUpdateApi(rooms.key, param);
      console.log(res);
      if (rooms.key === Object.entries(res.rooms)[0][0]) {
        message.info("저장되었습니다.");
      } else {
        message.error("저장중 문제가 발생했습니다. 다시 저장해주세요.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-col">
      {/* 객실명 */}
      <div className="flex-row flex-wrap gap-10 mb-16">
        <h3 className="label p-0">객실명 &nbsp;:</h3>
        <h2>{rooms.value.display_name}호 &nbsp;-</h2>
        {codeRoomTypeList?.map((roomType, idx) => {
          if (roomType.key === rooms.value.room_type_id) {
            return (
              <h2 key={`roomType - ${idx}`} className="mr-32">
                {roomType.value}
              </h2>
            );
          }
        })}
        <div className="btn-group">
          <Button
            type="primary"
            htmlType="button"
            shape="round"
            size="large"
            className={
              roomMap.state_summary === "USING"
                ? "btn-cuz"
                : "btn-cuz unActived"
            }
          >
            입실
          </Button>
          <Button
            type="primary"
            htmlType="button"
            shape="round"
            size="large"
            className={outing ? "btn-cuz" : "btn-cuz unActived"}
            onClick={onClickOuting}
          >
            외출
          </Button>
          <Button
            type="primary"
            htmlType="button"
            shape="round"
            size="large"
            className={cleanOrder ? "btn-cuz" : "btn-cuz unActived"}
            onClick={onClickCleanOrder}
          >
            청소요청
          </Button>
          <Button
            type="primary"
            htmlType="button"
            shape="round"
            size="large"
            className={
              roomMap.state_summary === "CLEANING"
                ? "btn-cuz"
                : "btn-cuz unActived"
            }
            disabled
          >
            청소중
          </Button>
          <Button
            type="primary"
            htmlType="button"
            shape="round"
            size="large"
            className={
              roomMap.state_summary === "EMPTY"
                ? "btn-cuz"
                : "btn-cuz unActived"
            }
            disabled
          >
            퇴실
          </Button>
        </div>
      </div>

      {/* 센서상태 */}
      <div className="flex-row flex-wrap gap-16 sec-2 mb-16">
        <div className="flex-row">
          <h3 className="label">센서상태 &nbsp;:</h3>
          <div className="btn-group">
            <Button
              type="primary"
              htmlType="button"
              icon={<KeyOutlined style={{ transform: "scale(1.2)" }} />}
              disabled
            >
              고객키
            </Button>
            <Button
              type="primary"
              htmlType="button"
              icon={<ClearOutlined style={{ transform: "scale(1.1)" }} />}
              disabled
            >
              청소키
            </Button>
          </div>
        </div>

        <div className="flex-row">
          <h3 className="label">문상태 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</h3>
          <div className="btn-group">
            <Button type="primary" htmlType="button" disabled={roomMap.door}>
              문 열림
            </Button>
            <Button type="primary" htmlType="button" disabled={!roomMap.door}>
              문 닫힘
            </Button>
          </div>
        </div>
      </div>

      {/* 전등상태 */}
      <div className="flex-row flex-wrap gap-16 sec-2 mb-16">
        <div className="flex-row">
          <h3 className="label">전등상태 &nbsp;:</h3>
          <div className="btn-group">
            {lightMap.map((light) => {
              return (
                <Button
                  type="primary"
                  htmlType="button"
                  icon={<BulbOutlined style={{ transform: "scale(1.1)" }} />}
                  disabled={!light.on}
                >
                  {light.display_name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 전원상태 */}
      <div className="flex-row flex-wrap gap-16 sec-2 mb-16">
        <div className="flex-row">
          <h3 className="label">전원상태 &nbsp;:</h3>
          <div className="btn-group">
            <Button
              type="primary"
              htmlType="button"
              icon={<img src={airConditioner} alt="에어컨 아이콘" width={24} />}
              className={airconPower ? "" : "unActived"}
              disabled
            >
              에어컨
            </Button>
            <Button
              type="primary"
              htmlType="button"
              icon={<SunOutlined style={{ transform: "scale(1.3)" }} />}
              disabled
            >
              난방밸브
            </Button>
            <Button
              type="primary"
              htmlType="button"
              icon={<ApiOutlined style={{ transform: "scale(1.3)" }} />}
              className={mainPower ? "" : "unActived"}
              disabled
            >
              콘센트
            </Button>
          </div>
        </div>
        <div className="flex-row">
          <h3 className="label">전원제어 &nbsp;:</h3>
          <div className="btn-group">
            <Button
              type="primary"
              htmlType="button"
              icon={<PoweroffOutlined />}
              onClick={onClickPowerDownReq}
              className={powerDownReq ? "" : "unActived"}
            >
              전원 강제 차단
            </Button>
          </div>
        </div>
      </div>

      {/* 현재온도 */}
      <div className="flex-row flex-wrap gap-16 sec-2 mb-16">
        <div className="flex-row">
          <h3 className="label">현재온도 &nbsp;:</h3>
          <InputNumber
            min={0}
            max={100}
            className="mr-8"
            value={temp}
            formatter={formatNumber}
            onChange={onChangeTemp}
            onKeyDown={handleInputNumberKeyDown}
            onInput={handleInputNumberOnInput}
            suffix="℃"
          />
        </div>
        <div className="flex-row">
          <h3 className="label">설정온도(난방) &nbsp;:</h3>
          <InputNumber
            min={0}
            max={100}
            className="mr-8"
            value={tempSet}
            formatter={formatNumber}
            onChange={onChangeTempSet}
            onKeyDown={handleInputNumberKeyDown}
            onInput={handleInputNumberOnInput}
            suffix="℃"
          />
        </div>
        <div className="flex-row">
          <h3 className="label">설정온도제어(난방) &nbsp;:</h3>
          <InputNumber
            min={roomMap.minimum_temp}
            max={roomMap.maximum_temp}
            className="mr-8"
            value={tempRequest}
            formatter={formatNumber}
            onChange={onChangeTempRequest}
            onKeyDown={handleInputNumberKeyDown}
            onInput={handleInputNumberOnInput}
            suffix="℃"
          />
        </div>
      </div>

      {/* 난방설정 */}
      <div className="flex-row flex-wrap gap-16 mb-16">
        <div className="flex-row">
          <h3 className="label">난방설정 &nbsp;:</h3>
          <span className="text-gray-600">사용시</span>
          <InputNumber
            min={0}
            max={100}
            className="mlr-8"
            value={tempUsing}
            formatter={formatNumber}
            onChange={onChangeTempUsing}
            onKeyDown={handleInputNumberKeyDown}
            onInput={handleInputNumberOnInput}
            suffix="℃"
          />
        </div>
        <div className="flex-row text-gray-600">
          외출시
          <InputNumber
            min={0}
            max={100}
            className="mlr-8"
            value={tempOuting}
            formatter={formatNumber}
            onChange={onChangeTempOuting}
            onKeyDown={handleInputNumberKeyDown}
            onInput={handleInputNumberOnInput}
            suffix="℃"
          />
        </div>
        <div className="flex-row text-gray-600">
          청소대기
          <InputNumber
            min={0}
            max={100}
            className="mlr-8"
            value={tempCleanOrder}
            formatter={formatNumber}
            onChange={onChangeTempCleanOrder}
            onKeyDown={handleInputNumberKeyDown}
            onInput={handleInputNumberOnInput}
            suffix="℃"
          />
        </div>
        <div className="flex-row text-gray-600">
          청소중
          <InputNumber
            min={0}
            max={100}
            className="mlr-8"
            value={tempCleaning}
            formatter={formatNumber}
            onChange={onChangeTempCleaning}
            onKeyDown={handleInputNumberKeyDown}
            onInput={handleInputNumberOnInput}
            suffix="℃"
          />
        </div>
        <div className="flex-row text-gray-600">
          퇴실
          <InputNumber
            min={0}
            max={100}
            className="mlr-8"
            value={tempEmpty}
            formatter={formatNumber}
            onChange={onChangeTempEmpty}
            onKeyDown={handleInputNumberKeyDown}
            onInput={handleInputNumberOnInput}
            suffix="℃"
          />
        </div>
      </div>

      {/* 냉방설정 */}
      <div className="flex-row flex-wrap gap-16 mb-16">
        <div className="flex-row">
          <h3 className="label">냉방설정 &nbsp;:</h3>
          <div className="btn-group text-l">
            <Radio.Group
              value={airconPowerRule}
              onChange={onChangeAirconPowerRule}
            >
              <Radio value={"ON_KEY_INSERTED"} label={"키 삽입시 에어컨 ON"}>
                키 삽입시 에어컨 ON
              </Radio>
              <Radio value={"ALWAYS_ON"} label={"에어컨 상시 ON"}>
                에어컨 상시 ON
              </Radio>
              <Radio value={"ALWAYS_OFF"} label={"에어컨 OFF"}>
                에어컨 OFF
              </Radio>
            </Radio.Group>
          </div>
        </div>
      </div>

      {/* 키오스크 */}
      <div className="flex-row flex-wrap gap-16 sec-2 mb-16">
        <div className="flex-row">
          <h3 className="label">키오스크 &nbsp;:</h3>
          <div className="btn-group">
            <Button
              type="primary"
              htmlType="button"
              className={kioskHoursStop ? "" : "unActived"}
              onClick={onClickKioskHoursStop}
            >
              워크인 대실 판매 중단
            </Button>
            <Button
              type="primary"
              htmlType="button"
              className={kioskDaysStop ? "" : "unActived"}
              onClick={onClickKioskDaysStop}
            >
              워크인 숙박 판매 중단
            </Button>
            <Button
              type="primary"
              htmlType="button"
              className={kioskReveStop ? "" : "unActived"}
              onClick={onClickKioskReveStop}
            >
              예약 입실 중단
            </Button>
          </div>
        </div>
        <div className="flex-row">
          <Button
            type="primary"
            htmlType="button"
            className="ml-auto"
            onClick={confirm}
          >
            4개 카드 토출 가능
          </Button>
        </div>
      </div>

      {/* 객실표시 */}
      <div className="flex-row">
        <h3 className="label">객실표시 &nbsp;:</h3>
        <Input
          maxLength={100}
          count={{
            show: true,
            max: 100,
          }}
          placeholder="객실 버튼에 입력한 글자가 표시됩니다. (최대 100자)"
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
    </div>
  );
});

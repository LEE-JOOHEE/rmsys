import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  message,
} from "antd";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import dayjs from "dayjs";
import {
  handleInputNumberKeyDown,
  handleInputNumberOnInput,
  formatNumber,
  disabledDate,
  disabledDateThreeMonthsAgo,
  disabledTime,
} from "../util";
import { useCode } from "../login/CodeContext";
import {
  roomReserveSelectOneApi,
  roomSaleInfoOnlyApi,
  roomSaleUpdateApi,
  roomSaleInsertApi,
  roomTypeInfoOnlyApi,
  roomReserveAllByAccomSearchApi
} from "../api/api";

export const ModalTab1 = forwardRef(({ rooms, stayType, roomReserveAllList }, ref) => {
  // 변수
  const [checkInTime, setCheckInTime] = useState(dayjs());    //체크인타임
  const [checkOutTime, setCheckOutTime] = useState(dayjs());  //체크아웃타임
  const [phones, setPhones] = useState(""); //전화번호
  const [carNo, setCarNo] = useState(""); //차량번호
  const [fee, setFee] = useState(0); //객실요금
  const [change, setChange] = useState(0); //미수금
  const [curStayType, setCurStayType] = useState(stayType === "" ? rooms.value.stay_type : stayType); //투숙형태
  const [memo, setMemo] = useState(""); //메모
  const [inputRows, setInputRows] = useState([]);

  // 공통 코드 불러오는 부분
  const { coderead } = useCode();
  const code = coderead();
  const codeRoomType = Object.entries(code.roomType);
  const codeRoomTypeList = codeRoomType.map(([key, value]) => {
    return { key: key, value: value.display_name };
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

  console.log(rooms);
  console.log("roomReserveId:" + rooms.value.room_reserve_id);
  console.log("roomSaleId:" + rooms.value.room_sale_id);

  /*
    const [reveMap, setReveMap] = useState({});
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await roomReserveSelectOneApi(
            rooms.value.room_reserve_id
          );
          const resMap = Object.entries(res.room_reserves);
          setReveMap(resMap);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);
    */
  // 데이터 불러오는 부분
  const [roomSaleArr, setRoomSaleArr] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await roomSaleInfoOnlyApi(rooms.value.room_sale_id);
        const resArray = Object.entries(res.room_sales);
        setRoomSaleArr(resArray[0][1]);
        console.log(setRoomSaleArr(resArray[0][1]));
        resArray[0][1].payments.map((pay) => {
          if (pay.type !== "") {
            addInput(
              pay.type,
              pay.payment_date,
              pay.account_no,
              pay.accepted_cash,
              pay.changed_cash,
              pay.amount_paid_creadit_card,
              pay.credit_card_no,
              pay.credit_card_accepter_name,
              pay.credit_card_approval_no,
              pay.agent_type,
              pay.amount_paid_agent
            );
          }
        });
        setCheckInTime(resArray[0][1].check_in_time);
        setCheckOutTime(resArray[0][1].check_out_sched_time);
        setPhones((resArray[0][1].phones).join(''));
        setCarNo(resArray[0][1].car_no);
        setMemo(resArray[0][1].memo);
      } catch (error) {
        console.log(error);
      }
    };
    if(rooms.value.room_sale_id !== null){
      fetchData();
    }
  }, [rooms.value.room_sale_id]);

  const [roomTypeMap, setRoomTypeMap] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await roomTypeInfoOnlyApi(rooms.value.room_type_id);
        const resArray = Object.entries(res.room_types);
        setRoomTypeMap(resArray[0][1]);
        console.log("roomTypeMap ==>", resArray[0][1]);

        if(rooms.value.room_sale_id === null){
          if(curStayType === "DAYS"){
            setFee(resArray[0][1].default_days_fee);
          }
          if(curStayType === "HOURS"){
            setFee(resArray[0][1].default_hours_fee);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if(rooms.value.room_type_id !== null){
      fetchData();
    }
  }, [rooms.value.room_type_id]);

  const onChangeInputNumber1 = (value) => {
    console.log("투숙인원", value);
  };

  // 객실요금
  useEffect(() => {
    if (roomSaleArr) {
      setFee(roomSaleArr.fee || 0);
    }
  }, [roomSaleArr]);
  const onChangeInputNumber2 = (value) => {
    setFee(value);
    console.log("객실요금", value);
  };

  const onChangeInputNumber3 = (value) => {
    console.log("선결제액", value);
  };

  // 달력
  const dateFormat = "YYYY-MM-DD";
  const onChangeDatePickerCheckIn = (date, dateString) => {
    setCheckInTime(dayjs(dateString));
  };
  const onChangeDatePickerCheckOut = (date, dateString) => {
    setCheckOutTime(dayjs(dateString));
  };

  // select
  const onChangeSelect1 = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearchSelect1 = (value) => {
    console.log("search:", value);
  };

  // checkbox
  const onChangeCheckBox1 = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  // switch
  const onChangeSwitch1 = (checked) => {
    console.log(`switch to ${checked}`);
  };

  // radio
  const onChangeRadio_stayType = (e) => {
    console.log(`투숙형태:${e.target.value}`);
    setCurStayType(e.target.value);
    
    if(rooms.value.room_sale_id === null){
      if(e.target.value === "DAYS"){
        setFee(roomTypeMap.default_days_fee);
      }
      if(e.target.value === "HOURS"){
        setFee(roomTypeMap.default_hours_fee);
      }
    }
  };

  // Input : 전화번호
  const handleInputChange_Phones = (e) => {
    setPhones(e.target.value);
  };

  // Input : 차량번호
  const handleInputChange = (e) => {
    setCarNo(e.target.value);
  };

  // Input : 객실표시
  const handleInputChange_Memo = (e) => {
    setMemo(e.target.value);
  };

  // 시간 변환 : ex) 2024년 09월 30일 월요일 15시 00분
  const DateTimeFormatter = ({ dateTime }) => {
    const date = new Date(Number(dateTime));
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(
      date
    );

    const part1 = formattedDate.split(". "); // 날짜 분리
    const part2 = part1[3].split(" ").slice(0); // 요일,시간 분리
    const weekDay = part2[0];
    const [time] = part1[3].split(" ").slice(-1);
    const [hour, minute] = time.split(":");

    return `${part1[0]}년 ${part1[1]}월 ${part1[2]}일 ${weekDay} ${hour}시 ${minute}분`;
  };

  // 시간 변환 : ex) 09-30 15:00
  const DateTimeFormatterSimple = ({ dateTime }) => {
    const date = new Date(Number(dateTime));
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(
      date
    );

    const part1 = formattedDate.split(". "); // 날짜 분리
    const [time] = part1[3].split(" ").slice(-1);
    const [hour, minute] = time.split(":");

    return `${part1[1]}-${part1[2]} ${hour}:${minute}`;
  };

  // 예약 - selectBox
  const [selectedRes, setSelectedRes] = useState(null);
  const handleChange2 = (value) => {
    setSelectedRes(value);
    console.log(`selected ${value}`);
  };

  // 동적 입력 행 추가 및 삭제
  const [activeForm, setActiveForm] = useState(null);
  const addInput = (
    type,
    data,
    acct,
    pay_cash,
    changed_cash,
    pay_card,
    cardno,
    card_acct,
    card_apprno,
    agent,
    pay_agent
  ) => {
    setActiveForm(type);
    setInputRows((inputRows) => [
      ...inputRows,
      {
        id: Math.floor(Math.random() * 1000000) + 1,
        type: type,
        payment_date: data,
        account_no: acct,
        accepted_cash: pay_cash,
        changed_cash: changed_cash,
        amount_paid_creadit_card: pay_card,
        credit_card_no: cardno,
        credit_card_accepter_name: card_acct,
        credit_card_approval_no: card_apprno,
        agent_type: agent,
        amount_paid_agent: pay_agent,
      },
    ]);
  };

  const removeInput = (id) => {
    if (inputRows.length > 0) {
      setInputRows(inputRows.filter((input) => input.id !== id));
    }
  };

  // 계좌번호 input
  const handleChangeAccount = (id, account_no) => {
    setInputRows(
      inputRows.map((input) =>
        input.id === id ? { ...input, account_no } : input
      )
    );
  };
  // 신용카드 금액 inputNumber
  const handleChangeAmountPaidCreaditCard = (id, amount_paid_creadit_card) => {
    setInputRows(
      inputRows.map((input) =>
        input.id === id ? { ...input, amount_paid_creadit_card } : input
      )
    );
    //setFee(0);
    inputRows.map((input) => {
      const add =
        input.id === id
          ? input.accepted_cash +
            amount_paid_creadit_card +
            input.amount_paid_agent
          : input.accepted_cash +
            input.amount_paid_creadit_card +
            input.amount_paid_agent;
      //setFee((fee) => fee + add);
    });
  };
  const calcAmount = () => {
    let add = 0;
    inputRows.map((input) => {
      add += input.accepted_cash + input.amount_paid_creadit_card + input.amount_paid_agent;
    });
    console.log(fee);
    console.log(add);
    setChange(fee - add);
  };
  // 받은금액
  const handleChangeAcceptedCash = (id, accepted_cash) => {
    setInputRows(
      inputRows.map((input) =>
        input.id === id ? { ...input, accepted_cash } : input
      )
    );
    console.log("inputRows ==> ",inputRows);
    calcAmount();
    //setFee(0);
    inputRows.map((input) => {
      const add =
        input.id === id
          ? accepted_cash +
            input.amount_paid_creadit_card +
            input.amount_paid_agent
          : input.accepted_cash +
            input.amount_paid_creadit_card +
            input.amount_paid_agent;
      //setFee((fee) => fee + add);
    });
  };
  // 거스름돈
  const handleChangeNotChangedCash = (id, not_changed_cash) => {
    setInputRows(
      inputRows.map((input) =>
        input.id === id ? { ...input, not_changed_cash } : input
      )
    );
  };
  // 대행사 결제금액
  const handleChangeAmountPaidAgent = (id, amount_paid_agent) => {
    setInputRows(
      inputRows.map((input) =>
        input.id === id ? { ...input, amount_paid_agent } : input
      )
    );
    //setFee(0);
    inputRows.map((input) => {
      const add =
        input.id === id
          ? input.accepted_cash +
            input.amount_paid_creadit_card +
            amount_paid_agent
          : input.accepted_cash +
            input.amount_paid_creadit_card +
            input.amount_paid_agent;
      //setFee((fee) => fee + add);
    });
  };
  // 결제일자 datePicker
  const handleChangePayDateValue = (id, date) => {
    const payment_date = date.format("YYYY-MM-DD");
    setInputRows(
      inputRows.map((input) =>
        input.id === id ? { ...input, payment_date } : input
      )
    );
  };
  // 대행사 selectbox
  const handleChangeAgency = (id, agent_type) => {
    setInputRows(
      inputRows.map((input) =>
        input.id === id ? { ...input, agent_type } : input
      )
    );
  };
  // 카드사 selectbox
  const handleChangeCreditCardAccepterName = (
    id,
    credit_card_accepter_name
  ) => {
    setInputRows(
      inputRows.map((input) =>
        input.id === id ? { ...input, credit_card_accepter_name } : input
      )
    );
  };

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    WillBeUsedInParentComponent,
  }));

  const WillBeUsedInParentComponent = async () => {
    if(phones.length < 4){ message.error("전화번호를 확인해주세요."); return false;}

    const param = {
      room_id: rooms.key,
      ignore_power_down: true,
      activate: true,
      room_reserve_id: rooms.value.room_reserve_id,
      check_in_time: dayjs(checkInTime).valueOf(),
      check_out_sched_time: dayjs(checkOutTime).valueOf(),
      person_count: parseInt(document.getElementById("person_count").value),
      alarm: null,
      fee: parseInt(document.getElementById("fee").value.replace(/,/g, "")),
      //"channel_type": "APP",
      //"channel_id": "string",
      stay_type: curStayType,
      car_no: carNo,
      phones : [phones.substring(0,3), phones.substring(3,7) , phones.substring(7,11)],
      note: document.getElementById("note").value,
      payments: inputRows,
    };
    console.log(param);

    try {
      if (rooms.value.room_sale_id !== null) {
        const res = await roomSaleUpdateApi(rooms.value.room_sale_id, param);
        if (rooms.value.room_sale_id === Object.entries(res.room_sales)[0][0]) {
          message.info("저장되었습니다.");
        } else {
          message.error("저장중 문제가 발생했습니다. 다시 저장해주세요.");
        }
      } else {
        const res = await roomSaleInsertApi(param);
        console.log(Object.entries(res.room_sales));
        if (Object.entries(res.room_sales).length > 0) {
          message.info("저장되었습니다.");
        } else {
          message.error("저장중 문제가 발생했습니다. 다시 저장해주세요.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form id="saveFrm" onSubmit={WillBeUsedInParentComponent}>
      <div className="flex-col">
        {/* 객실명 */}
        <div className="flex-row flex-wrap gap-10 mb-16">
          <h3 className="label p-0">객실명 &nbsp;:</h3>
          <h2>{rooms.value.display_name}호 &nbsp;-</h2>
          <h2 className="mr-16">
            {codeRoomTypeList?.find((roomType) => roomType.key === rooms.value.room_type_id)?.value || ""}
          </h2>

          <div className="w-full flex-1">
            {/* <div>room_id : {rooms.key}</div>
            <div>room_type_id : {rooms.value.room_type_id}</div>
            <div>room_sale_id : {rooms.value.room_sale_id}</div>
            <div>room_reserve_id : {rooms.value.room_reserve_id}</div> */}
            <Select
              style={{ width: "100%", minWidth: "17.5rem" }}
              onChange={handleChange2}
              value={selectedRes}
            >
              {/* <Select.Option value={null}>없음</Select.Option>  reveAllList */}
              {roomReserveAllList.map((roomRes, idx) =>
                roomRes.value.room_type_id === rooms.value.room_type_id ? (
                  <Select.Option key={`roomRes-${idx}`}>
                    <div className="flex-row gap-8">
                      <div>
                        [
                        {codeAgentTypeList?.find(
                          (code) => code.key === roomRes.value.agent
                        )?.value || "OTHER"}
                        ]
                      </div>
                      <DateTimeFormatterSimple
                        dateTime={roomRes.value.check_in_sched}
                      />
                      <div>
                        {codeStayTypeList?.find(
                          (code) => code.key === roomRes.value.stay_type
                        )?.value || ""}
                      </div>
                      <div>{roomRes.value.name}</div>
                      <div>{roomRes.value.phone}</div>
                    </div>
                  </Select.Option>
                ) : null
              )}
            </Select>
          </div>
        </div>

        {/* 투숙형태 */}
        <div className="flex-row flex-wrap gap-16 sec-2 mb-16">
          <div className="flex-row">
            <h3 className="label">투숙형태 &nbsp;:</h3>
            <div className="btn-group text-l">
              <Radio.Group
                optionType="button"
                buttonStyle="solid"
                className="room-stay-type"
                defaultValue={curStayType}
                onChange={onChangeRadio_stayType}
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
                <Radio name="stay_type" value={"OTHER"} label={"OTHER"}>
                  기타
                </Radio>
              </Radio.Group>
            </div>
          </div>

          <div className="flex-row">
            <h3 className="label">투숙인원 &nbsp;:</h3>
            <InputNumber
              id="person_count"
              min={1}
              max={20}
              defaultValue={roomSaleArr?.person_count || 2}
              //key={`roomSale-person-count${idx}`}
              formatter={formatNumber}
              onChange={onChangeInputNumber1}
              onKeyDown={handleInputNumberKeyDown}
              onInput={handleInputNumberOnInput}
              style={{ minWidth: "5.625rem" }}
            />
          </div>
        </div>

        {/* 입실시간 */}
        <div className="flex-row flex-wrap gap-16 sec-2 mb-16">
          <div className="flex-row">
            <h3 className="label">입실시간 &nbsp;:</h3>
            {/*
            <DateTimeFormatter
              dateTime={roomSaleArr?.check_in_time || new Date()}
            />
            */}
            <DatePicker
              showTime
              onChange={onChangeDatePickerCheckIn}
              value={dayjs(checkInTime)}
              format="YYYY-MM-DD HH:mm:ss"
              style={{ minWidth: "8.75rem" }}
              placement={"bottomLeft"}
              //disabledDate={disabledDateThreeMonthsAgo}
              //disabledTime={disabledTime}
            />
          </div>
          <div className="flex-row">
            <h3 className="label">전화번호 &nbsp;:</h3>
            <Input
              placeholder="-없이"
              value={phones}
              onChange={handleInputChange_Phones}
            />
          </div>

          {/** 예약쪽 다시보기
           * 
          {roomReserveAllList?.map((roomRes, idx) => {
            if (roomRes.key === rooms.value.room_reserve_id) {
              return (
                <div className="flex-row" key={`roomRes-tel-${idx}`}>
                  <h3 className="label">전화번호 &nbsp;:</h3>
                  <Input placeholder="-없이" value={roomRes.value.phone} />
                </div>
              );
            }
          })}
          */}
        </div>

        {/* 퇴실예정 */}
        <div className="flex-row flex-wrap gap-16 sec-2 mb-16">
          <div className="flex-row">
            <h3 className="label">퇴실예정 &nbsp;:</h3>
            {/*
            <DateTimeFormatter
              dateTime={roomSaleArr?.check_out_sched || new Date()}
            />
            */}
            <DatePicker
              showTime
              onChange={onChangeDatePickerCheckOut}
              value={dayjs(checkOutTime)}
              format="YYYY-MM-DD HH:mm:ss"
              style={{ minWidth: "8.75rem" }}
              placement={"bottomLeft"}
              //disabledDate={disabledDateThreeMonthsAgo}
              //disabledTime={disabledTime}
            />
          </div>
          <div className="flex-row">
            <h3 className="label">차량번호 &nbsp;:</h3>
            <Input
              placeholder="최대 8자"
              value={carNo}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* 객실요금 */}
        <div className="flex-row flex-wrap gap-16 sec-2 mb-16">
          <div className="flex-row">
            <h3 className="label">객실요금 &nbsp;:</h3>
            <InputNumber
              //min={1}
              id="fee"
              max={999999999999}
              step={5000}
              style={{ maxWidth: "10.625rem", minWidth: "7.625rem" }}
              value={fee}
              formatter={formatNumber}
              onChange={onChangeInputNumber2}
              onKeyDown={handleInputNumberKeyDown}
              onInput={handleInputNumberOnInput}
            />
          </div>
          {/* <div className="text-red">{change > 0 ? "미수금 : "+ change : ""}</div> */}
          <div className="btn-group">
            <Button
              type="primary"
              htmlType="button"
              onClick={() =>
                addInput(
                  "ACCOUNT",
                  Date.now(),
                  "",
                  0,
                  0,
                  0,
                  "",
                  "",
                  "",
                  null,
                  0
                )
              }
            >
              계좌추가
            </Button>
            <Button
              type="primary"
              htmlType="button"
              onClick={() =>
                addInput("AGENT", Date.now(), "", 0, 0, 0, "", "", "", null, 0)
              }
            >
              OTA추가
            </Button>
            <Button
              type="primary"
              htmlType="button"
              onClick={() =>
                addInput("CASH", Date.now(), "", 0, 0, 0, "", "", "", null, 0)
              }
            >
              현금추가
            </Button>
            <Button
              type="primary"
              htmlType="button"
              onClick={() =>
                addInput("CARD", Date.now(), "", 0, 0, 0, "", "", "", null, 0)
              }
            >
              카드추가
            </Button>
          </div>
        </div>

        {/* 결제일자 : 결제방식 추가버튼을 눌럿을때 생성됨 */}
        <div
          className="mb-16 payment-wrap"
          style={{ display: inputRows.length === 0 ? "none" : "block" }}
        >
          <div className="flex-col gap-8">
            {inputRows.map((input) => {
              //console.log("input ===> ", input);
              return (
                <div
                  className="flex-row flex-wrap gap-8 hr-b-8 plr-16"
                  key={input.id}
                >
                  {input.type === "ACCOUNT" && (
                    <>
                      <div className="flex-row">
                        <h3 className="label">결제일자 &nbsp;:</h3>
                        <DatePicker
                          onChange={(value) =>
                            handleChangePayDateValue(input.id, value)
                          }
                          style={{ minWidth: "8.75rem" }}
                          className="mr-16"
                          defaultValue={dayjs(input.payment_date)}
                          disabledDate={disabledDate}
                          onKeyDown={handleInputNumberKeyDown}
                          onInput={handleInputNumberOnInput}
                          placement={"topLeft"}
                        />
                      </div>
                      <div className="flex-row">
                        <h3 className="label">이체금액 &nbsp;:</h3>
                        <InputNumber
                          min={0}
                          max={999999999999}
                          step={5000}
                          className="mr-16"
                          style={{
                            maxWidth: "9.625rem",
                            minWidth: "7.625rem",
                          }}
                          defaultValue={input.accepted_cash}
                          formatter={formatNumber}
                          onChange={(value) =>
                            handleChangeAcceptedCash(input.id, value)
                          }
                          onKeyDown={handleInputNumberKeyDown}
                          onInput={handleInputNumberOnInput}
                        />
                      </div>
                      <div className="flex-row">
                        <h3 className="label">계좌번호 &nbsp;:</h3>
                        <Input
                          value={input.value}
                          onChange={(e) =>
                            handleChangeAccount(input.id, e.target.value)
                          }
                          placeholder="입력하세요"
                          className="flex-1"
                        />
                        <Button
                          type="primary"
                          htmlType="button"
                          onClick={() => removeInput(input.id)}
                          className="ml-8"
                          // disabled={inputRows.length <= 0 || !isEnabled}
                        >
                          삭제
                        </Button>
                      </div>
                    </>
                  )}
                  {input.type === "AGENT" && (
                    <>
                      <div className="flex-row">
                        <h3 className="label">결제일자 &nbsp;:</h3>
                        <DatePicker
                          onChange={(value) =>
                            handleChangePayDateValue(input.id, value)
                          }
                          // defaultValue={dayjs()}
                          style={{ minWidth: "8.75rem" }}
                          className="mr-16"
                          defaultValue={dayjs(input.payment_date)}
                          disabledDate={disabledDate}
                          onKeyDown={handleInputNumberKeyDown}
                          onInput={handleInputNumberOnInput}
                          placement={"topLeft"}
                        />
                      </div>
                      <div className="flex-row">
                        <h3 className="label">선결제액 &nbsp;:</h3>
                        <InputNumber
                          min={0}
                          max={999999999999}
                          step={5000}
                          className="mr-16"
                          style={{
                            maxWidth: "9.625rem",
                            minWidth: "7.625rem",
                          }}
                          defaultValue={input.amount_paid_agent}
                          formatter={formatNumber}
                          onChange={(value) =>
                            handleChangeAmountPaidAgent(input.id, value)
                          }
                          onKeyDown={handleInputNumberKeyDown}
                          onInput={handleInputNumberOnInput}
                        />
                      </div>
                      <div className="flex-row">
                        <h3 className="label">
                          대행사 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                        </h3>
                        <Select
                          showSearch
                          placeholder="선택하세요"
                          defaultValue={input.agent_type}
                          optionFilterProp="label"
                          onChange={(value) =>
                            handleChangeAgency(input.id, value)
                          }
                          onSearch={onSearchSelect1}
                          placement={"topLeft"}
                          value={input.agent_type}
                          options={codeAgentTypeList_selectbox}
                        />
                        <Button
                          type="primary"
                          htmlType="button"
                          onClick={() => removeInput(input.id)}
                          className="ml-8"
                          // disabled={inputRows.length <= 0 || !isEnabled}
                        >
                          삭제
                        </Button>
                      </div>
                    </>
                  )}
                  {input.type === "CASH" && (
                    <>
                      <div className="flex-row">
                        <h3 className="label">결제일자 &nbsp;:</h3>
                        <DatePicker
                          onChange={(value) =>
                            handleChangePayDateValue(input.id, value)
                          }
                          // defaultValue={dayjs()}
                          style={{ minWidth: "8.75rem" }}
                          className="mr-16"
                          defaultValue={dayjs(input.payment_date)}
                          disabledDate={disabledDate}
                          onKeyDown={handleInputNumberKeyDown}
                          onInput={handleInputNumberOnInput}
                          placement={"topLeft"}
                        />
                      </div>
                      <div className="flex-row">
                        <h3 className="label">받은현금 &nbsp;:</h3>
                        <InputNumber
                          min={0}
                          max={999999999999}
                          step={5000}
                          className="mr-16"
                          style={{
                            maxWidth: "9.625rem",
                            minWidth: "7.625rem",
                          }}
                          defaultValue={input.accepted_cash}
                          formatter={formatNumber}
                          onChange={(value) =>
                            handleChangeAcceptedCash(input.id, value)
                          }
                          onKeyDown={handleInputNumberKeyDown}
                          onInput={handleInputNumberOnInput}
                        />
                      </div>
                      <div className="flex-row">
                        <h3 className="label">거스름돈 &nbsp;:</h3>
                        <InputNumber
                          min={0}
                          max={999999999999}
                          step={5000}
                          style={{
                            maxWidth: "11.375rem",
                            minWidth: "7.625rem",
                          }}
                          defaultValue={input.not_changed_cash}
                          formatter={formatNumber}
                          onChange={(value) =>
                            handleChangeNotChangedCash(input.id, value)
                          }
                          onKeyDown={handleInputNumberKeyDown}
                          onInput={handleInputNumberOnInput}
                        />
                        <Button
                          type="primary"
                          htmlType="button"
                          onClick={() => removeInput(input.id)}
                          className="ml-8"
                          // disabled={inputRows.length <= 0 || !isEnabled}
                        >
                          삭제
                        </Button>
                      </div>
                    </>
                  )}
                  {input.type === "CARD" && (
                    <>
                      <div className="flex-row">
                        <h3 className="label">결제일자 &nbsp;:</h3>
                        <DatePicker
                          onChange={(value) =>
                            handleChangePayDateValue(input.id, value)
                          }
                          // defaultValue={dayjs()}
                          style={{ minWidth: "8.75rem" }}
                          className="mr-16"
                          defaultValue={dayjs(input.payment_date)}
                          disabledDate={disabledDate}
                          onKeyDown={handleInputNumberKeyDown}
                          onInput={handleInputNumberOnInput}
                          placement={"topLeft"}
                        />
                      </div>
                      <div className="flex-row">
                        <h3 className="label">결제금액 &nbsp;:</h3>
                        <InputNumber
                          min={0}
                          max={999999999999}
                          step={5000}
                          className="mr-16"
                          style={{
                            maxWidth: "9.625rem",
                            minWidth: "7.625rem",
                          }}
                          defaultValue={input.amount_paid_creadit_card}
                          formatter={formatNumber}
                          onChange={(value) =>
                            handleChangeAmountPaidCreaditCard(input.id, value)
                          }
                          onKeyDown={handleInputNumberKeyDown}
                          onInput={handleInputNumberOnInput}
                        />
                      </div>
                      <div className="flex-row">
                        <h3 className="label">
                          카드사 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                        </h3>
                        <Select
                          showSearch
                          placeholder="선택하세요"
                          className="mr-16"
                          defaultValue={input.credit_card_accepter_name}
                          optionFilterProp="label"
                          onChange={(value) =>
                            handleChangeCreditCardAccepterName(input.id, value)
                          }
                          onSearch={onSearchSelect1}
                          placement={"topLeft"}
                          options={[
                            {
                              value: "삼성카드",
                              label: "삼성카드",
                            },
                            {
                              value: "현대카드",
                              label: "현대카드",
                            },
                            {
                              value: "롯데카드",
                              label: "롯데카드",
                            },
                            {
                              value: "신한은행",
                              label: "신한은행",
                            },
                            {
                              value: "KB국민은행",
                              label: "KB국민은행",
                            },
                          ]}
                        />
                      </div>
                      <div className="flex-row">
                        <h3 className="label">승인번호 &nbsp;:</h3>
                        <Input
                          value={input.value}
                          onChange={(e) =>
                            handleChangeAccount(input.id, e.target.value)
                          }
                          placeholder="입력하세요"
                          className="flex-1"
                        />
                        <Button
                          type="primary"
                          htmlType="button"
                          onClick={() => removeInput(input.id)}
                          className="ml-8"
                          // disabled={inputRows.length <= 0 || !isEnabled}
                        >
                          삭제
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 고객메모 */}
        <div className="flex-row mb-16">
          <h3 className="label">고객메모 &nbsp;:</h3>
          <Input
            id="note"
            // value={roomRes.value.momo}
            placeholder="고객메모는 매출별 적용됩니다.(객실 표시는 상당 [상태정보] 탭의 [객실표시]란에 메모해 주세요.)"
            onChange={handleInputChange_Memo}
            value={memo}
          />
        </div>

        {/* 알림 */}
        <div className="flex-row flex-wrap gap-16 sec-2 mb-16">
          <div className="flex-row">
            <Checkbox onChange={onChangeCheckBox1}>알림</Checkbox>
            <span>20시 58분에 고객 메모 팝업</span>
          </div>
          <div className="flex-row">
            <Switch onChange={onChangeSwitch1} /> &nbsp;&nbsp;
            <span>알림시 고객 메모 음성 재생</span>
          </div>
        </div>
      </div>
    </form>
  );
});

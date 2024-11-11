import React, { useEffect, useState, useRef } from "react";
import {
  WifiOutlined,
  PoweroffOutlined,
  MoreOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import { Dropdown, Image, Modal, Tag, Tooltip, message, Tabs } from "antd";
import stateIconClean from "../images/icon/broom-unstroke.png";
import stateIconCheckIn from "../images/icon/check-in.png";
import stateIconCheckOut from "../images/icon/check-out.png";
import stateIconBed from "../images/icon/bed.png";
import stateIconInspection from "../images/icon/inspection.png";
import airConditioner from "../images/icon/air-conditioner.png";
import { ModalTab1 } from "./ModalTab1";
import { ModalTab2 } from "./ModalTab2";
import { ModalTab3 } from "./ModalTab3";
import { ModalTab4 } from "./ModalTab4";
import { useCode } from "../login/CodeContext";
import { TimeNoSecFormatterSymbol } from "../util";
import { roomUpdateApi } from "../api/api";

export const Card = ({ rooms, roomTypeAllList, roomReserveAllList }) => {
  // 변수 정의
  const [pStayType, setPStayType] = useState("");

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

  // 드롭다운
  let items = [{ key: "0", label: <div>{rooms.value.display_name}호</div> }];
  if (rooms.value.room_sale_id !== null) {
    items.push(
      { key: "OUTING", label: !rooms.value.outing ? "외출" : "외출 복귀" },
      { key: "EMPTY", label: "퇴실" },
      { key: "EMPTY_NO", label: "퇴실(전원차단X)" }
    );
  } else {
    items.push(
      { key: "HOURS", label: "대실" },
      { key: "DAYS", label: "숙박" },
      { key: "LONG_DAYS", label: "장기" }
    );
  }
  items.push(
    {
      key: "CLEAN_ORDER",
      label: rooms.value.clean_order ? "청소완료" : "청소요청",
    },
    {
      key: "INSPECT_ORDER",
      label: rooms.value.inspect_order ? "정검완료" : "정검요청",
    },
    {
      key: "REQUEST_STATE_CLEAR",
      label: "퇴실처리",
    },
    {
      key: "REQUEST_STATE_CLEAR_CANCEL",
      label: "퇴실취소",
    }
  );
  if (rooms.value.room_sale_id !== null) {
    items.push(
      { key: "MOVE", label: "객실이동" },
      { key: "USING", label: "입실취소" }
    );
  }

  const [messageApi, contextHolder] = message.useMessage();
  const onClick = ({ key }) => {
    let selectedLabel = items.find((item) => item.key === key).label;
    switch (key) {
      case "HOURS":
      case "DAYS":
      case "LONG_DAYS":
        setPStayType(key);
        setIsModalOpen(true);
        break;
      case "OUTING":
        Modal.confirm({
          title: `[${selectedLabel}] 상태변경 하시겠습니까?`,
          width: "440px",
          icon: (
            <AlertOutlined
              style={{ transform: "scale(1.3)", color: "#a46bff" }}
            />
          ),
          okText: "예",
          cancelText: "아니오",
          centered: true,
          onOk: async () => {
            const param = {
              room_type_id: rooms.value.room_type_id,
              outing: !rooms.value.outing,
            };

            try {
              const res = await roomUpdateApi(rooms.key, param);
              console.log(res);
              if (rooms.key === Object.entries(res.rooms)[0][0]) {
                message.info("변경되었습니다.");
                window.location.reload();
              } else {
                message.error(
                  "변경중 문제가 발생했습니다. 잠시후 다시 작업해주세요."
                );
              }
            } catch (error) {
              console.log(error);
            }
          },
          onCancel() {},
        });
        break;
      case "CLEAN_ORDER":
        Modal.confirm({
          title: `[${selectedLabel}] 상태변경 하시겠습니까?`,
          width: "440px",
          icon: (
            <AlertOutlined
              style={{ transform: "scale(1.3)", color: "#a46bff" }}
            />
          ),
          okText: "예",
          cancelText: "아니오",
          centered: true,
          onOk: async () => {
            const param = {
              room_type_id: rooms.value.room_type_id,
              clean_order: !rooms.value.clean_order,
            };

            try {
              const res = await roomUpdateApi(rooms.key, param);
              console.log(res);
              if (rooms.key === Object.entries(res.rooms)[0][0]) {
                message.info("변경되었습니다.");
                window.location.reload();
              } else {
                message.error(
                  "변경중 문제가 발생했습니다. 잠시후 다시 작업해주세요."
                );
              }
            } catch (error) {
              console.log(error);
            }
          },
          onCancel() {},
        });
        break;
      case "INSPECT_ORDER":
        Modal.confirm({
          title: `[${selectedLabel}] 상태변경 하시겠습니까?`,
          width: "440px",
          icon: (
            <AlertOutlined
              style={{ transform: "scale(1.3)", color: "#a46bff" }}
            />
          ),
          okText: "예",
          cancelText: "아니오",
          centered: true,
          onOk: async () => {
            const param = {
              room_type_id: rooms.value.room_type_id,
              inspect_order: !rooms.value.inspect_order,
            };

            try {
              const res = await roomUpdateApi(rooms.key, param);
              console.log(res);
              if (rooms.key === Object.entries(res.rooms)[0][0]) {
                message.info("변경되었습니다.");
                window.location.reload();
              } else {
                message.error(
                  "변경중 문제가 발생했습니다. 잠시후 다시 작업해주세요."
                );
              }
            } catch (error) {
              console.log(error);
            }
          },
          onCancel() {},
        });
        break;
      case "REQUEST_STATE_CLEAR":
        Modal.confirm({
          title: `[${selectedLabel}] 상태변경 하시겠습니까?`,
          width: "440px",
          icon: (
            <AlertOutlined
              style={{ transform: "scale(1.3)", color: "#a46bff" }}
            />
          ),
          okText: "예",
          cancelText: "아니오",
          centered: true,
          onOk: async () => {
            const param = {
              room_type_id: rooms.value.room_type_id,
              request_state_clear: !rooms.value.request_state_clear,
            };

            try {
              const res = await roomUpdateApi(rooms.key, param);
              console.log(res);
              if (rooms.key === Object.entries(res.rooms)[0][0]) {
                message.info("변경되었습니다.");
                window.location.reload();
              } else {
                message.error(
                  "변경중 문제가 발생했습니다. 잠시후 다시 작업해주세요."
                );
              }
            } catch (error) {
              console.log(error);
            }
          },
          onCancel() {},
        });
        break;
      case "REQUEST_STATE_CLEAR_CANCEL":
        messageApi.info("작업중입니다..");
        break;
      default:
        messageApi.info("작업중입니다..");
        break;
    }
  };

  // 모달
  const childComponentRef_tab1 = useRef();
  const childComponentRef_tab2 = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setPStayType("");
    setIsModalOpen(true);
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
        if (childComponentRef_tab1.current !== undefined) {
          childComponentRef_tab1.current.WillBeUsedInParentComponent();
        }
        console.log(childComponentRef_tab2);
        if (childComponentRef_tab2.current !== undefined) {
          childComponentRef_tab2.current.WillBeUsedInParentComponent();
        }
        //setIsModalOpen(false);
      },
      onCancel() {
        //handleSubmit(false);
      },
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 탭
  const itemsTab = [
    {
      key: "1",
      label: "입실정보",
      children: (
        <ModalTab1
          rooms={rooms}
          stayType={pStayType}
          roomReserveAllList={roomReserveAllList}
          ref={childComponentRef_tab1}
        />
      ),
    },
    {
      key: "2",
      label: "상태정보",
      children: <ModalTab2 rooms={rooms} ref={childComponentRef_tab2} />,
    },
    {
      key: "3",
      label: "매출조회",
      disabled: true,
      children: <ModalTab3 rooms={rooms} />,
    },
    {
      key: "4",
      label: "이력조회",
      children: <ModalTab4 rooms={rooms} />,
    },
  ];

  return (
    <>
      <div className="card-wrap">
        <div onClick={showModal}>
          {/* 상태표시 - 바 */}
          <div
            className={
              rooms.value.state_summary === "USING"
                ? "state-bar red"
                : rooms.value.state_summary === "OUTING"
                ? "state-bar red"
                : rooms.value.state_summary === "CLEAN_ORDER"
                ? "state-bar green"
                : rooms.value.state_summary === "INSPECT_ORDER"
                ? "state-bar purple"
                : rooms.value.state_summary === "INSPECTING"
                ? "state-bar orange"
                : "state-bar"
            }
          ></div>

          {/* 헤더 - 방번호 및 타이틀 */}
          {/* <p>roomId : {rooms.key}</p> */}
          {/* <p>roomTypeId : {rooms.value.room_type_id}</p> */}

          <div className="room-card-tit">
            <h3>{rooms.value.display_name}호 -&nbsp;</h3>
            <h3 className="ellipsis">
              {codeRoomTypeList?.find(
                (roomType) => roomType.key === rooms.value.room_type_id
              )?.value || ""}
            </h3>
          </div>

          {/* 상태표시 - 아이콘 */}
          <div className="state-icons">
            <div className="state-btn">
              <Tooltip
                title={
                  <div>
                    객실 통신상태 입니다.
                    <br />
                    (적색: 통신정상, 회색: 통신단절)
                    <br />
                    통신 단절시, 일부 객실 상태와 제어가 동작하지 않을 수
                    있습니다.
                  </div>
                }
              >
                <Tag color={rooms.value.connection ? "#f50" : "#efefef"}>
                  <WifiOutlined />
                </Tag>
              </Tooltip>

              <Tooltip
                title={<div>키오스크 카드데크에 수납된 카드 개수 입니다.</div>}
              >
                <Tag color="green">
                  <h6>2</h6>
                </Tag>
              </Tooltip>

              <Tooltip
                title={
                  <div>
                    객실의 콘센트 전원입니다. <br />
                    (청색: On, 회색 : Off)
                  </div>
                }
              >
                <Tag color={rooms.value.main_power ? "#108ee9" : "#efefef"}>
                  <PoweroffOutlined />
                </Tag>
              </Tooltip>

              <Tooltip
                title={
                  <div>
                    객실의 에어컨 전원입니다.
                    <br />
                    (청색: On, 회색 : Off)
                    <br />
                    해당 상태는 에어컨의 전원 공급만을 의미하므로 에어컨 가동
                    여부와는 무관합니다.
                  </div>
                }
              >
                <Tag color={rooms.value.aircon_power ? "#108ee9" : "#efefef"}>
                  <img src={airConditioner} alt="에어컨 아이콘" width={22} />
                </Tag>
              </Tooltip>
            </div>

            <div className="flex-col w-full" style={{ height: "108px" }}>
              {/* 상태표시 - 이미지 */}
              <div className="img-wrap">
                {rooms.value.clean_order ? (
                  <div className="flex-col-center">
                    <img src={stateIconClean} alt="청소요청 아이콘" />
                    <span className="green">청소요청</span>
                  </div>
                ) : rooms.value.inspect_order ? (
                  <div className="flex-col-center">
                    <img src={stateIconInspection} alt="점검요청 아이콘" />
                    <span>점검요청</span>
                  </div>
                ) : rooms.value.state_summary === "INSPECTING" ? (
                  <div className="flex-col-center">
                    <img src={stateIconInspection} alt="점검중 아이콘" />
                    <span>점검중</span>
                  </div>
                ) : rooms.value.state_summary === "USING" ? (
                  <div className="flex-col-center">
                    <img src={stateIconCheckIn} alt="체크인 아이콘" />
                    <span className="red">입실</span>
                  </div>
                ) : rooms.value.state_summary === "OUTING" ? (
                  <div className="flex-col-center">
                    <img src={stateIconCheckIn} alt="체크인 아이콘" />
                    <span className="red">외출</span>
                  </div>
                ) : (
                  <img src={stateIconBed} alt="기본 아이콘" />
                )}
              </div>
              {/* 온도 표시 - 위치가 결정된것은 아님(임시) */}
              {rooms.value.temp === 0 ? (
                <div className="font-12-600 text-red"></div>
              ) : (
                <div className="font-12-600 text-red text-r">
                  {rooms.value.temp}℃
                </div>
              )}
            </div>
          </div>
          {/* {rooms.value.state_summary} */}
        </div>

        {/* 푸터 */}
        <div className="footer">
          <div className="result">
            {rooms.value.state_summary === "CLEAN_ORDER"
              ? "청소"
              : rooms.value.state_summary === "USING"
              ? "입실"
              : rooms.value.state_summary === "EMPTY" ||
                rooms.value.state_summary === "INSPECT_ORDER" ||
                rooms.value.state_summary === "INSPECTING"
              ? "퇴실"
              : null}

            {rooms.value.state_summary === "EMPTY" ? (
              <>
                (
                <TimeNoSecFormatterSymbol
                  dateTime={rooms.value.last_check_out_time}
                />
                )
              </>
            ) : rooms.value.state_summary === "USING" ? (
              <>
                (
                <TimeNoSecFormatterSymbol
                  dateTime={rooms.value.last_check_in_time}
                />
                )
              </>
            ) : rooms.value.state_summary === "CLEAN_ORDER" ? (
              <>
                (
                <TimeNoSecFormatterSymbol
                  dateTime={rooms.value.last_clean_order_start_time}
                />
                )
              </>
            ) : rooms.value.state_summary === "INSPECT_ORDER" ? (
              <>
                (
                <TimeNoSecFormatterSymbol
                  dateTime={rooms.value.last_inspect_order_start_time}
                />
                )
              </>
            ) : rooms.value.state_summary === "INSPECTING" ? (
              <>
                (
                <TimeNoSecFormatterSymbol
                  dateTime={rooms.value.last_check_out_time}
                />
                )
              </>
            ) : null}
          </div>

          {/* 온도 표시 - 위치 위쪽으로 변경 하여 삭제해도됨 */}
          {/* {rooms.value.temp === 0 ? null : (
            <div className="font-12-600 text-red">{rooms.value.temp}℃</div>
          )} */}
          <div className="more">
            {contextHolder}
            <Dropdown
              menu={{ items, onClick }}
              trigger={["click"]}
              overlayClassName="cuzDrop1"
            >
              <MoreOutlined />
            </Dropdown>
          </div>
        </div>
      </div>

      <Modal
        destroyOnClose={true}
        title={
          <div className="flex-row">
            <h3>{rooms.value.display_name}호 -&nbsp;</h3>
            {codeRoomTypeList?.find(
              (roomType) => roomType.key === rooms.value.room_type_id
            )?.value || ""}
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        okText="저장"
        onCancel={handleCancel}
        cancelText="닫기"
        width={1000}
        maskClosable={false}
      >
        <Tabs defaultActiveKey="1" items={itemsTab} />
      </Modal>
    </>
  );
};

import React, { useEffect, useState } from "react";
import MainMenu from "./MainMenu";
import { Rooms } from "../rooms/Rooms";
import MainClock from "./MainClock";
import { DataTest } from "../api/DataTest";
import { useLocation } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Drawer,
  Empty,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
import { useAuth } from "../login/AuthContext";
import { EditMain } from "../menuEdit/EditMain";
import { ListMain } from "../menuList/ListMain";
import { ManageMain } from "../menuManage/ManageMain";
import { SettingMain } from "../menuSetting/SettingMain";
import { ReserveMain } from "../menuReserve/ReserveMain";
import { Z_NotFoundSample } from "./Z_NotFoundSample";
import { SalesTable1 } from "./SalesTable1";
import { SalesTable2 } from "./SalesTable2";
import { NotificationCard } from "./NotificationCard";
import { BellOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { accomIdApi } from "../api/api";
import { DashbordMain } from "../menuDashbord/DashbordMain";

export const Container = () => {
  // ========================================================
  // Accom-id : 업소 정보
  const [accomOnlyList, setAccomOnlyList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await accomIdApi();
        const resArray = Object.entries(res.accoms);
        const accomIdAllArray = resArray.map(([key, value]) => {
          return {
            key: key,
            value: value,
            name: value.name,
          };
        });
        setAccomOnlyList(accomIdAllArray);
        // console.log(accomOnlyList[0].name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  // ========================================================

  // MainMenu 펼짐 제어
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const handleMenuResize = () => {
    if (window.innerWidth <= 870) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };
  useEffect(() => {
    handleMenuResize();
    window.addEventListener("resize", handleMenuResize);
    return () => {
      window.removeEventListener("resize", handleMenuResize);
    };
  }, []);

  // 경로
  const { pathname } = useLocation();
  // 로그아웃
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  // console.log(pathname);

  // 메뉴 Key
  const [currentMenuKey, setCurrentMenuKey] = useState("1");

  // 매출 drawer
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // 매출 tab
  const onChangeSalesTableTab = (key) => {
    console.log(key);
  };

  // 알람창 drawer
  const [openAlarm, setOpenAlarm] = useState(false);
  const showDrawerAlarm = () => {
    setOpenAlarm(true);
  };
  const onCloseAlarm = () => {
    setOpenAlarm(false);
  };

  // 알림창 card
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "알림 1",
      content: `이것은 알림 메시지 1입니다.`,
    },
    {
      id: 2,
      title: "알림 2",
      content: `이것은 알림 메시지 2입니다.`,
    },
    { id: 3, title: "알림 3", content: "이것은 알림 메시지 3입니다." },
  ]);
  const handleClose = (id) => {
    setCards(cards.filter((card) => card.id !== id)); // 해당 카드 삭제
  };

  // 룸정보
  const [roomAllList, setRoomAllList] = useState([]);

  // 상태별 카운팅
  const stateCount = roomAllList.reduce((acc, rooms) => {
    const state = rooms.value.state_summary;
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});
  // console.log(Object.keys(stateCount));

  // 객실상태 제어 checkbox
  const CheckboxGroup = Checkbox.Group;
  /*
  const plainOptions = Object.keys(stateCount).map((state) => ({
    label:
      // 상태와 개수
      state === "EMPTY"
        ? `퇴실 (${stateCount[state]})`
        : state === "USING"
        ? `입실 (${stateCount[state]})`
        : state === "OUTING"
        ? `외출 (${stateCount[state]})`
        : state === "CLEANING"
        ? `청소중 (${stateCount[state]?  0})`
        : state === "CLEAN_ORDER"
        ? `청소요청 (${stateCount[state]})`
        : state === "INSPECTING"
        ? `점검중 (${stateCount[state]})`
        : state === "INSPECT_ORDER"
        ? `점검요청 (${stateCount[state]})`
        : `퇴실 (${stateCount[state]})`,
    value: state, // 상태 자체를 value로 설정
  }));*/
  const plainOptions = [
    {value: "USING", label: "입실"},
    {value: "EMPTY", label: "퇴실"},
    {value: "OUTING", label: "외출"},
    {value: "CLEAN_ORDER", label: "청소요청"},
    {value: "CLEANING", label: "청소중"},
    {value: "INSPECT_ORDER", label: "점검요청"},
    {value: "INSPECTING", label: "점검중"},
  ];
  
  for (let i = 0; i < plainOptions.length; i++) {
    plainOptions[i].label = plainOptions[i].label + " (" + ( stateCount[plainOptions[i].value] !== undefined ? stateCount[plainOptions[i].value] : 0 ) + ")";
  }

  const defaultCheckedList = Object.keys(stateCount).map((state) => [
    {
      label: state === "EMPTY",
    },
  ]);

  const [checkedListRoomControl, setCheckedListRoomControl] =
    useState(defaultCheckedList);
  const checkAll = plainOptions.length === checkedListRoomControl.length;
  // console.log(checkAll);
  const indeterminate =
    checkedListRoomControl.length > 0 &&
    checkedListRoomControl.length < plainOptions.length;
  // console.log(indeterminate);
  // console.log("선택됨: ", checkedListRoomControl);
  const onChangeRoomControl = (list) => {
    setCheckedListRoomControl(list);
    console.log("선택됨: ", checkedListRoomControl);
  };
  const onCheckAllChangeRoomControl = (e) => {
    const selectedOptionArr = [];
    plainOptions.map((opt) => {
      selectedOptionArr.push(opt.value);
    });
    setCheckedListRoomControl(e.target.checked ? selectedOptionArr : []);
  };

  // 모바일 메뉴
  const [openMoMenu, setOpenMoMenu] = useState(false);
  const showDrawerMoMenu = () => {
    setOpenMoMenu(true);
  };
  const onCloseMoMenu = () => {
    setOpenMoMenu(false);
  };

  return (
    <>
      {pathname === "/404" ? (
        <Z_NotFoundSample />
      ) : (
        <div className="container">
          <div className="header">
            <div className={"clock-area"}>
              <MainClock accomOnlyList={accomOnlyList} />
            </div>
            <div className="inner">
              <div className="top">
                {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "auto",
                  }}
                >
                  <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllChangeRoomControl}
                    checked={checkAll}
                  >
                    전체 ({plainOptions.length})
                  </Checkbox>
                  <div className="line-col"></div>
                </div> */}
                <div className="login-name mr-16">{accomOnlyList[0]?.name}</div>
                <Button type="primary" className="mr-16" onClick={showDrawer}>
                  매출보기
                </Button>
                <Tooltip title={"로그아웃"}>
                  <Button
                    type="primary"
                    onClick={handleLogout}
                    title="로그아웃"
                  >
                    <LogoutOutlined />
                  </Button>
                </Tooltip>
                <Button
                  type="primary"
                  title="모바일 메뉴"
                  className="menu-mobile ml-16 hide"
                  onClick={showDrawerMoMenu}
                >
                  <MenuOutlined />
                </Button>
                <Drawer
                  title={<div className="font-20-900">모바일 메뉴</div>}
                  onClose={onCloseMoMenu}
                  open={openMoMenu}
                  className="menu-mobile-open"
                  width={"210px"}
                >
                  <MainMenu
                    currentMenuKey={currentMenuKey}
                    setCurrentMenuKey={setCurrentMenuKey}
                  />
                </Drawer>
              </div>
              {currentMenuKey === "1" && pathname === "/" ? (
                <div className="bottom">
                  <div
                    className="flex-row"
                    style={{ flexWrap: "nowrap", whiteSpace: "nowrap" }}
                  >
                    <Checkbox
                      indeterminate={indeterminate}
                      onChange={onCheckAllChangeRoomControl}
                      checked={checkAll}
                    >
                      전체 ({roomAllList.length})
                    </Checkbox>
                    <div className="line-col"></div>
                  </div>
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedListRoomControl}
                    onChange={onChangeRoomControl}
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div
            className="flex-row"
            style={{
              width: "100%",
              height: "100%",
              // border: "1px solid red",
              gap: "24px",
              alignItems: "stretch",
            }}
          >
            <MainMenu
              toggleCollapsed={toggleCollapsed}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              currentMenuKey={currentMenuKey}
              setCurrentMenuKey={setCurrentMenuKey}
            />
            <div className={!collapsed ? "body-wrap" : "body-wrap fold"}>
              <div className="body">
                {pathname === "/" ? (
                  <Rooms
                    roomAllList={roomAllList}
                    setRoomAllList={setRoomAllList}
                    checkedListRoomControl={checkedListRoomControl}
                  />
                ) : pathname === "/test" ? (
                  <DataTest />
                ) : pathname === "/edit" ? (
                  <EditMain />
                ) : pathname === "/list" ? (
                  <ListMain currentMenuKey={currentMenuKey} />
                ) : pathname === "/manage" ? (
                  <ManageMain currentMenuKey={currentMenuKey} />
                ) : pathname === "/setting" ? (
                  <SettingMain
                    currentMenuKey={currentMenuKey}
                    roomAllList={roomAllList}
                  />
                ) : pathname === "/reserve" ? (
                  <ReserveMain />
                ) : pathname === "/dashbord" ? (
                  <DashbordMain />
                ) : (
                  <div className="flex-row-center h-full">
                    <Empty />
                  </div>
                )}
              </div>
              <footer>
                <div className="commu-status">
                  <Tooltip
                    title={
                      <div className="text-c">
                        업소의 모든 상황을 안정적으로 관리해주는 최신 기술이
                        적용된 클라우드 서버 입니다.
                        <br />
                        파란색: 통신정상 <br />
                        빨간색: 통신단절
                      </div>
                    }
                  >
                    <Tag color="blue">API</Tag>
                  </Tooltip>
                  <Tooltip
                    title={
                      <div className="text-c">
                        업소의 모든 장치간의 이벤트에 대한 실시간 동기화를
                        가능하게 해주는 서버입니다.
                        <br />
                        파란색: 통신정상 <br />
                        빨간색: 통신단절
                      </div>
                    }
                  >
                    <Tag color="blue">Event</Tag>
                  </Tooltip>
                  <Tooltip
                    title={
                      <div className="text-c">
                        적색 표기시 키오스크에 문제가 발생한 경우입니다.
                        <br />
                        파란색: 정상 <br />
                        빨간색: 통신단절
                      </div>
                    }
                  >
                    <Tag color="red">KIOSK</Tag>
                  </Tooltip>
                  <Tooltip
                    title={
                      <div className="text-c">
                        데몬은 객실의 상태 정보를 동기화 시켜주는 역할을 하며,
                        적색 표기시 키 여부 등, 객실 상태가 동기화 되지 않을 수
                        있습니다.
                        <br />
                        파란색: 정상 <br />
                        빨간색: 통신단절
                      </div>
                    }
                  >
                    <Tag color="red">DEMON</Tag>
                  </Tooltip>
                  <Tooltip
                    title={
                      <div className="text-c">
                        프론트에 설치된 객실관리 프로그램을 의미합니다.
                        <br />
                        파란색: 정상 <br />
                        빨간색: 통신단절
                      </div>
                    }
                  >
                    <Tag color="red">FRONT</Tag>
                  </Tooltip>
                </div>
                <a href="tel:1600-5356" className="tel">
                  CS ☎ 1600-5356
                </a>
                <p className="font-14-500">v2.21.4</p>
                <a href="#">
                  <Badge
                    count={cards.length}
                    className="mr-16"
                    onClick={showDrawerAlarm}
                    title={"알림창 열기"}
                    showZero={false}
                  >
                    <Avatar shape="square" icon={<BellOutlined />} />
                  </Badge>
                </a>
              </footer>
            </div>
          </div>

          <Drawer
            title={<h2 className="ml-16">매출보기</h2>}
            onClose={onClose}
            open={open}
            placement={"left"}
            maskClosable={true}
            size={"large"}
          >
            <Tabs
              onChange={onChangeSalesTableTab}
              // type="card"
              items={[
                {
                  key: "1",
                  label: "금일",
                  // children: <SalesTable1 />,
                  children: <SalesTable2 />,
                },
                { key: "2", label: "전일", children: "전일" },
                { key: "3", label: "금월", children: "금월" },
                { key: "4", label: "전월", children: "전월" },
              ]}
            />
          </Drawer>

          <Drawer
            title={<h2 className="ml-16">알람창</h2>}
            onClose={onCloseAlarm}
            open={openAlarm}
            placement={"right"}
            maskClosable={true}
            size={"default"}
            className="alarm"
          >
            <div className="flex-col gap-16">
              {cards.map((card) => (
                <NotificationCard
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  content={card.content}
                  onClose={handleClose} // 카드 닫기 함수 전달
                />
              ))}
            </div>
          </Drawer>
        </div>
      )}
    </>
  );
};

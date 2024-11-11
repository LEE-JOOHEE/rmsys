import React, { Children, useState } from "react";
import { Link } from "react-router-dom";
import {
  ContainerOutlined,
  DesktopOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SettingOutlined,
  AuditOutlined,
  FormatPainterOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";

const items = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: <Link to={"/"}>메인화면</Link>,
  },
  {
    key: "2",
    icon: <PieChartOutlined />,
    label: <Link to={"/view"}>보기</Link>,
  },
  {
    key: "3",
    icon: <DesktopOutlined />,
    label: <Link to={"/edit"}>편집</Link>,
  },
  {
    key: "sub1",
    icon: <ContainerOutlined />,
    label: <Link to={"/list"}>조회</Link>,
    children: [
      {
        key: "SalesInquiry",
        label: <Link to={"/list"}>매출 조회</Link>,
      },
      {
        key: "CheckAdmissionHistory",
        label: <Link to={"/list"}>입실 이력 조회</Link>,
      },
      {
        key: "CheckRoomHistory",
        label: <Link to={"/list"}>객실 이력 조회</Link>,
      },
      {
        key: "MileageMemberInquiry",
        label: <Link to={"/list"}>마일리지 회원 조회</Link>,
      },
    ],
  },
  {
    key: "sub2",
    icon: <FormatPainterOutlined />,
    label: <Link to={"/manage"}>관리</Link>,
    children: [
      {
        key: "RoomInfoManage",
        label: <Link to={"/manage"}>객실 정보 관리</Link>,
      },
      {
        key: "RoomTypeManage",
        label: <Link to={"/manage"}>객실 유형 관리</Link>,
      },
      {
        key: "DoorlockInfoManage",
        label: <Link to={"/manage"}>도어락 정보 관리</Link>,
      },
      {
        key: "QRTextManage",
        label: <Link to={"/manage"}>QR 문자 관리</Link>,
      },
    ],
  },
  {
    key: "sub3",
    icon: <SettingOutlined />,
    label: <Link to={"/setting"}>설정</Link>,
    children: [
      {
        key: "SettingRateTime",
        label: <Link to={"/setting"}>요금 및 시간 설정</Link>,
      },
      {
        key: "SettingOperateRule",
        label: <Link to={"/setting"}>운영 규칙 설정</Link>,
      },
      {
        key: "SettingScreen",
        label: <Link to={"/setting"}>화면 설정</Link>,
      },
      {
        key: "SettingReservation",
        label: <Link to={"/setting"}>예약 연동 설정</Link>,
      },
      {
        key: "SettingSMS",
        label: <Link to={"/setting"}>예약 문자 설정</Link>,
      },
    ],
  },
  {
    key: "4",
    icon: <AuditOutlined />,
    label: <Link to={"/reserve"}>예약</Link>,
  },
  {
    key: "5",
    icon: <AreaChartOutlined />,
    label: <Link to={"/dashbord"}>대시보드</Link>,
  },
  // {
  //   key: "6",
  //   icon: <QqOutlined />,
  //   label: <Link to={"/test"}>데이터확인용</Link>,
  //   onClick: () => {
  //     console.log("It works fine");
  //   },
  // },
];

export const MainMenu = (props) => {
  // console.log(props);

  const onClick = (e) => {
    props.setCurrentMenuKey(e.key);
  };

  return (
    <>
      <div className={!props.collapsed ? "menu-wrap" : "menu-wrap fold"}>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          // theme="dark"
          inlineCollapsed={props.collapsed}
          items={items}
          onClick={onClick}
          selectedKeys={[props.currentMenuKey]}
        />
        <div className="flex-row">
          <Button
            type="primary"
            onClick={props.toggleCollapsed}
            className="btn-menu-fold"
            style={{
              marginTop: 16,
              width: "80px",
              padding: "4px 32px",
            }}
          >
            {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
      </div>
    </>
  );
};

export default MainMenu;

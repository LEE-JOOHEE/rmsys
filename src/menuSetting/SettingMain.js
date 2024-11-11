import React, { useEffect, useState } from "react";
import { SettingRateTime } from "./SettingRateTime";
import { SettingOperateRule } from "./SettingOperateRule";
import { SettingScreen } from "./SettingScreen";
import { SettingReservation } from "./SettingReservation";
import { SettingSMS } from "./SettingSMS";

export const SettingMain = ({ currentMenuKey }) => {
  return (
    <>
      {/* <h1>설정메뉴의 메인페이지 입니다.</h1> */}

      {currentMenuKey === "SettingRateTime" ? (
        <SettingRateTime />
      ) : currentMenuKey === "SettingOperateRule" ? (
        <SettingOperateRule />
      ) : currentMenuKey === "SettingScreen" ? (
        <SettingScreen />
      ) : currentMenuKey === "SettingReservation" ? (
        <SettingReservation />
      ) : currentMenuKey === "SettingSMS" ? (
        <SettingSMS />
      ) : (
        <SettingRateTime />
      )}
    </>
  );
};

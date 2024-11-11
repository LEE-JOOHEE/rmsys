import React from "react";
import { SalesInquiry } from "./SalesInquiry";
import { CheckAdmissionHistory } from "./CheckAdmissionHistory";
import { CheckRoomHistory } from "./CheckRoomHistory";
import { MileageMemberInquiry } from "./MileageMemberInquiry";

export const ListMain = ({ currentMenuKey }) => {
  return (
    <>
      {/* <h1>조회메뉴의 메인페이지 입니다.</h1> */}

      {currentMenuKey === "SalesInquiry" ? (
        <SalesInquiry />
      ) : currentMenuKey === "CheckAdmissionHistory" ? (
        <CheckAdmissionHistory />
      ) : currentMenuKey === "CheckRoomHistory" ? (
        <CheckRoomHistory />
      ) : currentMenuKey === "MileageMemberInquiry" ? (
        <MileageMemberInquiry />
      ) : (
        <SalesInquiry />
      )}
    </>
  );
};

import React, { useEffect, useState } from "react";
import { RoomInfoManage } from "./RoomInfoManage";
import { RoomTypeManage } from "./RoomTypeManage";
import { DoorlockInfoManage } from "./DoorlockInfoManage";
import { QRTextManage } from "./QRTextManage";
import {
  roomAllByAccomSearchApi,
  roomTypeAllByAccomSearchApi,
  doorLockAllByAccomSearchApi,
} from "../api/api";

export const ManageMain = ({ currentMenuKey }) => {
  // 룸정보 (API 연결)
  const [roomAllList, setRoomAllList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await roomAllByAccomSearchApi();
        const resArray = Object.entries(res.rooms);
        const roomAllArray = resArray
          .map(([key, value, no]) => {
            return {
              key: key,
              value: value,
              no: value.display_name,
              roomTypeId: value.room_type_id,
              roomSaleId: value.room_sale_id,
            };
          })
          .sort((a, b) => a.no - b.no);
        setRoomAllList(roomAllArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // 룸타입 정보 (API 연결)
  const [roomTypeAllList, setRoomTypeAllList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await roomTypeAllByAccomSearchApi();
        const resArray = Object.entries(res.room_types);
        const roomTypeAllArray = resArray.map(([key, value]) => {
          return {
            key: key,
            value: value,
          };
        });
        setRoomTypeAllList(roomTypeAllArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // 도어락 정보 (API 연결)
  const [doorLockAllList, setDoorLockAllList] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await doorLockAllByAccomSearchApi();
        const resArray = Object.entries(res.door_locks);
        const doorLockAllArray = resArray.map(([key, value]) => {
          return {
            key: key,
            value: value,
            roomId: value.room_id,
          };
        });
        setDoorLockAllList(doorLockAllArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* <h1>관리메뉴의 메인페이지 입니다.</h1> */}

      {currentMenuKey === "RoomInfoManage" ? (
        <RoomInfoManage
          roomAllList={roomAllList}
          setRoomAllList={setRoomAllList}
          roomTypeAllList={roomTypeAllList}
          setRoomTypeAllList={setRoomTypeAllList}
        />
      ) : currentMenuKey === "RoomTypeManage" ? (
        <RoomTypeManage roomTypeAllList={roomTypeAllList} />
      ) : currentMenuKey === "DoorlockInfoManage" ? (
        <DoorlockInfoManage
          roomAllList={roomAllList}
          doorLockAllList={doorLockAllList}
        />
      ) : currentMenuKey === "QRTextManage" ? (
        <QRTextManage />
      ) : (
        <RoomInfoManage
          roomAllList={roomAllList}
          setRoomAllList={setRoomAllList}
          roomTypeAllList={roomTypeAllList}
          setRoomTypeAllList={setRoomTypeAllList}
        />
      )}
    </>
  );
};

import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "antd";
import { Card } from "./Card";
import {
  roomAllByAccomSearchApi,
  roomReserveAllByAccomSearchApi,
  roomSaleInfoOnlyApi,
  roomTypeAllByAccomSearchApi,
} from "../api/api";
import { useAuth } from "../login/AuthContext";

export const Rooms = ({ roomAllList, setRoomAllList, checkedListRoomControl }) => {
  const [roomTypeId, setRoomTypeId] = useState([]);
  const [roomSaleId, setRoomSaleId] = useState([]);
  const [roomState, setRoomState] = useState([]);

  // ========================================================
  // Room all-by-accom : accom에 등록된 모든 room 정보
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await roomAllByAccomSearchApi();
        const resArray = Object.entries(res.rooms);
        const roomAllArray = resArray
          .map(([key, value, no]) => {
            // console.log(key === "kbYs0KiuEDpECPuBvUJf" ? value : "");
            return {
              key: key,
              value: value,
              no: value.display_name,
              roomTypeId: value.room_type_id,
              roomSaleId: value.room_sale_id,
            };
          })
          .sort((a, b) => b.no - a.no);
        setRoomAllList(roomAllArray);

        roomAllArray.map((item) => {
          setRoomTypeId(item.value.room_type_id);
          setRoomState(item.value.key);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // ========================================================
  // RoomType all-by-accom : accom에 등록된 모든 room_type 정보
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

  // ===================================================================
  // RoomSale : 매출 정보를 가져온다.
  const [roomSaleAllList, setRoomSaleAllList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setRoomSaleId(roomAllList.roomSaleId);
        const res = await roomSaleInfoOnlyApi(roomSaleId);
        const resArray = Object.entries(res.room_sales);
        const roomSaleAllArray = resArray.map(([key, value]) => {
          // console.log(key === "Pq6TwLoGaQjs70QISL9W" ? value : "");
          return {
            key: key,
            value: value,
          };
        });
        setRoomSaleAllList(roomSaleAllArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // ========================================================
  // RoomReserve : 예약 정보를 가져온다.
  const [roomReserveAllList, setRoomReserveAllList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await roomReserveAllByAccomSearchApi();
        const resArray = Object.entries(res.room_reserves);
        const roomReserveAllArray = resArray.map(([key, value]) => {
          // console.log(key === "T3b982r00EydvgDxtDpS" ? value : "");
          return {
            key: key,
            value: value,
          };
        });
        setRoomReserveAllList(roomReserveAllArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // ========================================================

  return (
    <div className="room-wrap">
      {/* <div className="btn-group">
        <Button type="primary" onClick={sortNames}>
          이름순
        </Button>
      </div> */}
      <div className="grid-col-10">
        {roomAllList.map((rooms, idx) => {
          // console.log("rooms : ", rooms, "Key : ", `rooms-${idx + 1}`);
          return (
            (checkedListRoomControl.length > 0 ? (checkedListRoomControl?.find((checked)=>checked === rooms.value.state_summary)?true:false) : true) &&
            <div key={`rooms-${idx}`}>
              <Card
                rooms={rooms}
                roomTypeAllList={roomTypeAllList}
                roomReserveAllList={roomReserveAllList}
              />
              </div>
            
          );
        })}
      </div>
    </div>
  );
};

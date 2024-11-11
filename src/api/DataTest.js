import React, { useEffect, useState } from "react";
import {
  api,
  appSearchApi,
  appIdApi,
  accomSearchApi,
  accomIdApi,
  userSearchApi,
  userAllByAccomSearchApi,
  userIdApi,
  roomAllByAccomSearchApi,
  roomInfoOnlyApi,
  roomTypeAllByAccomSearchApi,
  roomTypeInfoOnlyApi,
  doorLockAllByAccomSearchApi,
  doorLockInfoOnlyApi,
} from "../api/api";
import { useAuth } from "../login/AuthContext";
// import { useApi } from "../api/api";

export const DataTest = () => {
  const { user } = useAuth();

  // console.log(
  //   "user ===> ",
  //   Object.entries(user.users)[0][1].accessible_accom_ids
  // );

  const [appId, setAppId] = useState([]);
  const [accomId, setAccomId] = useState([]);
  const [userIdKey, setUserIdKey] = useState([]);
  const [userId, setUserId] = useState([]);

  // ========================================================
  // App-search : app 정보 검색
  const [appAllList, setAppAllList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await appSearchApi();
        const resArray = Object.entries(res.apps);
        const appAllArray = resArray.map(([key, value]) => {
          // 여기서 원하는 변환 작업을 수행
          return {
            key: key,
            value: value,
          };
        });

        // 결과 확인
        setAppAllList(appAllArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // App-id : 단일 app정보
  const [appOnlyList, setAppOnlyList] = useState([]);
  useEffect(() => {
    const fetchData = async (appId) => {
      try {
        const res = await appIdApi();
        setAppId(Object.keys(user.apps));
        setAppOnlyList(res.apps[appId]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // ========================================================
  // Accom-search : 업소 검색
  const [accomAllList, setAccomAllList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await accomSearchApi();
        const resArray = Object.entries(res.accoms);
        const accomAllArray = resArray.map(([key, value]) => {
          // setAccomId(key);
          return {
            key: key,
            value: value,
          };
        });
        setAccomAllList(accomAllArray);
        // console.log(accomAllList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Accom-id : 업소 정보
  const [accomOnlyList, setAccomOnlyList] = useState([]);
  useEffect(() => {
    const fetchData = async (accomId) => {
      try {
        const res = await accomIdApi();
        setAccomId(Object.entries(user.users)[0][1].accessible_accom_ids);
        setAccomOnlyList(res.accoms[accomId]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // ========================================================
  // User-search : 유저 검색
  const [userAllList, setUserAllList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userSearchApi();
        const resArray = Object.entries(res.users);
        const userAllArray = resArray.map(([key, value]) => {
          setUserIdKey(key);
          return {
            key: key,
            value: value,
          };
        });
        setUserId(Object.entries(user.users)[0][1].user_id);
        setUserAllList(userAllArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // User all-by-accom : accessible_accom_ids에 포함되는 모든 유저 정보
  const [userAccomIdList, setUserAccomIdList] = useState([]);
  useEffect(() => {
    const fetchData = async (accomId) => {
      try {
        const res = await userAllByAccomSearchApi();
        setUserAccomIdList(res.users[accomId]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // User-id : 유저 정보
  const [userIdDetail, setUserIdDetail] = useState([]);
  useEffect(() => {
    const fetchData = async (userId) => {
      try {
        const res = await userIdApi();
        setUserIdDetail(res.users[userId]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // ========================================================
  // ========================================================
  const [roomTypeId, setRoomTypeId] = useState([]);
  const [roomId, setRoomId] = useState([]);

  // Room all-by-accom : accom에 등록된 모든 room 정보
  const [roomAllList, setRoomAllList] = useState([]);
  useEffect(() => {
    const fetchData = async (accomId) => {
      try {
        const res = await roomAllByAccomSearchApi();
        const resArray = Object.entries(res.rooms);
        const roomAllArray = resArray.map(([key, value]) => {
          // setRoomId(key);
          return {
            key: key,
            value: value,
          };
        });
        setRoomAllList(roomAllArray);
        console.log(res);

        roomAllList.map((item) => {
          setRoomTypeId(item.value.room_type_id);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Room - accom-id + room-id : 객실 정보를 1개
  const [roomInfo, setRoomInfo] = useState([]);
  useEffect(() => {
    const fetchData = async (roomId) => {
      try {
        const res = await roomInfoOnlyApi();
        setRoomInfo(res.rooms[roomId]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // ========================================================
  // RoomType all-by-accom : accom에 등록된 모든 room_type 정보
  const [roomTypeIdList, setRoomTypeIdList] = useState([]);
  const [roomTypeAllList, setRoomTypeAllList] = useState([]);
  useEffect(() => {
    const fetchData = async (accomId) => {
      try {
        const res = await roomTypeAllByAccomSearchApi();
        const resArray = Object.keys(res.room_types);
        setRoomTypeIdList(resArray);
        const resArray2 = Object.entries(res.room_types);
        setRoomTypeAllList(resArray2);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // RoomType - accom-id + roomType-id : 객실 유형 정보를 1개
  const [roomTypeInfo, setRoomTypeInfo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await roomTypeInfoOnlyApi();
        const resArray = Object.entries(res.room_types);
        setRoomTypeInfo(resArray);
        // console.log(res.room_types);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // ========================================================
  // DoorLock all-by-accom : accom에 등록된 모든 room_type 정보
  const [doorLockIdList, setDoorLockIdList] = useState([]);
  const [doorLockAllList, setDoorLockAllList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await doorLockAllByAccomSearchApi();
        const resArray = Object.entries(res.door_locks);
        setDoorLockAllList(resArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // DoorLock - accom-id + door-lock-id : 도어락 정보를 1개
  const [doorLockInfo, setDoorLockInfo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await doorLockInfoOnlyApi();
        const resArray = Object.entries(res.door_locks);
        setDoorLockInfo(resArray);
        // console.log(res.door_locks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>App정보 리스트 (총 : {appAllList.length})</h1>
      <div className="grid-col-5">
        {appAllList.map((apps, idx) => {
          return (
            <ul
              key={`app-list-${idx + 1}`}
              style={{ border: "1px solid #eee", marginBottom: "8px" }}
            >
              <li className="key">
                {idx + 1} - appId(no.{apps.value.no})
              </li>
              <li className="value">{apps.key}</li>
              <li className="key">name: {apps.value.name}</li>
            </ul>
          );
        })}
      </div>

      <h2>App-ID : {appId} 단일 정보</h2>
      <div>개발사 : {appOnlyList.bender}</div>

      <hr />
      <h1 style={{ color: "green" }}>Accom-ID 가져오기 : {accomId}</h1>
      <h1>업체 리스트 (총 : {accomAllList.length})</h1>
      <div className="grid-col-5">
        {accomAllList.map((apps, idx) => {
          return (
            <ul
              key={`app-list-${idx + 1}`}
              style={{ border: "1px solid #eee", marginBottom: "8px" }}
            >
              <li className="key">
                {idx + 1}. app_id (no.{apps.value.no})
              </li>
              <li className="value">{apps.key}</li>
              <li className="key">name</li>
              <li className="value">{apps.value.name}</li>
            </ul>
          );
        })}
      </div>

      <h1>전체 업체 정보</h1>
      <div className="grid-col-3">
        {accomAllList.map((apps, idx) => {
          return (
            <ul
              style={{
                textAlign: "left",
                border: "1px solid #eee",
                marginBottom: "8px",
              }}
              key={`user-info-${idx}`}
            >
              <li>
                {idx + 1}. accom_id : {apps.key}
              </li>
              <li>user_name : {apps.value.name}</li>
              <li>no : {apps.value.no}</li>
              <li>우편번호 : {apps.value.address.zip_code}</li>
              <li>
                상세주소 : {apps.value.address.sido_name}&nbsp;
                {apps.value.address.sigungu_name}&nbsp;
                {apps.value.address.detail}
                &nbsp;
                {apps.value.address.road_name}&nbsp;
                {apps.value.address.building_no}
              </li>
              <li>도어락 갯수 : {apps.value.door_lock_count}</li>
              <li>키오스크 갯수 : {apps.value.kiosk_count}</li>
              <li>전화번호 : {apps.value.tel}</li>
              <li>룸 갯수 : {apps.value.room_count}</li>
              <li>고객 메시지 : {apps.value.usage_expire.message}</li>
            </ul>
          );
        })}
      </div>

      <h2>Accom-ID : {accomId} 단일정보</h2>
      <ul>
        <li>no : {accomOnlyList.no}</li>
        <li>room_count : {accomOnlyList.room_count}</li>
        <li>door_lock_count : {accomOnlyList.door_lock_count}</li>
        <li>kiosk_count : {accomOnlyList.kiosk_count}</li>
        <li>name : {accomOnlyList.name}</li>
        <li>zip_code : {accomOnlyList.zip_code}</li>
        <li>
          address : {accomOnlyList.sido_name}&nbsp;
          {accomOnlyList.sigungu_name}&nbsp;
          {accomOnlyList.detail}&nbsp;
          {accomOnlyList.road_name}&nbsp;
          {accomOnlyList.building_no}&nbsp;
        </li>
        <li>tel : {accomOnlyList.tel}</li>
        <li>usage_expire : {accomOnlyList?.usage_expire?.message}</li>
      </ul>

      <hr />
      <h1>유저 리스트 (총 : {userAllList.length})</h1>
      <div className="grid-col-5">
        {userAllList.map((users, idx) => {
          return (
            <ul
              key={`users-list-${idx}`}
              style={{ border: "1px solid #eee", marginBottom: "8px" }}
            >
              <li className="key">
                {idx + 1}. UserId-Key (no: {users.value.no})
              </li>
              <li className="value">{users.key}</li>
              <li className="key">{users.value.phone}</li>
              <li>user_id : {users.value.user_id}</li>
            </ul>
          );
        })}
      </div>

      <h1>유저의 Accom-ID : {accomId} - 업체리스트 뽑기</h1>
      {userAccomIdList ? userAccomIdList : "데이터 없음"}

      <h1>유저 정보 - (userId : {userId})</h1>
      <ul>
        <li>e-mail : {userIdDetail.email}</li>
        <li>admin_memo : {userIdDetail.admin_memo}</li>
      </ul>

      <h1>accom-id당 등록된 전체 룸정보 - 총 : {roomAllList.length}</h1>
      {roomAllList.map((rooms, idx) => {
        return (
          <ul
            style={{ border: "1px solid red", flexWrap: "wrap" }}
            className="flex-row"
            key={`room-list-${idx}`}
          >
            <li>RoomId : {rooms.key} | </li>
            <li>AccomId : {rooms.value.accom_id} | </li>
            <li>{rooms.value.card_barcode} |</li>
            <li>호수: {rooms.value.display_name} |</li>
            <li>층수: {rooms.value.floor} |</li>
            <li>no: {rooms.value.no} |</li>
            {/* <li>
              {rooms.value.lights[0].display_name} - {rooms.value.lights[0].on}
              {rooms.value.lights[1].display_name} - {rooms.value.lights[1].on}
              {rooms.value.lights[2].display_name} - {rooms.value.lights[2].on}
              {rooms.value.lights[3].display_name} - {rooms.value.lights[3].on}
            </li> */}
            <li>RoomTypeId : {rooms.value.room_type_id} |</li>
          </ul>
        );
      })}

      <h1>룸 아이디 - 총 : {roomAllList.length}</h1>
      {roomAllList.map((rooms, idx) => {
        return (
          <ul key={`roomid-${idx}`}>
            <li>{rooms.key}</li>
          </ul>
        );
      })}

      <h1>room-id당 룸 1개정보</h1>
      <ul>
        <li>{roomInfo.no}</li>
        <li>{roomInfo.accom_id}</li>
      </ul>

      <h2>roomInfo key값</h2>
      {roomInfo.key}

      <h1>
        accom-id당 등록된 전체 룸타입 정보 - 총 : {roomTypeAllList.length}
      </h1>
      {roomTypeAllList.map((roomtype, idx) => {
        return (
          <ul className="flex-row" key={`roomtype-${idx}`}>
            <li>{roomtype[0]} - </li>
            <li>{roomtype[1].display_name}</li>
          </ul>
        );
      })}

      <h1>room-type-id</h1>
      {roomTypeIdList.map((roomtypeId, idx) => {
        return (
          <ul key={`roomtypeId-${idx}`}>
            <li>{roomtypeId}</li>
            <li></li>
            <li></li>
          </ul>
        );
      })}

      <h1>room-type-id의 객실 유형 정보 1개</h1>
      {roomTypeInfo.map((roomtypeinfo, idx) => {
        // console.log(roomtypeinfo);
        return (
          <ul key={`roomtypeinfo-${idx}`}>
            <li>room-type-id : {roomtypeinfo[0]}</li>
            <li>{roomtypeinfo[1].display_name}</li>
            {/* <li>
              {roomtypeinfo[1].days_pricing[0].name} -
              {roomtypeinfo[1].days_pricing[0].basic_price}
            </li> */}
          </ul>
        );
      })}

      <h1>door-lock-id</h1>
      {doorLockAllList.map((doorlock, idx) => {
        return (
          <ul key={`doorlock-${idx}`} className="flex-row">
            <li>door-lock-id : {doorlock[0]}★</li>
            <li>accom_id : {doorlock[1].accom_id}★</li>
            <li>room_id : {doorlock[1].room_id}</li>
          </ul>
        );
      })}

      <h1>door-lock-id의 도어락 정보를 1개</h1>
      {doorLockInfo.map((doorlockinfo, idx) => {
        return (
          <ul key={`doorlockinfo-${idx}`}>
            <li>door-lock-id : {doorlockinfo[0]}</li>
            <li>accom_id : {doorlockinfo[1].accom_id}</li>
            <li>room_id : {doorlockinfo[1].room_id}</li>
            <li>master_password : {doorlockinfo[1].master_password}</li>
            <li>update_time : {doorlockinfo[1].update_time}</li>
            <li>vender : {doorlockinfo[1].vender}</li>
          </ul>
        );
      })}
    </div>
  );
};

import axios from "axios";

const token = sessionStorage.getItem("token");
export const api = axios.create({
  baseURL: `https://api.icrew.cloud/v1`, // 기본 서버 주소 입력
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const appId = sessionStorage.getItem("appId");
const userId = sessionStorage.getItem("savedUsername");
const accomId = sessionStorage.getItem("accomId");

const doorLockId = ["1a8tDggNcNL81xpCjQ3s"];

// App-search : app 정보 검색
export const appSearchApi = async () => {
  const res = await api.get(`/app-search`, {
    params: {
      limit: 100,
      start_after: "",
      search: "",
    },
  });
  return res.data;
};

// App-id : 단일 app정보
export const appIdApi = async () => {
  const res = await api.get(`/app/${appId}`, {
    params: {},
  });
  return res.data;
};

// Accom-search : 업소 검색
export const accomSearchApi = async () => {
  const res = await api.get(`/accom-search`, {
    params: {
      limit: 5,
      start_after: "",
      search: "",
    },
  });
  return res.data;
};

// Accom-id : 업소 정보
export const accomIdApi = async () => {
  const res = await api.get(`/accom/${accomId}`, {
    params: {},
  });
  return res.data;
};

// User-search : 유저 검색
export const userSearchApi = async () => {
  const res = await api.get(`/user-search`, {
    params: {
      limit: 5,
      start_after: "",
      search: "",
    },
  });
  return res.data;
};

// User all-by-accom : accessible_accom_ids에 포함되는 모든 유저 정보
export const userAllByAccomSearchApi = async () => {
  const res = await api.get(`/user/all-by-accom/${accomId}`, {
    params: {},
  });
  return res.data;
};

// User-id : 유저 정보
export const userIdApi = async () => {
  const res = await api.get(`/user/${userId}`, {
    params: {},
  });
  return res.data;
};

// ===================================================================
// Room all-by-accom : accom에 등록된 모든 room 정보
export const roomAllByAccomSearchApi = async () => {
  const res = await api.get(`/room/all-by-accom/${accomId}`, {
    params: {},
  });
  return res.data;
};

// Room - accom-id + room-id : 객실 정보를 1개
export const roomInfoOnlyApi = async (roomId) => {
  const res = await api.get(`/room/${accomId}/${roomId}`, {
    params: {},
  });
  return res.data;
};

// Room :객실 정보를 업데이트 한다.
export const roomUpdateApi = async (roomId, param) => {
  const res = await api.put(`/room/${accomId}/${roomId}`, param);
  return res.data;
};

// ===================================================================
// RoomType all-by-accom : accom에 등록된 모든 room_type 정보
export const roomTypeAllByAccomSearchApi = async () => {
  const res = await api.get(`/room-type/all-by-accom/${accomId}`, {
    params: {},
  });
  return res.data;
};

// RoomType - accom-id + roomType-id : 객실 유형 정보를 1개
export const roomTypeInfoOnlyApi = async (roomTypeId) => {
  const res = await api.get(`/room-type/${accomId}/${roomTypeId}`, {
    params: {},
  });
  return res.data;
};

// ===================================================================
// DoorLock all-by-accom : accom에 등록된 모든 room_type 정보
export const doorLockAllByAccomSearchApi = async () => {
  const res = await api.get(`/door-lock/all-by-accom/${accomId}`, {
    params: {},
  });
  return res.data;
};

// DoorLock - accom-id + door-lock-id : 도어락 정보를 1개
export const doorLockInfoOnlyApi = async (accomId, doorLockId) => {
  const res = await api.get(`/door-lock/${accomId}/${doorLockId}`, {
    params: {},
  });
  return res.data;
};

// RoomSaleSearch : 객실 입실 이력 조회
export const roomSaleSearchApi = async (startDateTime) => {
  const res = await api.get(`/room-sale/${accomId}`, {
    params: {
      // accom_id: `${accomId}`,
      limit: "100",
      "start-at": startDateTime,
    },
  });
  return res.data;
};

// RoomSaleSearch : 객실 상태 변경 이력 조회
export const roomStateLogApi = async (startDateTime) => {
  const res = await api.get(`/room-state-log/${accomId}`, {
    params: {
      // accom_id: `${accomId}`,
      limit: "100",
      "start-at": startDateTime,
    },
  });
  return res.data;
};

// RoomStateLogSearch : 객실별 상태 변경 이력 조회
export const roomStateLogApi_roomId = async (
  startDateTime,
  endDateTime,
  roomId,
  containsKey
) => {
  const res = await api.get(`/room-state-log/${accomId}`, {
    params: {
      limit: "100",
      "start-at": startDateTime,
      "end-at": endDateTime,
      "room-id": roomId,
      "contains-key": containsKey,
    },
  });
  return res.data;
};

// RoomSaleSearch : 마일리지 회원 조회
export const MileageMemberSearchApi = async (memberPhoneNum) => {
  const res = await api.get(`/mileage-member/${accomId}/` + memberPhoneNum, {
    params: {},
  });
  return res.data;
};

// ===================================================================
// RoomSalePayment : 객실 매출 이력 조회
export const roomSalePaymentApi = async (startDateTime) => {
  const res = await api.get(`/room-sale/payment/${accomId}`, {
    params: {
      // accom_id: `${accomId}`,
      limit: "10",
      "start-at": "1728324840000",
      // "start-at": startDateTime,
    },
  });
  return res.data;
};

// RoomSale : 매출 정보를 가져온다.
export const roomSaleInfoOnlyApi = async (roomSaleId) => {
  const res = await api.get(`/room-sale/${accomId}/${roomSaleId}`, {
    params: {},
  });
  return res.data;
};

// RoomSale : 매출 정보를 업데이트 한다.
export const roomSaleUpdateApi = async (roomSaleId, param) => {
  const res = await api.put(`/room-sale/${accomId}/${roomSaleId}`, param);
  return res.data;
};

// RoomSale : 매출 정보를 업데이트 한다.
export const roomSaleInsertApi = async (param) => {
  const res = await api.post(`/room-sale/${accomId}`, param);
  return res.data;
};

// ===================================================================
// RoomReserve : 예약 정보를 가져온다.
export const roomReserveAllByAccomSearchApi = async () => {
  const res = await api.get(`/room-reserve/all-by-reserved/${accomId}`, {
    params: {},
  });
  return res.data;
};

// RoomReserve : 예약키로 예약 정보 단건을 가져온다.
export const roomReserveSelectOneApi = async (room_reserve_id) => {
  const res = await api.get(`/room-reserve/${accomId}/${room_reserve_id}`, {
    params: {},
  });
  return res.data;
};

// RoomReserve : 예약키로 예약 정보 업데이트.
export const roomReserveUpdateApi = async (room_reserve_id, param) => {
  const res = await api.put(`/room-reserve/${accomId}/${room_reserve_id}`, {
    param,
  });
  return res.data;
};

// ===================================================================
// ReserveAgent : accom에 등록된 모든 예약 연동 설정을 가져온다.
export const reserveAgentAllByAccomSearchApi = async () => {
  const res = await api.get(`/reserve-agent-config/all-by-accom/${accomId}`, {
    params: {},
  });
  return res.data;
};

// ===================================================================

import { Form, Input, Button, Checkbox, message } from "antd";
import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "./AuthContext";
import { useCode } from "./CodeContext";

export const Login = () => {
  const { login } = useAuth();
  const { codeload } = useCode();
  const [form] = Form.useForm();

  // 로컬 스토리지에서 ID와 비밀번호 불러오기
  useEffect(() => {
    const savedUsername = localStorage.getItem("savedUsername");
    // const savedPassword = localStorage.getItem("savedPassword");
    if (savedUsername) {
      form.setFieldsValue({ username: savedUsername });
    }
    // if (savedPassword) {
    //   form.setFieldsValue({ password: savedPassword });
    // }
  }, [form]);

  const onFinish = async (values) => {
    try {
      const response = await api.post(`token/user`, {
        app_id: "LAZ68DrmYpWDx41LpQPY",
        user_id: values.username,
        password: values.password,
      });
      login(response.data); // AuthContext : 로그인 상태 업데이트

      // CodeContext : 공통 코드 업데이트
      const accomId = Object.entries(response.data.users)[0][1]
        .accessible_accom_ids[0];
      console.log(response.data);
      if (accomId !== null) {
        const resRoomCode = await api.get(`/room/all-by-accom/${accomId}`, {
          params: {},
          headers: { Authorization: `Bearer ${response.data.token}` },
        });
        console.log(resRoomCode);
        codeload("room", resRoomCode.data.rooms);

        const resRoomTypeCode = await api.get(
          `/room-type/all-by-accom/${accomId}`,
          {
            params: {},
            headers: { Authorization: `Bearer ${response.data.token}` },
          }
        );
        codeload("roomType", resRoomTypeCode.data.room_types);
      }
      codeload("state", {
        GENERATED: "자동예약",
        RESERVED: "정상예약",
        USING: "사용중",
        CANCLED: "예약취소",
        USED: "사용완료",
      });
      codeload("stayType", {
        HOURS: "대실",
        DAYS: "숙박",
        LONG_DAYS: "장기",
        OTHER: "기타",
      });
      codeload("agentType", {
        YANOLJA: "야놀자(M)",
        YANOLJA_HOTEL: "야놀자(H)",
        GOOD_CHOICE: "여기어때(M)",
        GOOD_CHOICE_HOTEL: "여기어때(H)",
        NAVER: "네이버",
        AIR_BNB: "에어비엔비",
        AGODA: "아고다",
        EXPEDIA: "익스피디아",
        ONDA: "온다",
        BOOKING_HOLDINGS: "부킹닷컴",
        KULL_STAY: "꿀스테이",
        DDNAYO: "떠나요",
        FRONT: "프론트",
        OTHER: "기타",
      });
      codeload("stateType", {
        EMPTY: "퇴실",
        USING: "입실",
        OUTING: "외출",
        CLEANING: "청소중",
        INSPECT_ORDER: "점검요청",
        INSPECTING: "점검중",
        CLEAN_ORDER: "청소요청",
      })
      window.location.reload();

      // 체크박스가 선택되어 있다면 ID와 비밀번호 저장
      if (values.remember) {
        localStorage.setItem("savedUsername", values.username);
        // localStorage.setItem("savedPassword", values.password);
      } else {
        localStorage.removeItem("savedUsername");
        // localStorage.removeItem("savedPassword");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      message.error("로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-form">
      <h2>로그인</h2>
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label="ID"
          name="username"
          rules={[{ required: true, message: "사용자 이름을 입력하세요!" }]}
        >
          <Input placeholder="사용자 이름" />
        </Form.Item>

        <Form.Item
          label="PW"
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력하세요!" }]}
        >
          <Input.Password placeholder="비밀번호" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>ID 기억하기</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            로그인
          </Button>
        </Form.Item>

        <h5>관리자 권한 로그인 추가 예정</h5>
      </Form>
    </div>
  );
};

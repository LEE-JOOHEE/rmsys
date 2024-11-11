import React, { createContext, useContext, useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // console.log(JSON.stringify(user, null, 2));

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 사용자 정보를 불러옵니다.
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const savedUser = sessionStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser)); // 문자열을 객체로 변환하여 설정
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("token", userData.token); // 토큰 저장
    sessionStorage.setItem("user", JSON.stringify(userData)); // 사용자 정보 저장
    sessionStorage.setItem("appId", Object.keys(userData.apps)); // appId 저장
    sessionStorage.setItem(
      "accomId",
      Object.entries(userData.users)[0][1].accessible_accom_ids[0]
    ); // accomId 저장
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("token"); // 토큰 삭제
    sessionStorage.removeItem("user"); // 사용자 정보 삭제
    sessionStorage.removeItem("appId"); // appId 삭제
    sessionStorage.removeItem("accomId"); // accomId 삭제
    sessionStorage.removeItem("code"); // code 삭제
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// 비밀번호 해시 함수
export const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};

import React, { createContext, useContext, useEffect, useState } from "react";

const CodeContext = createContext();

export const CodeProvider = ({ children }) => {
  const [code, setCode] = useState({});

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 코드 정보를 불러옵니다.
  useEffect(() => {
    const code = sessionStorage.getItem("code");

    if (code) {
      setCode(JSON.parse(code)); // 문자열을 객체로 변환하여 설정
    }
  }, []);

  const codeload = (codekey, codeData) => {
    code[codekey] = codeData;
    sessionStorage.setItem("code", JSON.stringify(code)); // 토큰 저장
    setCode(code);
  };

  const coderead = () => {
    return code;
  };

  return (
    <CodeContext.Provider value={{ code, codeload, coderead }}>
      {children}
    </CodeContext.Provider>
  );
};

export const useCode = () => {
  return useContext(CodeContext);
};

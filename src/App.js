import "./App.css";
import "../src/fonts/font.css";
import { Container } from "./commonComp/Container";
import { Button, ConfigProvider } from "antd";
import { DataTest } from "./api/DataTest";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Z_NotFoundSample } from "./commonComp/Z_NotFoundSample";
import { Login } from "./login/Login";
import { useAuth } from "./login/AuthContext";
import { WechatOutlined } from "@ant-design/icons";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <div className="App">
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              // colorPrimary: "#00b96b",
              colorPrimary: "#7c3ef2",
              borderRadius: 4,

              // Alias Token
              // colorBgContainer: "#f6ffed",
              colorBgContainer: "#f9f9f9",
            },
          }}
        >
          {/* {user === null ? (
            <Login user={user} />
          ) : ( */}
            <Container user={user}>
              <Routes>
                <Route path="/" element={<Container />}></Route>
                <Route path="/view" element={<Container />}></Route>
                <Route path="/edit" element={<Container />}></Route>
                <Route path="/list" element={<Container />}></Route>
                <Route path="/manage" element={<Container />}></Route>
                <Route path="/setting" element={<Container />}></Route>
                <Route path="/reserve" element={<Container />}></Route>
                <Route path="/dashbord" element={<Container />}></Route>
                {/* <Route path="/test/*" element={<DataTest />}></Route> */}
                <Route path="/test" element={<DataTest />}></Route>
                <Route path={["*", "/404"]} element={<Container />}></Route>
              </Routes>
            </Container>
          {/* )} */}

          <Button className="btn-chat-icon">
            <WechatOutlined />
          </Button>
        </ConfigProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;

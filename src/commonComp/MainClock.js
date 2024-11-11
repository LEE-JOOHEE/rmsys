import React from "react";
import Clock from "react-live-clock";
import "../common.css";

export const MainClock = ({ accomOnlyList }) => {
  return (
    <>
      <div className="login-name">{accomOnlyList[0]?.name}</div>
      <>
        <Clock
          format={"YYYY-MM-DD"}
          ticking={true}
          timezone={"Rok"}
          className="clock-date"
        />
        <Clock
          format={"HH:mm:ss"}
          ticking={true}
          timezone={"Rok"}
          className="clock-time"
        />
      </>
    </>
  );
};

export default MainClock;

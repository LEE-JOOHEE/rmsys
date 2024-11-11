import { Button, Card } from "antd";
import React from "react";
import { CloseOutlined } from "@ant-design/icons";

export const NotificationCard = ({ id, title, content, onClose }) => {
  return (
    <Card
      size="small"
      title={<div className="font-18-200">{title}</div>}
      extra={
        <CloseOutlined
          style={{ fontSize: "20px", color: "#fff" }}
          onClick={() => onClose(id)}
        />
      }
      style={{
        width: "100%",
      }}
    >
      <p className="font-15-500" style={{ color: "#490DBB" }}>
        {content}
      </p>
    </Card>
  );
};

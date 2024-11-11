import React, { useState } from "react";
import koKR from "antd/lib/locale/ko_KR";
import { Button, ConfigProvider, Input, InputNumber, Table } from "antd";
import { handleInputNumberKeyDown, handleInputNumberOnInput } from "../util";

export const QRTextManage = () => {
  // 테이블 데이터 예시
  const data = [
    {
      key: "1",
      name: "204",
      room_type: "일반실",
      phone: "",
      status: null,
    },
    {
      key: "2",
      name: "207",
      room_type: "VIP",
      phone: "01075531234",
      status: null,
    },
    {
      key: "3",
      name: "701",
      room_type: "일반실",
      phone: "",
      status: null,
    },
    {
      key: "4",
      name: "502",
      room_type: "파티룸",
      phone: "01075595716",
      status: null,
    },
  ];

  const [dataSource, setDataSource] = useState(data);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20 });

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (pagination, filters, sorter, e) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
    setPagination(pagination);
  };
  const handleInputChange = (key, column, value) => {
    const newData = dataSource.map((item) => {
      if (item.key === key) {
        return { ...item, [column]: value }; // 해당 컬럼 업데이트
      }
      return item;
    });
    setDataSource(newData);
  };

  const columns = [
    {
      title: "No.",
      render: (text, record, index) => index + 1,
      width: "10%",
      align: "center",
    },
    {
      title: "객실명",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "객실유형",
      dataIndex: "room_type",
      key: "room_type",
      align: "center",
    },
    {
      title: "휴대폰번호",
      dataIndex: "phone",
      key: "phone",
      render: (_, record) => {
        return (
          <Input
            type="phone"
            defaultValue={record.phone}
            maxLength={11}
            onChange={(value) => handleInputChange(record.key, "phone", value)}
            onKeyDown={handleInputNumberKeyDown}
            onInput={handleInputNumberOnInput}
          />
        );
      },
      align: "center",
    },
    {
      title: "발송상태",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "재발송",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => console.log("재발송 :", record)}
        >
          재발송
        </Button>
      ),
      width: "10%",
      align: "center",
    },
  ];

  return (
    <div className="p-16 pb-0">
      <h2 className="mb-16">QR/OTP SMS 발송 관리</h2>

      <ConfigProvider locale={koKR}>
        <div className="table-wrap-antd">
          <Table
            columns={columns}
            dataSource={data}
            onChange={handleChange}
            pagination={pagination}
            rowKey="key"
            scroll={{ y: "32.5rem" }}
            className="ant-table-respons"
          />
        </div>
      </ConfigProvider>
    </div>
  );
};

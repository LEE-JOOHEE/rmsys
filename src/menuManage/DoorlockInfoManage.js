import React, { useState } from "react";
import koKR from "antd/lib/locale/ko_KR";
import { Button, ConfigProvider, Popconfirm, Table } from "antd";

export const DoorlockInfoManage = ({ roomAllList, doorLockAllList }) => {
  // console.log("roomAllList ==> ", roomAllList);
  // console.log("doorLockAllList ==> ", doorLockAllList);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 100 });

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
    setPagination(pagination);
  };
  const handleDelete = (key) => {
    console.log(`삭제된 ID: ${key}`);
  };

  const columns = [
    {
      title: "No.",
      render: (text, record, index) => index + 1,
      width: "10%",
      align: "center",
    },
    {
      title: "설치객실",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        const room = roomAllList.find((rooms) => rooms.key === record.roomId);
        if (room) {
          return <>{room.value.display_name}</>;
        }
        return null;
      },
      sorter: (a, b) => {
        const roomA = roomAllList.find((rooms) => rooms.key === a.roomId);
        const roomB = roomAllList.find((rooms) => rooms.key === b.roomId);
        if (roomA && roomB) {
          return roomA.no.localeCompare(roomB.no);
        }
        return 0; // 같은 경우
      },
      align: "center",
    },
    {
      title: "제조사",
      dataIndex: "vender",
      key: "vender",
      render: (_, record) => record.value.vender,
      width: "10%",
      align: "center",
    },
    {
      title: "비밀번호",
      dataIndex: "master_password",
      key: "master_password",
      render: (_, record) => record.value.master_password,
      width: "15%",
      align: "center",
    },
    {
      title: "볼륨",
      dataIndex: "volume",
      key: "volume",
      render: (_, record) => record.value.volume,
      width: "10%",
      align: "center",
    },
    {
      title: "OPT버전",
      dataIndex: "otp_protocol_version",
      key: "otp_protocol_version",
      render: (_, record) => record.value.otp_protocol_version,
      width: "10%",
      align: "center",
    },
    {
      title: "QR버전",
      dataIndex: "qr_protocol_version",
      key: "qr_protocol_version",
      render: (_, record) => record.value.qr_protocol_version,
      width: "10%",
      align: "center",
    },
    {
      title: "RF버전",
      dataIndex: "rf_protocol_version",
      key: "rf_protocol_version",
      render: (_, record) => record.value.rf_protocol_version,
      width: "10%",
      align: "center",
    },
    {
      title: "삭제",
      key: "삭제",
      render: (_, record) => {
        const room = roomAllList.find((rooms) => rooms.key === record.roomId);
        return (
          <Popconfirm
            title={
              <>
                <h4>정말 삭제하시겠습니까?</h4>
                <h5>
                  이 작업은 되돌릴 수 없으며, <br />
                  <span className="text-red h5 pr-4">{room?.no}</span>
                  도어락과 관련된 정보들은 영구 소실됩니다.
                </h5>
              </>
            }
            placement="rightTop"
            onConfirm={() => handleDelete(record.key)}
            okText="삭제"
            cancelText="아니오"
          >
            <Button type="primary" danger size="small">
              삭제
            </Button>
          </Popconfirm>
        );
      },
      width: "10%",
      align: "center",
    },
  ];

  return (
    <div className="p-16 pb-0">
      <h2 className="mb-16">도어락 정보 관리</h2>

      <ConfigProvider locale={koKR}>
        <div className="table-wrap-antd">
          <Table
            columns={columns}
            dataSource={doorLockAllList}
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

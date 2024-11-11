import React, { useContext, useEffect, useRef, useState } from "react";
import koKR from "antd/lib/locale/ko_KR";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
} from "antd";
import { handleInputNumberKeyDown, handleInputNumberOnInput } from "../util";

export const RoomTypeManage = ({ roomTypeAllList }) => {
  console.log("roomTypeAllList ==> ", roomTypeAllList);
  const [dataSource, setDataSource] = useState(roomTypeAllList);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20 });

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
    setPagination(pagination);
  };

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    console.log("dataSource ==> ", newData);
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
      title: "객실 유형명",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <Input
            defaultValue={record.value.display_name}
            onChange={(e) =>
              handleInputChange(record.key, "name", e.target.value)
            }
          />
        );
      },
      align: "center",
    },
    {
      title: "기본 인원",
      dataIndex: "basic_capacity",
      key: "basic_capacity",
      render: (_, record) => {
        return (
          <InputNumber
            min={0}
            defaultValue={record.value?.basic_capacity || 0}
            onChange={(value) =>
              handleInputChange(record.key, "basic_capacity", value)
            }
            onKeyDown={handleInputNumberKeyDown}
            onInput={handleInputNumberOnInput}
          />
        );
      },
      width: "15%",
      align: "center",
    },
    {
      title: "최대 인원",
      dataIndex: "maximum_capacity",
      key: "maximum_capacity",
      render: (_, record) => {
        return (
          <InputNumber
            min={0} // 최소값 설정
            defaultValue={record.value?.maximum_capacity || 0}
            onChange={(value) =>
              handleInputChange(record.key, "maximum_capacity", value)
            }
            onKeyDown={handleInputNumberKeyDown}
            onInput={handleInputNumberOnInput}
          />
        );
      },
      width: "15%",
      align: "center",
    },
    {
      title: "저장",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => console.log("저장:", record)}
        >
          저장
        </Button>
      ),
      width: "10%",
      align: "center",
    },
    {
      title: "삭제",
      key: "삭제",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title={
              <>
                <h4>정말 삭제하시겠습니까?</h4>
                <h5>
                  이 작업은 되돌릴 수 없으며, <br />
                  <span className="text-red h5 pr-4">
                    {record.value.display_name}
                  </span>
                  객실 유형과 관련된 정보들은 영구 소실됩니다.
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
        ) : null,
      width: "10%",
      align: "center",
    },
  ];

  return (
    <div className="p-16 pb-0">
      <h2 className="mb-16">객실 유형 정보 관리</h2>

      <ConfigProvider locale={koKR}>
        <div className="table-wrap-antd">
          <Table
            columns={columns}
            dataSource={roomTypeAllList}
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

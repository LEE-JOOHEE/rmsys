import {
  Button,
  Checkbox,
  ConfigProvider,
  Popconfirm,
  Select,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import koKR from "antd/lib/locale/ko_KR";
import {
  roomAllByAccomSearchApi,
  roomTypeAllByAccomSearchApi,
} from "../api/api";

export const RoomInfoManage = ({
  roomAllList,
  setRoomAllList,
  roomTypeAllList,
  setRoomTypeAllList,
}) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20 });

  // 객실이름 필터
  const filteredName = [
    ...new Set(roomAllList?.map((item) => item.value.display_name)),
  ].map((name) => ({
    text: name,
    value: name,
  }));

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
    setPagination(pagination);
  };
  const handleSelectChange = (value, record) => {
    console.log(`Selected: ${value} for ${record.value.display_name}`);
  };
  const handleDelete = (key) => {
    console.log(`삭제된 ID: ${key}`);
  };
  const [checked, setChecked] = useState(false);
  const onChangeCheckbox = (e) => {
    // console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };

  // 테이블 컬럼 생성
  const columns = [
    {
      title: "No.",
      render: (text, record, index) => index + 1,
      width: "10%",
      align: "center",
    },
    {
      title: "객실이름",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => record.value.display_name,
      filterSearch: true,
      filters: filteredName,
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.value.display_name.includes(value),
      sorter: (a, b) =>
        a.value.display_name.localeCompare(b.value.display_name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
      align: "center",
    },
    {
      title: "GID",
      dataIndex: "GID",
      key: "GID",
      width: "10%",
      align: "center",
    },
    {
      title: "LID",
      dataIndex: "LID",
      key: "LID",
      width: "10%",
      align: "center",
    },
    {
      title: "객실유형",
      dataIndex: "room_type",
      key: "room_type",
      align: "center",
      render: (_, record) => (
        <Select
          placeholder="선택하세요"
          defaultValue={
            roomTypeAllList?.find(
              (roomType) => roomType.key === record.roomTypeId
            )?.value.display_name || ""
          }
          style={{ width: "100%", textAlign: "left" }}
          onChange={(value) => handleSelectChange(value, record)}
        >
          {roomTypeAllList
            .map((roomType, idx) => {
              return (
                <Select.Option
                  key={`roomType-${idx}`}
                  value={roomType.value.display_name}
                >
                  {roomType.value.display_name}
                </Select.Option>
              );
            })
            .sort((a, b) => a.props.value.localeCompare(b.props.value))}
        </Select>
      ),
      width: "20%",
    },
    {
      title: "층수",
      dataIndex: "floor",
      key: "floor",
      render: (_, record) => record.value.floor,
      width: "10%",
      align: "center",
    },
    {
      title: "바코드",
      dataIndex: "card_barcode",
      key: "card_barcode",
      render: (_, record) => record.value.card_barcode,
      width: "10%",
      align: "center",
    },
    {
      title: "키리스",
      dataIndex: "use_keyless",
      key: "use_keyless",
      render: (_, record) =>
        record.value.use_keyless ? (
          <Checkbox
            defaultChecked={record.value.use_keyless}
            onChange={onChangeCheckbox}
          />
        ) : (
          <Checkbox onChange={onChangeCheckbox} />
        ),
      width: "10%",
      align: "center",
    },
    {
      title: "삭제",
      dataIndex: "delete",
      key: "delete",
      render: (_, record) => (
        <Popconfirm
          title={
            <>
              <h4>정말 삭제하시겠습니까?</h4>
              <h5>
                이 작업은 되돌릴 수 없으며, <br />
                <span className="text-red h5 pr-4">
                  {record.value.display_name}
                </span>
                객실과 관련된 정보들은 영구 소실됩니다.
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
      ),
      width: "10%",
      align: "center",
    },
  ];

  return (
    <div className="p-16 pb-0">
      <h2 className="mb-16">객실 정보 관리</h2>

      <ConfigProvider locale={koKR}>
        <div className="table-wrap-antd">
          <Table
            columns={columns}
            dataSource={roomAllList}
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

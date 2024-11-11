import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import koKR from "antd/lib/locale/ko_KR";
import { roomSalePaymentApi } from "../api/api";
import { Button, ConfigProvider, DatePicker, Table } from "antd";
import { disabledDate, disabledTime, formatNumber } from "../util";

export const SalesInquiry = () => {
  // API 테스트
  const [roomSalePaymentList, setRoomSalePaymentList] = useState([]);
  const [columns, setColumns] = useState([]);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 15 });

  //const [startDateTime, setStartDateTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
  const [startDateTime, setStartDateTime] = useState(dayjs());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await roomSalePaymentApi(startDateTime);

        const resArray = Object.entries(res.room_payments);
        const roomPaymentArray = resArray.map(([key, value]) => {
          value.key = key;
          value.payment_date = dayjs(value.payment_date).format("YYYY-MM-DD");

          return value;
        });
        setRoomSalePaymentList(roomPaymentArray);

        let room_id_filter = [
          ...new Set(roomPaymentArray.map((item) => item.room_id)),
        ].map((room_id) => ({
          value: room_id,
          text: room_id,
        }));

        let room_type_id_filter = [
          ...new Set(roomPaymentArray.map((item) => item.room_type_id)),
        ].map((room_type_id) => ({
          value: room_type_id,
          text: room_type_id,
        }));

        let stay_type_filter = [
          ...new Set(roomPaymentArray.map((item) => item.stay_type)),
        ].map((stay_type) => ({
          value: stay_type,
          text: stay_type,
        }));

        let payment_date_filter = [
          ...new Set(roomPaymentArray.map((item) => item.payment_date)),
        ].map((payment_date) => ({
          value: payment_date,
          text: payment_date,
        }));

        let sale_channel_type_filter = [
          ...new Set(roomPaymentArray.map((item) => item.sale_channel_type)),
        ].map((sale_channel_type) => ({
          value: sale_channel_type,
          text: sale_channel_type,
        }));

        let send_account_filter = [
          ...new Set(roomPaymentArray.map((item) => item.send_account)),
        ].map((send_account) => ({
          value: send_account,
          text: send_account,
        }));

        let accepted_cash_filter = [
          ...new Set(roomPaymentArray.map((item) => item.accepted_cash)),
        ].map((accepted_cash) => ({
          value: accepted_cash,
          text: accepted_cash,
        }));

        let changed_cash_filter = [
          ...new Set(roomPaymentArray.map((item) => item.changed_cash)),
        ].map((changed_cash) => ({
          value: changed_cash,
          text: changed_cash,
        }));

        let amount_paid_creadit_card_filter = [
          ...new Set(
            roomPaymentArray.map((item) => item.amount_paid_creadit_card)
          ),
        ].map((amount_paid_creadit_card) => ({
          value: amount_paid_creadit_card,
          text: amount_paid_creadit_card,
        }));

        let credit_card_accepter_name_filter = [
          ...new Set(
            roomPaymentArray.map((item) => item.credit_card_accepter_name)
          ),
        ].map((credit_card_accepter_name) => ({
          value: credit_card_accepter_name,
          text: credit_card_accepter_name,
        }));

        let credit_card_no_filter = [
          ...new Set(roomPaymentArray.map((item) => item.credit_card_no)),
        ].map((credit_card_no) => ({
          value: credit_card_no,
          text: credit_card_no,
        }));

        let credit_card_approval_no_filter = [
          ...new Set(
            roomPaymentArray.map((item) => item.credit_card_approval_no)
          ),
        ].map((credit_card_approval_no) => ({
          value: credit_card_approval_no,
          text: credit_card_approval_no,
        }));

        let amount_paid_agent_filter = [
          ...new Set(roomPaymentArray.map((item) => item.amount_paid_agent)),
        ].map((amount_paid_agent) => ({
          value: amount_paid_agent,
          text: amount_paid_agent,
        }));

        let agent_type_filter = [
          ...new Set(roomPaymentArray.map((item) => item.agent_type)),
        ].map((agent_type) => ({
          value: agent_type,
          text: agent_type,
        }));

        let not_changed_cash_filter = [
          ...new Set(roomPaymentArray.map((item) => item.not_changed_cash)),
        ].map((not_changed_cash) => ({
          value: not_changed_cash,
          text: not_changed_cash,
        }));

        let payment_note_filter = [
          ...new Set(roomPaymentArray.map((item) => item.payment_note)),
        ].map((payment_note) => ({
          value: payment_note,
          text: payment_note,
        }));

        setColumns([
          {
            title: <div className="text-c">객실명</div>,
            dataIndex: "room_id",
            key: "room_id",
            filterSearch: true,
            filters: room_id_filter,
            filteredValue: filteredInfo.room_id || null,
            onFilter: (value, record) =>
              record.room_id.toString() == value.toString(),
            sorter: (a, b) => a.room_id.localeCompare(b.room_id),
            sortOrder:
              sortedInfo.columnKey === "room_id" ? sortedInfo.order : null,
            ellipsis: true,
          },
          {
            title: <div className="text-c">유형명</div>,
            dataIndex: "room_type_id",
            key: "room_type_id",
            filterSearch: true,
            filters: room_type_id_filter,
            filteredValue: filteredInfo.room_type_id || null,
            onFilter: (value, record) => record.room_type_id == value,
            sorter: (a, b) => a.room_type_id.localeCompare(b.room_type_id),
            sortOrder:
              sortedInfo.columnKey === "room_type_id" ? sortedInfo.order : null,
            ellipsis: true,
            responsive: ["sm"],
          },
          {
            title: <div className="text-c">입실유형</div>,
            dataIndex: "stay_type",
            key: "stay_type",
            filterSearch: true,
            filters: stay_type_filter,
            filteredValue: filteredInfo.stay_type || null,
            onFilter: (value, record) => record.stay_type == value,
            sorter: (a, b) => a.stay_type.localeCompare(b.stay_type),
            sortOrder:
              sortedInfo.columnKey === "stay_type" ? sortedInfo.order : null,
            ellipsis: true,
            align: "center",
          },
          {
            title: <div className="text-c">결제일자</div>,
            dataIndex: "payment_date",
            key: "payment_date",
            filterSearch: true,
            filters: payment_date_filter,
            filteredValue: filteredInfo.payment_date || null,
            onFilter: (value, record) => record.payment_date === value,
            sorter: (a, b) => a.payment_date.localeCompare(b.payment_date),
            sortOrder:
              sortedInfo.columnKey === "payment_date" ? sortedInfo.order : null,
            ellipsis: true,
            align: "center",
          },
          {
            title: <div className="text-c">무인판매</div>,
            dataIndex: "sale_channel_type",
            key: "sale_channel_type",
            filterSearch: true,
            filters: sale_channel_type_filter,
            filteredValue: filteredInfo.sale_channel_type || null,
            onFilter: (value, record) => record.sale_channel_type == value,
            sorter: (a, b) => a.sale_channel_type.localeCompare(b.payment_date),
            sortOrder:
              sortedInfo.columnKey === "sale_channel_type"
                ? sortedInfo.order
                : null,
            ellipsis: true,
            align: "center",
          },
          {
            title: <div className="text-c">계좌이체</div>,
            dataIndex: "send_account",
            key: "send_account",
            filterSearch: true,
            filters: send_account_filter,
            filteredValue: filteredInfo.send_account || null,
            onFilter: (value, record) => record.send_account == value,
            sorter: (a, b) => Number(a.send_account) < Number(b.send_account),
            sortOrder:
              sortedInfo.columnKey === "send_account" ? sortedInfo.order : null,
            ellipsis: true,
            align: "right",
          },
          {
            title: <div className="text-c">받은현금</div>,
            dataIndex: "accepted_cash",
            key: "accepted_cash",
            filterSearch: true,
            filters: accepted_cash_filter,
            filteredValue: filteredInfo.accepted_cash || null,
            onFilter: (value, record) => record.accepted_cash == value,
            sorter: (a, b) => Number(a.accepted_cash) < Number(b.accepted_cash),
            sortOrder:
              sortedInfo.columnKey === "accepted_cash"
                ? sortedInfo.order
                : null,
            render: (text) => formatNumber(text) || 0,
            ellipsis: true,
            align: "right",
          },
          {
            title: <div className="text-c">거스름돈</div>,
            dataIndex: "changed_cash",
            key: "changed_cash",
            filterSearch: true,
            filters: changed_cash_filter,
            filteredValue: filteredInfo.changed_cash || null,
            onFilter: (value, record) => record.changed_cash == value,
            sorter: (a, b) => Number(a.changed_cash) < Number(b.changed_cash),
            sortOrder:
              sortedInfo.columnKey === "changed_cash" ? sortedInfo.order : null,
            render: (text) => formatNumber(text) || 0,
            ellipsis: true,
            align: "right",
          },
          {
            title: <div className="text-c">카드결제</div>,
            dataIndex: "amount_paid_creadit_card",
            key: "amount_paid_creadit_card",
            filterSearch: true,
            filters: amount_paid_creadit_card_filter,
            filteredValue: filteredInfo.amount_paid_creadit_card || null,
            onFilter: (value, record) =>
              record.amount_paid_creadit_card == value,
            sorter: (a, b) =>
              Number(a.amount_paid_creadit_card) <
              Number(b.amount_paid_creadit_card),
            sortOrder:
              sortedInfo.columnKey === "amount_paid_creadit_card"
                ? sortedInfo.order
                : null,
            render: (text) => formatNumber(text) || 0,
            ellipsis: true,
            align: "right",
          },
          {
            title: <div className="text-c">카드사명</div>,
            dataIndex: "credit_card_accepter_name",
            key: "credit_card_accepter_name",
            filterSearch: true,
            filters: credit_card_accepter_name_filter,
            filteredValue: filteredInfo.credit_card_accepter_name || null,
            onFilter: (value, record) =>
              record.credit_card_accepter_name == value,
            sorter: (a, b) =>
              a.credit_card_accepter_name.localeCompare(
                b.credit_card_accepter_name
              ),
            sortOrder:
              sortedInfo.columnKey === "credit_card_accepter_name"
                ? sortedInfo.order
                : null,
            ellipsis: true,
            align: "center",
          },
          {
            title: <div className="text-c">카드번호</div>,
            dataIndex: "credit_card_no",
            key: "credit_card_no",
            filterSearch: true,
            filters: credit_card_no_filter,
            filteredValue: filteredInfo.credit_card_no || null,
            onFilter: (value, record) => record.credit_card_no == value,
            sorter: (a, b) => a.credit_card_no.localeCompare(b.credit_card_no),
            sortOrder:
              sortedInfo.columnKey === "credit_card_no"
                ? sortedInfo.order
                : null,
            ellipsis: true,
            align: "center",
          },
          {
            title: <div className="text-c">승인번호</div>,
            dataIndex: "credit_card_approval_no",
            key: "credit_card_approval_no",
            filterSearch: true,
            filters: credit_card_approval_no_filter,
            filteredValue: filteredInfo.credit_card_approval_no || null,
            onFilter: (value, record) =>
              record.credit_card_approval_no == value,
            sorter: (a, b) =>
              a.credit_card_approval_no.localeCompare(
                b.credit_card_approval_no
              ),
            sortOrder:
              sortedInfo.columnKey === "credit_card_approval_no"
                ? sortedInfo.order
                : null,
            ellipsis: true,
            align: "center",
          },
          {
            title: <div className="text-c">OTA 결제</div>,
            dataIndex: "amount_paid_agent",
            key: "amount_paid_agent",
            filterSearch: true,
            filters: amount_paid_agent_filter,
            filteredValue: filteredInfo.amount_paid_agent || null,
            onFilter: (value, record) => record.amount_paid_agent == value,
            sorter: (a, b) =>
              Number(a.amount_paid_agent) < Number(b.amount_paid_agent),
            sortOrder:
              sortedInfo.columnKey === "amount_paid_agent"
                ? sortedInfo.order
                : null,
            render: (text) => formatNumber(text) || 0,
            ellipsis: true,
            align: "right",
          },
          {
            title: <div className="text-c">OTA명</div>,
            dataIndex: "agent_type",
            key: "agent_type",
            filterSearch: true,
            filters: agent_type_filter,
            filteredValue: filteredInfo.agent_type || null,
            onFilter: (value, record) => record.agent_type == value,
            sorter: (a, b) => a.agent_type.localeCompare(b.agent_type),
            sortOrder:
              sortedInfo.columnKey === "agent_type" ? sortedInfo.order : null,
            ellipsis: true,
            align: "center",
          },
          {
            title: <div className="text-c">미수금</div>,
            dataIndex: "not_changed_cash",
            key: "not_changed_cash",
            filterSearch: true,
            filters: not_changed_cash_filter,
            filteredValue: filteredInfo.not_changed_cash || null,
            onFilter: (value, record) => record.not_changed_cash == value,
            sorter: (a, b) =>
              Number(a.not_changed_cash) < Number(b.not_changed_cash),
            sortOrder:
              sortedInfo.columnKey === "not_changed_cash"
                ? sortedInfo.order
                : null,
            render: (text) => formatNumber(text) || 0,
            ellipsis: true,
            align: "right",
          },
          {
            title: <div className="text-c">결제메모</div>,
            dataIndex: "payment_note",
            key: "payment_note",
            filterSearch: true,
            filters: payment_note_filter,
            filteredValue: filteredInfo.payment_note || null,
            onFilter: (value, record) => record.payment_note == value,
            sorter: (a, b) => a.payment_note.localeCompare(b.payment_note),
            sortOrder:
              sortedInfo.columnKey === "payment_note" ? sortedInfo.order : null,
            ellipsis: true,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [startDateTime, filteredInfo, sortedInfo]);

  // 달력
  const onChangeDatePicker = (date, dateString) => {
    console.log(dateString);

    const timestamp = Date.parse(dateString.replace(" ", "T"));

    console.log(timestamp);
    setStartDateTime(timestamp);
  };

  // 테이블 데이터 예시
  // const data = [
  //   {
  //     key: "1",
  //     name: "204",
  //     roomName: "일반실1",
  //     stayType: "대실",
  //     paymentDate: "2024-10-01 15:37",
  //   },
  //   {
  //     key: "2",
  //     name: "502",
  //     roomName: "일반실2",
  //     stayType: "숙박",
  //     paymentDate: "2024-10-01 11:20",
  //   },
  //   {
  //     key: "3",
  //     name: "307",
  //     roomName: "파티룸",
  //     stayType: "대실",
  //     paymentDate: "2024-09-20 01:22",
  //   },
  //   {
  //     key: "4",
  //     name: "306",
  //     roomName: "VIP",
  //     stayType: "숙박",
  //     paymentDate: "2024-08-26 16:10",
  //   },
  //   {
  //     key: "5",
  //     name: "502",
  //     roomName: "일반실2",
  //     stayType: "장기",
  //     paymentDate: "2024-10-07 19:51",
  //   },
  // ];

  // 객실명 필터
  //let filteredRoomId = [];
  // let filteredName = [...new Set(data.map((item) => item.name))].map(
  //   (name) => ({
  //     text: name,
  //     value: name,
  //   })
  // );

  // 유형명 필터
  //let filteredRoomTypeId = [];
  // let filteredRoomTypeId = [...new Set(data.map((item) => item.roomName))].map(
  //   (roomName) => ({
  //     text: roomName,
  //     value: roomName,
  //   })
  // );
  // 입실유형 필터
  //let filteredStayType = [];
  // let filteredStayType = [...new Set(data.map((item) => item.stayType))].map(
  //   (stayType) => ({
  //     text: stayType,
  //     value: stayType,
  //   })
  // );
  // 결제일자 필터
  // filteredPaymentDate = [];
  // let filteredPaymentDate = [
  //   ...new Set(
  //     data.map((item) => dayjs(item.paymentDate).format("YYYY-MM-DD"))
  //   ),
  // ].map((paymentDate) => ({
  //   text: paymentDate,
  //   value: paymentDate,
  // }));

  // 테이블 컬럼 생성

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
    setPagination(pagination);
  };
  // 필터 초기화 버튼
  const clearFilters = () => {
    setFilteredInfo({});
  };
  // 모두 초기화 버튼
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setPagination({ current: 1, pageSize: 100 });
  };
  // 날짜별 정렬 버튼
  const setPaymentDate = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "payment_date",
    });
  };

  return (
    <div className="p-16 pb-0">
      <h2>매출 내역 조회</h2>

      <ConfigProvider locale={koKR}>
        <div className="flex-row flex-wrap gap-8 mt-16 mb-8">
          {/* <DatePicker
            showTime
            onChange={onChangeDatePicker}
            defaultValue={dayjs()}
            format="YYYY-MM-DD HH:mm:ss"
            style={{ minWidth: "8.75rem" }}
            placement={"bottomLeft"}
            disabledDate={disabledDate}
            disabledTime={disabledTime}
          /> */}

          <DatePicker
            showTime
            onChange={onChangeDatePicker}
            defaultValue={dayjs()}
            format="YYYY-MM-DD HH:mm:ss"
            style={{ minWidth: "8.75rem" }}
            placement={"bottomLeft"}
            disabledDate={disabledDate}
            disabledTime={disabledTime}
          />

          <div className="btn-group ml-auto">
            <Button onClick={setPaymentDate}>날짜별 정렬</Button>
            <Button onClick={clearFilters}>전체 필터초기화</Button>
            <Button onClick={clearAll}>모두 초기화</Button>
          </div>
        </div>

        <div className="table-wrap-antd">
          <Table
            columns={columns}
            dataSource={roomSalePaymentList}
            onChange={handleChange}
            pagination={pagination}
            rowKey="key"
            // scroll={{ y: "28.8rem", x: "2600px" }}
            scroll={{ y: "28.8rem", x: "max-content" }}
            className="ant-table-respons"
            bordered
          />
        </div>
      </ConfigProvider>
    </div>
  );
};

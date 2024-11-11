import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Input, List, Select } from "antd";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { reserveAgentAllByAccomSearchApi } from "../api/api";
import { useCode } from "../login/CodeContext";

export const SettingReservation = () => {
  // 공통 코드 불러오는 부분
  const { coderead } = useCode();
  const code = coderead();
  const codeAgentType = Object.entries(code.agentType);
  const codeAgentTypeList = codeAgentType.map(([key, value]) => {
    return { key: key, value: value };
  });
  const codeRoomType = Object.entries(code.roomType);
  const codeRoomTypeList = codeRoomType.map(([key, value]) => {
    return { key: key, value: value.display_name };
  });

  // 에이전트 예약 연동 설정 (API 연결)
  const [reserveAgentAllList, setReserveAgentAllList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await reserveAgentAllByAccomSearchApi();
        const resArray = Object.entries(res.reserve_agent_configs);
        const roomTypeAllArray = resArray.map(([key, value]) => {
          return {
            key: key,
            value: value,
            agent: value.type,
            name: value.place_name,
            userId: value.user_id,
            password: value.password,
            using: value.use_get_room_reserve,
          };
        });
        setReserveAgentAllList(roomTypeAllArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // 개별적으로 isEnabled 상태 관리
  const [enabledStates, setEnabledStates] = useState({});

  useEffect(() => {
    const initialStates = reserveAgentAllList.reduce((acc, agent) => {
      acc[agent.key] = agent.using; // agent.key로 초기값 설정
      return acc;
    }, {});
    setEnabledStates(initialStates);
  }, [reserveAgentAllList]);

  const handleCheckboxChange = (id) => {
    setReserveAgentAllList((prevList) =>
      prevList.map((agent) => {
        if (agent.key === id) {
          const newUsing = !agent.using;
          // 체크 상태에 따라 isEnabled 업데이트
          setEnabledStates((prevStates) => ({
            ...prevStates,
            [id]: newUsing, // 해당 id의 상태를 업데이트
          }));

          return { ...agent, using: newUsing };
        }
        return agent;
      })
    );
  };

  // 동적 입력 행추가 및 삭제
  // Input
  const [inputRows, setInputRows] = useState([]);
  const addInput = (key) => {
    setInputRows((prevRows) => ({
      ...prevRows,
      [key]: [
        ...(prevRows[key] || []), // prevRows[key]가 없으면 빈 배열로 초기화
        { id: Date.now(), value: "" },
      ],
    }));
  };

  const removeInput = (key) => {
    setInputRows((prevRows) => {
      const newRows = { ...prevRows };
      if (newRows[key] && newRows[key].length > 0) {
        newRows[key] = newRows[key].slice(0, -1); // 마지막 입력 행 삭제
      }
      return newRows;
    });
    console.log("마지막 inputRows데이터 확인 : ", inputRows);
  };

  const handleChange = (key, id, value) => {
    setInputRows((prevRows) => ({
      ...prevRows,
      [key]: prevRows[key].map((input) =>
        input.id === id ? { ...input, value } : input
      ),
    }));
  };

  // Select
  const handleSelectChange = (key, id, selectValue) => {
    setInputRows((prevRows) => ({
      ...prevRows,
      [key]: prevRows[key].map((row) =>
        row.id === id ? { ...row, selectValue } : row
      ),
    }));
    console.log("selectValue : ", selectValue);
  };

  const onSearchSelect1 = (value) => {
    console.log("search:", value);
  };

  // 순위 설정
  const [items, setItems] = useState(codeRoomTypeList);
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(false);

  useEffect(() => {
    const initialItems = {};
    reserveAgentAllList.forEach((agent) => {
      initialItems[agent.key] = [...codeRoomTypeList].sort((a, b) =>
        b.value.localeCompare(a.value)
      );
    });
    setItems(initialItems);
  }, [reserveAgentAllList]);

  const onDragEnd = (result, key) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items[key]);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems((prev) => ({
      ...prev,
      [key]: reorderedItems,
    }));
  };

  const handleDragDropToggle = (key) => {
    setIsDraggingEnabled((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = (key) => {
    console.log(`저장된 순서: ${key}`, items[key]);
  };

  return (
    <div className="pt-16 plr-24 pb-24">
      <h2 className="mb-16">예약 연동 설정</h2>

      <div className="grid-col-2">
        {reserveAgentAllList
          .sort((a, b) => a.key.localeCompare(b.key))
          .map((reserveAgent) => {
            // console.log("reserveAgent ==> ", reserveAgent);
            return (
              <div key={reserveAgent.key}>
                <Card
                  title={
                    <h3 className="text-l">
                      {codeAgentTypeList?.find(
                        (codeAgent) => codeAgent.key === reserveAgent.agent
                      )?.value || ""}
                      연동 설정
                    </h3>
                  }
                  className="setting-card narrow"
                >
                  <div className="flex-col gap-8 text-l">
                    <div className="ml-auto mb-8">
                      <Checkbox
                        onChange={() => handleCheckboxChange(reserveAgent.key)}
                        checked={reserveAgent.using}
                      >
                        사용여부
                      </Checkbox>
                    </div>

                    <div className="flex-row gap-4 flex-wrap">
                      <h4 style={{ width: "5rem" }}>로그인 ID</h4>
                      <Input
                        className="w-60"
                        disabled={!enabledStates[reserveAgent.key]}
                        defaultValue={reserveAgent.userId}
                      />
                    </div>
                    <div className="flex-row gap-4 flex-wrap">
                      <h4 style={{ width: "5rem" }}>로그인 PW</h4>
                      <Input
                        className="w-60"
                        disabled={!enabledStates[reserveAgent.key]}
                        defaultValue={reserveAgent.password}
                      />
                    </div>
                    <div className="flex-row gap-4 flex-wrap">
                      <h4 style={{ width: "5rem" }}>업소명</h4>
                      <Input
                        className="w-60"
                        disabled={!enabledStates[reserveAgent.key]}
                        defaultValue={reserveAgent.name}
                      />
                    </div>

                    <div className="flex-row gap-4 flex-wrap mt-16">
                      <h4>객실 유형 매핑</h4>
                      <Button
                        type="primary"
                        htmlType="button"
                        className="ml-auto"
                        onClick={() => addInput(reserveAgent.key)}
                        disabled={!enabledStates[reserveAgent.key]}
                      >
                        +
                      </Button>
                      <Button
                        type="primary"
                        htmlType="button"
                        onClick={() => removeInput(reserveAgent.key)}
                        disabled={
                          (inputRows[reserveAgent.key]
                            ? inputRows[reserveAgent.key].length <= 0
                            : true) || !enabledStates[reserveAgent.key]
                        }
                      >
                        -
                      </Button>
                    </div>

                    {inputRows[reserveAgent.key] &&
                      inputRows[reserveAgent.key].map((input) => {
                        console.log("inputRows : ", inputRows);
                        return (
                          <div key={input.id} className="flex-row gap-8">
                            <Input
                              value={input.value}
                              onChange={(e) =>
                                handleChange(
                                  reserveAgent.key,
                                  input.id,
                                  e.target.value
                                )
                              }
                              placeholder="입력하세요"
                              className="w-50"
                              disabled={!enabledStates[reserveAgent.key]}
                            />
                            <Select
                              showSearch
                              placeholder="객실유형을 선택하세요"
                              optionFilterProp="children"
                              className="w-50"
                              disabled={!enabledStates[reserveAgent.key]}
                              onChange={(value) =>
                                handleSelectChange(
                                  reserveAgent.key,
                                  input.id,
                                  value
                                )
                              }
                              // defaultValue={input.selectValue}
                              onSearch={onSearchSelect1}
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .includes(input.toLowerCase()) ||
                                option.children.includes(input)
                              }
                            >
                              {codeRoomTypeList
                                .sort((a, b) => b.value.localeCompare(a.value))
                                .map((roomType) => (
                                  <Select.Option
                                    key={roomType.key}
                                    value={roomType.value}
                                  >
                                    {roomType.value}
                                  </Select.Option>
                                ))}
                            </Select>
                          </div>
                        );
                      })}

                    <div className="flex-row gap-4 flex-wrap mt-16">
                      <h4>랜덤 (특가) 상품 키오스크 체크인 배정 우선 순위</h4>
                      <Button
                        type="primary"
                        htmlType="button"
                        className="ml-auto"
                        icon={
                          isDraggingEnabled[reserveAgent.key] ? (
                            <CaretUpOutlined />
                          ) : (
                            <CaretDownOutlined />
                          )
                        }
                        onClick={() => handleDragDropToggle(reserveAgent.key)}
                      />
                      {isDraggingEnabled[reserveAgent.key] && (
                        <>
                          <h5 className="text-gray-600">
                            순위 변경은 드래그로 자유롭게 이동가능합니다.
                          </h5>
                          <DragDropContext
                            onDragEnd={(result) =>
                              onDragEnd(result, reserveAgent.key)
                            }
                          >
                            <Droppable droppableId="droppable-${reserveAgent.key}">
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className="dragNdrop-wrap"
                                >
                                  <List
                                    dataSource={items[reserveAgent.key]}
                                    renderItem={(item, index) => (
                                      <Draggable
                                        key={item.key}
                                        draggableId={item.key}
                                        index={index}
                                      >
                                        {(provided) => (
                                          <List.Item
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            [{index + 1}순위]&nbsp;&nbsp;
                                            {item.value}
                                          </List.Item>
                                        )}
                                      </Draggable>
                                    )}
                                  />
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </DragDropContext>
                          <Button
                            type="primary"
                            onClick={() => handleSave(reserveAgent.key)}
                            className="mt-8 ml-auto"
                          >
                            저장
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
};

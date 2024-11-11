import { Table } from "antd";
import React from "react";

export const SalesTable2 = () => {
  // table
  const data = [
    {
      key: "1",
      category: "대실",
      name: "현금",
      count: 17,
      value: 393000,
      unpauidCount: 3,
      unpauid: 73988,
    },
    {
      key: "2",
      category: "대실",
      name: "계좌",
      count: 0,
      value: 0,
      unpauidCount: 3,
      unpauid: 73988,
    },
    {
      key: "3",
      category: "대실",
      name: "카드",
      count: 3,
      value: 3012,
      unpauidCount: 3,
      unpauid: 73988,
    },
    {
      key: "4",
      category: "대실",
      name: "OTA",
      count: 0,
      value: 0,
      unpauidCount: 3,
      unpauid: 73988,
    },

    {
      key: "5",
      category: "숙박",
      name: "현금",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },
    {
      key: "6",
      category: "숙박",
      name: "계좌",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },
    {
      key: "7",
      category: "숙박",
      name: "카드",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },
    {
      key: "8",
      category: "숙박",
      name: "OTA",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },

    {
      key: "9",
      category: "장기",
      name: "현금",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },
    {
      key: "10",
      category: "장기",
      name: "계좌",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },
    {
      key: "11",
      category: "장기",
      name: "카드",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },
    {
      key: "12",
      category: "장기",
      name: "OTA",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },

    {
      key: "13",
      category: "기타",
      name: "",
      count: 0,
      value: 0,
      unpauidCount: 0,
      unpauid: 0,
    },
  ];

  // 카테고리별로 행 병합 및 합계 계산
  const groupedData = data.reduce((acc, item) => {
    const lastGroup = acc[acc.length - 1];
    if (!lastGroup || lastGroup.category !== item.category) {
      acc.push({
        category: item.category,
        rows: [item],
        totalCount: item.count,
        totalValue: item.value,
      });
    } else {
      lastGroup.rows.push(item);
      lastGroup.totalCount += item.count;
      lastGroup.totalValue += item.value;
    }
    return acc;
  }, []);

  const rowspanCells = document.querySelectorAll(".rowspan-cell");

  rowspanCells.forEach((cell) => {
    const rowspan = cell.getAttribute("rowspan");
    const parentRow = cell.parentElement;

    // 그룹핑된 행을 추출
    const groupedRows = [];
    let currentRow = parentRow;
    console.log(currentRow);

    // rowspan 수만큼 행을 추출
    for (let i = 0; i < rowspan; i++) {
      if (currentRow) {
        groupedRows.push(currentRow);
        currentRow = currentRow.nextElementSibling;
      }
    }

    // 부모 tr에 hover 이벤트 추가
    parentRow.addEventListener("mouseenter", () => {
      groupedRows.forEach((row) => {
        row.classList.add("highlight");
      });
    });

    parentRow.addEventListener("mouseleave", () => {
      groupedRows.forEach((row) => {
        row.classList.remove("highlight");
      });
    });
  });

  return (
    <>
      <div className="table-wrap">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <colgroup>
            <col width="25%" />
            <col width="20%" />
            <col width="20%" />
            <col width="35%" />
          </colgroup>
          <thead>
            <tr>
              <th>카테고리</th>
              <th>종류</th>
              <th>건수</th>
              <th>금액</th>
            </tr>
          </thead>
          {groupedData.map((group, idx) => (
            <tbody key={`group-${idx}`}>
              {group.rows.length === 1 ? (
                <tr>
                  <td colSpan={2}>
                    <h3>{group.rows[0].category}</h3>
                  </td>
                  <td className="text-c">{group.rows[0].count} 건</td>
                  <td className="text-r">￦ {group.rows[0].value}</td>
                </tr>
              ) : (
                <>
                  {group.rows.map((record, index) => (
                    <tr key={record.key}>
                      {index === 0 ? (
                        <td
                          rowSpan={group.rows.length}
                          className="rowspan-cell text-c"
                        >
                          <h3>{group.category}</h3>
                        </td>
                      ) : null}
                      <td>{record.name}</td>
                      <td className="text-c">{record.count} 건</td>
                      <td className="text-r">
                        ￦ {record.value.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2} className="text-r">
                      <strong>합계</strong>
                    </td>
                    <td className="text-c">
                      <strong>{group.totalCount} 건</strong>
                    </td>
                    <td className="text-r">
                      <strong>￦ {group.totalValue.toLocaleString()}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="text-r">
                      <strong>미결제</strong>
                    </td>
                    <td className="text-c">{group.rows[0].unpauidCount} 건</td>
                    <td className="text-r">
                      ￦ {group.rows[0].unpauid.toLocaleString()}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          ))}

          <tfoot>
            <tr>
              <td colSpan={2} className="text-c">
                <strong>총 합계</strong>
              </td>
              <td className="text-c">20건</td>
              <td className="text-r">￦ 396,012</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { CloseOutlined, CodeSandboxOutlined } from "@ant-design/icons";

export const CardDashArea = () => {
  return (
    <div className="pb-24">
      <div className="grid-col-4">
        <Card size="small" className="dashbord-top-card">
          <div className="mask"></div>
          <div className="mask2">
            <div className="flex-row flex-items-end gap-16 mb-16">
              <button className="anim-btn btn-color">
                <CodeSandboxOutlined className="anim-icon" />
              </button>
              <div className="font-24-600">일 평균 판매수</div>
            </div>
            <p className="font-46-700">20.3</p>
          </div>
        </Card>

        <Card size="small" className="dashbord-top-card">
          <div className="mask"></div>
          <div className="mask2">
            <div className="flex-row flex-items-end gap-16 mb-16">
              <button className="anim-btn btn-color">
                <CodeSandboxOutlined className="anim-icon" />
              </button>
              <div className="font-24-600">월 평균 판매수</div>
            </div>
            <p className="font-46-700">552.9</p>
          </div>
        </Card>

        <Card size="small" className="dashbord-top-card">
          <div className="mask"></div>
          <div className="mask2">
            <div className="flex-row flex-items-end gap-16 mb-16">
              <button className="anim-btn btn-color">
                <CodeSandboxOutlined className="anim-icon" />
              </button>
              <div className="font-24-600">년 평균 판매수</div>
            </div>
            <p className="font-46-700">1,400</p>
          </div>
        </Card>

        <Card size="small" className="dashbord-top-card">
          <div className="mask"></div>
          <div className="mask2">
            <div className="flex-row flex-items-end gap-16 mb-16">
              <button className="anim-btn btn-color">
                <CodeSandboxOutlined className="anim-icon" />
              </button>
              <div className="font-24-600">작년 판매수</div>
            </div>
            <p className="font-46-700">99,999</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

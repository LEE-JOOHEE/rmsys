import { Image } from "antd";
import React from "react";
import NotFound from "../images/sample-not-found.jpg";

export const Z_NotFoundSample = () => {
  return (
    <div className="bg-full">
      <Image src={NotFound} alt="404" />
    </div>
  );
};

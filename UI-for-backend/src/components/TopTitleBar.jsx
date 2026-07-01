import React from "react";

function TopTitleBar({ title }) {
  return (
    <div className="h-[80px] w-full flex justify-between items-center">
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
}

export default TopTitleBar;

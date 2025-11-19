import React from "react";

const Column = ({ columnId, columnName }) => {
  const getColumnStyle = () => {
    if (columnId == "todo") return "border border-red-500 ";
    if (columnId == "inprogress") return "border border-yellow-500";
    if (columnId == "done") return "border border-green-500";
    return "bg-gray-500";
  };
  const getHeaderStyle = () => {
    if (columnId == "todo") return "bg-red-500 ";
    if (columnId == "inprogress") return "bg-yellow-500 ";
    if (columnId == "done") return "bg-green-500 ";
  };
  return (
    <div
      className={`${getColumnStyle()} p-4 flex flex-col h-screen max-h-[600px] rounded-md w-1/3`}
    >
      {/* Column Header */}
      <div
        className={` ${getHeaderStyle()}text-center text-white  rounded-xl p-2 flex justify-s items-center`}
      >
        <div className="font-bold p-2 text-lg">{columnName}</div>
        <div className="text-xs mt-1 ">(2)</div>
      </div>
    </div>
  );
};

export default Column;

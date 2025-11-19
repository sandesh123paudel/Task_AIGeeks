import React from "react";
import Card from "./Card";

const Column = ({ columnId, columnName, tasks }) => {
  const getColumnStyle = () => {
    if (columnId == "todo") return "border border-red-500 ";
    if (columnId == "inprogress") return "border border-yellow-500";
    if (columnId == "done") return "border border-green-500";
    return "border border-gray-500 ";
  };

  const getHeaderStyle = () => {
    if (columnId == "todo") return "bg-red-500 ";
    if (columnId == "inprogress") return "bg-yellow-500 ";
    if (columnId == "done") return "bg-green-500 ";
    return "bg-gray-500 ";
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
        <div className="text-xs mt-1 ">({tasks.length})</div>
      </div>

      {/* Column Tasks */}
      <div className="mt-4 flex-1  overflow-y-auto">
        {/* Task Card */}
        {tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </div>

      {/* Add Task Button */}
    </div>
  );
};

export default Column;

import React from "react";
import Card from "./Card";

const Column = ({
  columnId,
  columnName,
  tasks,
  onDelete,
  onEditing,
  handleDragStart,
  handleDrop,
  handleDragOver,
}) => {
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
      className={`${getColumnStyle()} p-4 flex flex-col h-screen max-h-[600px] rounded-md w-1/3 hover:shadow-2xl bg-gray-50 transition-shadow`}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, columnId)}
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
        {tasks.length === 0 && (
          <p className="text-gray-500 text-sm pt-4 italic">
            Drag tasks here or add new one
          </p>
        )}
        {/* Task Card */}
        {tasks.map((task) => (
          <Card
            key={task.id}
            task={task}
            columnId={columnId}
            onDelete={onDelete}
            onEditing={onEditing}
            onDragstart={handleDragStart}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;

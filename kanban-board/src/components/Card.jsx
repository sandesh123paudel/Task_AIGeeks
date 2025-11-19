import React from "react";

const Card = ({ task, isEditing }) => {
  return (
    <div className="bg-white p-3 rounded-md border rounded-xl mb-3 cursor-pointer hover:bg-gray-100 flex justify-between items-center">
      <div className="text-gray-700 mt-1 text-xs">{task.content}</div>
      <div className="flex space-x-2">
        <button>✎</button>
        <button>✘</button>
      </div>
    </div>
  );
};

export default Card;

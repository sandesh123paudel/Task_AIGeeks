import React, { useState } from "react";

const Card = ({ task, columnId, onEditing, onDelete, onDragstart }) => {
  const [editingField, setEditingField] = useState(false);
  const [newContent, setNewContent] = useState(task.content);

  const saveEdit = () => {
    if (newContent.trim()) {
      onEditing(columnId, task.id, newContent);
      // console.log(task.content);

      setEditingField(false);
    }
  };
  const cancelEdit = () => {
    setNewContent(task.content);
    setEditingField(false);
  };

  if (editingField) {
    return (
      <div className="bg-white p-3 rounded-md border rounded-xl mb-3 cursor-pointer hover:bg-gray-100">
        <input
          type="text"
          className="w-full border p-2 rounded mb-2 "
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={saveEdit}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white p-3 rounded-md border rounded-xl mb-3 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
      draggable="true"
      onDragStart={(e) => onDragstart(e, task, columnId)}
    >
      <div className="text-gray-700 mt-1 text-xs">{task.content}</div>
      <div className="flex space-x-2">
        <button onClick={() => setEditingField(true)}>✎</button>
        <button onClick={() => onDelete(columnId, task.id)}>✘</button>
      </div>
    </div>
  );
};

export default Card;

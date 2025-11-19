import React, { use, useEffect, useState } from "react";
import Column from "./Column";
import Button from "./Button";

const KabanBoard = () => {
  const initialColumns = [
    {
      id: "todo",
      name: "To Do",
      tasks: [
        { id: "1", content: "Solve Home Page Issue" },
        { id: "2", content: "Task 2" },
      ],
    },
    {
      id: "inprogress",
      name: "In Progress",
      tasks: [
        { id: "3", content: "Task 3" },
        { id: "4", content: "Task 4" },
      ],
    },
    {
      id: "done",
      name: "Done",
      tasks: [{ id: "5", content: "Task 5" }],
    },
  ];

  const [columns, setColumns] = useState(initialColumns);

  //Input Field  Popup
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [showColumnPopup, setShowColumnPopup] = useState(false);

  // Form fields
  const [taskName, setTaskName] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");

  const addTask = () => {
    if (!taskName.trim() || !selectedColumn) {
      alert("Task Name and Column Name must be selected");
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      content: taskName.trim(),
    };

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === selectedColumn
          ? {
              ...col,
              tasks: [...col.tasks, newTask],
            }
          : col
      )
    );
    setTaskName("");
    setSelectedColumn("");
    setShowTaskPopup(false);
  };

  const onEdit = (columnId, taskId, newContent) => {
    // console.log(newContent);

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId ? { ...task, content: newContent } : task
              ),
            }
          : col
      )
    );
  };
  const onDelete = (columnId, taskId) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.filter((task) => task.id !== taskId),
            }
          : col
      )
    );
  };

  const handleDragStart = () => {};

  return (
    <div className="min-h-screen pt-10 p-4 space-y-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-5">
          <h1 className="text-3xl font-bold">Kaban Board</h1>
          <p>Task Management Application</p>
        </div>

        {/* Buttons */}
        <div className="my-10 flex space-x-2 items-center">
          <Button
            name={"Add Task"}
            onClick={() => {
              // ensure a default column is selected when opening the popup
              setSelectedColumn(columns[0]?.id || "");
              setShowTaskPopup(true);
            }}
          />
        </div>

        {/* Columns */}
        <div className="flex gap-6">
          {columns.map((column) => (
            <Column
              key={column.id}
              columnId={column.id}
              columnName={column.name}
              tasks={column.tasks}
              onDelete={onDelete}
              onEditing={onEdit}
            />
          ))}
        </div>
      </div>

      {/* ADD TASK POPUP */}
      {showTaskPopup && (
        <div className="fixed top-[-60px] inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Task</h2>

            <input
              type="text"
              placeholder="Task name"
              className="w-full border p-2 mb-3 rounded"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />

            <select
              className="w-full border p-2 mb-3 rounded"
              // fallback to first column id if selectedColumn is empty
              value={selectedColumn || (columns[0] && columns[0].id)}
              onChange={(e) => setSelectedColumn(e.target.value)}
            >
              {columns.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-2">
              <Button
                name={"Cancel"}
                onClick={() => {
                  setShowTaskPopup(false);
                  setSelectedColumn(""); // optional: clear selection on cancel
                }}
                color={"bg-gray-300 hover:bg-gray-400 text-black"}
              />
              <Button
                name={"Add Task"}
                onClick={addTask}
                color={"bg-blue-500 hover:bg-blue-600"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KabanBoard;

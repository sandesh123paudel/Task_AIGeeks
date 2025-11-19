import React, { use, useEffect, useState } from "react";
import Column from "./Column";
import Button from "./Button";

const KabanBoard = () => {
  const [columns, setColumns] = useState([
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
  ]);

  //Input Field  Popup
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [showColumnPopup, setShowColumnPopup] = useState(false);

  // Form fields
  const [taskName, setTaskName] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [columnName, setColumnName] = useState("");

  const addTask = () => {};

  const addColumn = () => {};

  return (
    <div className="min-h-screen pt-10 p-4 space-y-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-5">
          <h1 className="text-3xl font-bold">Kaban Board</h1>
          <p>Task Management Application</p>
        </div>

        {/* Buttons */}
        <div className="my-10 flex space-x-2 items-center">
          <Button name={"Add Task"} onClick={() => setShowTaskPopup(true)} />
          <Button
            name={"Add Column"}
            onClick={() => setShowColumnPopup(true)}
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
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
            >
              <option value="">Select Column</option>
              {columns.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-2">
              <Button
                name={"Cancel"}
                onClick={() => setShowTaskPopup(false)}
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

      {/* ADD COLUMN POPUP */}
      {showColumnPopup && (
        <div className="fixed top-[-60px] inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Column</h2>

            <input
              type="text"
              placeholder="Column name"
              className="w-full border p-2 mb-3 rounded"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
            />

            <div className="flex justify-end space-x-2">
              <Button
                name={"Cancel"}
                onClick={() => setShowColumnPopup(false)}
                color={"bg-gray-300 hover:bg-gray-400 text-black"}
              />
              <Button
                name={"Add Column"}
                onClick={addColumn}
                color={"bg-green-500 hover:bg-green-400 text-white"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KabanBoard;

import React, { use, useEffect, useState } from "react";
import Column from "./Column";
import Button from "./Button";

const API_URL = "http://localhost:5000/api";

const KanbanBoard = () => {
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState([]);
  //Input Field  Popup
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  // Form fields
  const [taskName, setTaskName] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setColumns(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!taskName.trim() || !selectedColumn) {
      alert("Task name and column name cannot be empty");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now().toString(),
          content: taskName,
          columnId: selectedColumn,
        }),
      });
      if (response.ok) {
        await fetchTasks();
        setTaskName("");
        setSelectedColumn("");
        setShowTaskPopup(false);
      }
      dialog("Task added successfully");
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setShowTaskPopup(false);
      setTaskName("");
      setSelectedColumn("");
    }
  };

  const onEdit = async (columnId, taskId, newContent) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newContent,
          columnId,
        }),
      });
      if (response.ok) {
        setColumns((prev) =>
          prev.map((col) =>
            col.id === columnId
              ? {
                  ...col,
                  tasks: col.tasks.map((t) =>
                    t.id === taskId ? { ...t, content: newContent } : t
                  ),
                }
              : col
          )
        );
      }
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };
  const onDelete = async (columnId, taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    console.log("Deleting task:", taskId);

    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setColumns((prev) =>
          prev.map((col) =>
            col.id === columnId
              ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
              : col
          )
        );
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleDragStart = (e, task, ogColumnId) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.setData("ogColumnId", ogColumnId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetColumnId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const ogColumnId = e.dataTransfer.getData("ogColumnId");

    if (ogColumnId === targetColumnId) return;
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}/move`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          columnId: targetColumnId,
        }),
      });
      if (response.ok) {
        setColumns((prev) => {
          const newState = structuredClone(prev);

          const ogColumn = newState.find((c) => c.id === ogColumnId);
          const targetColumn = newState.find((c) => c.id === targetColumnId);

          const task = ogColumn.tasks.find((t) => t.id === taskId);

          ogColumn.tasks = ogColumn.tasks.filter((t) => t.id !== taskId);
          targetColumn.tasks.push(task);

          return newState;
        });
      }
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  if (loading) {
    return <div className="text-center pt-10">Loading...</div>;
  }
  return (
    <div className="min-h-screen pt-10 p-4 space-y-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-5">
          <h1 className="text-3xl font-bold">
            Kanban Board (By Sandesh Paudel )
            <span className="text-sm text-red-500"> With Live Database</span>
          </h1>
          <p>Task Management Application</p>
        </div>

        {/* Button */}
        <div className="my-5 flex space-x-2 items-center">
          <Button
            name={"Add Task"}
            color={"bg-green-500 hover"}
            onClick={() => {
              // ensure a default column is selected when opening the popup
              setSelectedColumn(columns[0]?.id || "");
              setShowTaskPopup(true);
            }}
          />
          <p className="text-sm text-gray-600">
            Total Tasks:{" "}
            {columns.reduce((acc, col) => acc + col.tasks.length, 0)}
          </p>
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
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
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
                color={"bg-green-500 hover:bg-green-600"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;

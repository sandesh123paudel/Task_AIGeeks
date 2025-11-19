import React from "react";
import Column from "./Column";

const KabanBoard = () => {
  return (
    <div className="min-h-screen  pt-10  p-4  space-y-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-5">
          <h1 className="text-3xl font-bold ">Kaban Board</h1>
          <p>Task Management Application</p>
        </div>

        <div className="flex gap-6">
          <Column columnId="todo" columnName="To Do"></Column>
          <Column columnId="inprogress" columnName="In Progress"></Column>
          <Column columnId="done" columnName="Done"></Column>
        </div>
      </div>
    </div>
  );
};

export default KabanBoard;

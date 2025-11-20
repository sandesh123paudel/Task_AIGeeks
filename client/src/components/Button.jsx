import React from "react";

const Button = ({ name, onClick, color }) => {
  return (
    <div
      className={`bg-blue-500 text-white px-4 py-2 rounded cursor-pointer ${color}`}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default Button;

import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const ToDoItems = ({ text, id, status, deleteTodo, toggleItem }) => {
  return (
    <div
      onClick={() => {
        toggleItem(id);
      }}
      className="flex items-center my-3 gap-2"
    >
      <div className="flex flex-1 items-center cursor-pointer">
        <img className="w-7" src={status ? tick : not_tick} alt="" />
        <p
          className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${
            status ? "line-through" : ""
          }`}
        >
          {text}
        </p>
      </div>

      <img
        onClick={() => {
          deleteTodo(id);
        }}
        src={delete_icon}
        className="w-4 cursor-pointer"
        alt=""
      />
    </div>
  );
};

export default ToDoItems;

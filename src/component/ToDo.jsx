import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import ToDoItems from "./ToDoItems";

const ToDo = ({ text, id, status, deleteTodo }) => {
  const inputRef = useRef();
  const [todoList, settodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  ); //prevent saved todos items clearing after refreshing page

  const addItem = () => {
    const inputText = inputRef.current.value.trim(); //trim() to remove unnecessary spaces
    const newTodo = {
      id: Date.now(), //generate unique id every time
      text: inputText,
      status: false,
    };

    if (inputText === "") {
      return null; //will skip the below code if its empty
    } else {
      settodoList((prev) => [...prev, newTodo]);
      inputRef.current.value = "";
    }
  };

  const deleteItem = (id) => {
    settodoList((prevTodo) => {
      return prevTodo.filter((todo) => todo.id != id); // filter out items whose id are not the same as previous id
    });
  };

  const toggleItem = (id) => {
    settodoList((prevTodo) => {
      return prevTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, status: !todo.status };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {/*--------------------title------------------*/}
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To Do List</h1>
      </div>

      {/*-------------------input box------------------*/}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add Your Tasks"
          ref={inputRef}
        />
        <button
          onClick={addItem}
          className="border-none rounded-full bg-orange-600 w-14 h-14 text-white font-medium cursor-pointer text-2xl"
        >
          +
        </button>
      </div>

      {/*-------------------to do list------------------*/}
      <div>
        {todoList.map((item, index) => {
          return (
            <ToDoItems
              key={index}
              text={item.text}
              id={item.id}
              status={item.status}
              deleteTodo={deleteItem}
              toggleItem={toggleItem}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ToDo;

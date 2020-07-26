import { useDispatch } from "react-redux";
import { useState } from "react";
import Todo from "../models/Todo";
import { toggleTodo, removeTodo } from "../Actions";

const useEditTodo = (todo: Todo) => {
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const setTitle = (todoTitle: string) => {
    // TODO: dispatch edit event
  };

  const setDescription = (description: string) => {
    // TODO: dispatch edit event
  };

  const remove = () => {
    dispatch(removeTodo(todo.id));
  };

  return {
    setTitle,
    setDescription,
    toggle,
    remove,
  };
};

export default useEditTodo;

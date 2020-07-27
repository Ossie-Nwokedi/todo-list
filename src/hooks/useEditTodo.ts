import { useDispatch } from "react-redux";

import Todo from "../models/Todo";
import { toggleTodo, removeTodo, updateTodoTitle, updateTodoDescripton } from "../Actions";

const useEditTodo = (todo: Todo) => {
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const setTitle = (todoTitle: string) => {
    dispatch(updateTodoTitle(todo.id, todoTitle));
  };

  const setDescription = (description: string) => {
    dispatch(updateTodoDescripton(todo.id, description));
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

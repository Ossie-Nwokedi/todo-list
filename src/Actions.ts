import Todo from "./models/Todo";

/* Action types */
export const ADD_TODO: string = "ADD_TODO";
export const REMOVE_TODO: string = "REMOVE_TODO";
export const EDIT_TODO: string = "EDIT_TODO";
export const TOGGLE_TODO: string = "TOGGLE_TODO";
export const SELECT_TODO: string = "SELECT_TODO";

/* Action creators */
export const addTodo = (title: string) => {
  return {
    type: ADD_TODO,
    todo: new Todo(title),
  };
};

export const toggleTodo = (id: string) => {
  return {
    type: TOGGLE_TODO,
    id,
  };
};

export const selectTodo = (id: string) => {
  return {
    type: SELECT_TODO,
    id,
  };
};

export const removeTodo = (id: string) => {
  return {
    type: REMOVE_TODO,
    id,
  };
};

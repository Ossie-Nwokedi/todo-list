import Todo from "./models/Todo";

/* Action types */
export const ADD_TODO: string = "ADD_TODO";
export const REMOVE_TODO: string = "REMOVE_TODO";
export const UPDATE_TODO_TITLE: string = "UPDATE_TODO_TITLE";
export const UPDATE_TODO_DESCRIPTION: string = "UPDATE_TODO_DESCRIPTION";
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

export const updateTodoTitle = (id: string, title: string) => {
  return {
    type: UPDATE_TODO_TITLE,
    id,
    title,
  };
};

export const updateTodoDescripton = (id: string, description: string) => {
  return {
    type: UPDATE_TODO_DESCRIPTION,
    id,
    description,
  };
};

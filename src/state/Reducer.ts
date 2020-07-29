import { ADD_TODO, TOGGLE_TODO, SELECT_TODO, REMOVE_TODO, UPDATE_TODO_TITLE, UPDATE_TODO_DESCRIPTION } from "./Actions";
import IState from "./IState";
import Todo from "../models/Todo";

const initialState: IState = {
  selectedTodo: "",
  todos: [],
};

const reducer = (state: IState = initialState, action: any) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        selectedTodo: action.todo.id,
        todos: [action.todo, ...state.todos],
      };

    case TOGGLE_TODO: {
      const index: number = state.todos.findIndex((todo) => todo.id === action.id);

      if (index > -1) {
        const todo: Todo = state.todos[index];
        const todos = [...state.todos];
        todos[index] = { ...todo, completed: !todo.completed };

        return {
          ...state,
          todos,
        };
      } else {
        return state;
      }
    }

    case SELECT_TODO:
      return {
        ...state,
        selectedTodo: action.id,
      };

    case REMOVE_TODO: {
      const index: number = state.todos.findIndex((todo) => todo.id === action.id);

      if (index > -1) {
        const todos = [...state.todos];
        const removedTodo = todos.splice(index, 1);
        const selectedTodo = state.selectedTodo === removedTodo[0].id ? "" : state.selectedTodo;
        return {
          ...state,
          selectedTodo,
          todos,
        };
      } else {
        return state;
      }
    }

    case UPDATE_TODO_TITLE: {
      const index: number = state.todos.findIndex((todo) => todo.id === action.id);

      if (index > -1) {
        const todo: Todo = state.todos[index];
        const todos = [...state.todos];
        todos[index] = { ...todo, title: action.title };

        return {
          ...state,
          todos,
        };
      } else {
        return state;
      }
    }

    case UPDATE_TODO_DESCRIPTION: {
      const index: number = state.todos.findIndex((todo) => todo.id === action.id);

      if (index > -1) {
        const todo: Todo = state.todos[index];
        const todos = [...state.todos];
        todos[index] = { ...todo, description: action.description };

        return {
          ...state,
          todos,
        };
      } else {
        return state;
      }
    }

    default:
      return state;
  }
};

export default reducer;

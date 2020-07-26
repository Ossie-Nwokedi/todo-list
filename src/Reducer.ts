import { ADD_TODO, TOGGLE_TODO, SELECT_TODO, REMOVE_TODO } from "./Actions";
import IState from "./models/IState";
import Todo from "./models/Todo";

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
        todos: [...state.todos, action.todo],
      };

    case TOGGLE_TODO: {
      const index: number = state.todos.findIndex(
        (todo) => todo.id === action.id
      );
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
      const index: number = state.todos.findIndex(
        (todo) => todo.id === action.id
      );

      if (index > -1) {
        const todos = [...state.todos];
        todos.splice(index, 1);
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

import reducer from "../../state/Reducer";
import { ADD_TODO, TOGGLE_TODO, SELECT_TODO, REMOVE_TODO, UPDATE_TODO_TITLE, UPDATE_TODO_DESCRIPTION } from "../../state/Actions";
import Todo from "../../models/Todo";
import { title } from "process";

describe("Reducer", () => {
  const createTodo = (id: string, title: string, description: string, completed: boolean) => ({
    id,
    title,
    description,
    completed,
  });

  describe("Initial state", () => {
    test("Correctly initialises the initial state", () => {
      const state = reducer(undefined, { type: "" });
      expect(state).toEqual({
        selectedTodo: "",
        todos: [],
      });
    });
  });

  describe("Add Todo", () => {
    test("Adds a todo to the list", () => {
      let todo = createTodo("id-123", "Buy Milk", "", false);

      const state = reducer(undefined, {
        type: ADD_TODO,
        todo,
      });

      // assert todo exists in list and adding new todo selects it
      expect(state).toEqual({
        selectedTodo: todo.id,
        todos: [todo],
      });
    });
  });

  describe("Toggling todo", () => {
    test("Toggles an existing todo", () => {
      let todo = createTodo("id-123", "Buy Milk", "", false);

      // Assert default state
      let state = reducer(undefined, { type: ADD_TODO, todo });
      expect(state).toMatchObject({
        todos: [{ completed: false }],
      });

      // toggle
      state = reducer(state, { type: TOGGLE_TODO, id: todo.id });
      expect(state).toMatchObject({
        todos: [{ completed: true }],
      });

      // toggle again
      state = reducer(state, { type: TOGGLE_TODO, id: todo.id });
      expect(state).toMatchObject({
        todos: [{ completed: false }],
      });
    });

    test("Does not affect state when invalid id is given", () => {
      let todo = createTodo("id-123", "Buy Milk", "", false);

      const state = reducer(undefined, { type: ADD_TODO, todo });
      const newState = reducer(state, { type: TOGGLE_TODO, id: "invalid-id" });

      expect(newState).toBe(state);
    });
  });

  describe("Selecting a todo", () => {
    test("Selects an existing todo", () => {
      let todo1 = createTodo("id-123", "Buy Milk", "", false);
      let todo2 = createTodo("id-456", "Write book", "", false);

      let state = reducer(undefined, { type: ADD_TODO, todo: todo1 });
      state = reducer(state, { type: ADD_TODO, todo: todo2 });

      // selected todo should be the last added
      expect(state.selectedTodo).toEqual(todo2.id);

      // select first todo
      state = reducer(state, { type: SELECT_TODO, id: todo1.id });
      expect(state.selectedTodo).toEqual(todo1.id);
    });

    test("Does not affect state if id is invalid", () => {
      let todo = createTodo("id-123", "Buy Milk", "", false);
      const state = reducer(undefined, { type: ADD_TODO, todo });
      const newState = reducer(state, { type: TOGGLE_TODO, id: "invalid-id" });

      expect(newState).toBe(state);
    });
  });

  describe("Removing a todo", () => {
    test("Removes an existing todo", () => {
      let todo1 = createTodo("id-123", "Buy Milk", "", false);
      let todo2 = createTodo("id-456", "Write book", "", false);

      let state = reducer(undefined, { type: ADD_TODO, todo: todo1 });
      state = reducer(state, { type: ADD_TODO, todo: todo2 });

      // remove second
      state = reducer(state, { type: REMOVE_TODO, id: todo2.id });

      expect(state).toEqual({
        selectedTodo: "",
        todos: [todo1],
      });
    });

    test("Does not affect state if task id is invalid", () => {
      let todo = createTodo("id-123", "Buy Milk", "", false);
      let state = reducer(undefined, { type: ADD_TODO, todo: todo });
      let newState = reducer(state, { type: REMOVE_TODO, id: "invalid-id" });

      expect(newState).toBe(state);
    });
  });

  describe("Editing todos", () => {
    test("Edits title and description of a todo", () => {
      let todo = createTodo("id-123", "Buy Milk", "", false);
      let state = reducer(undefined, { type: ADD_TODO, todo: todo });
      state = reducer(state, { type: UPDATE_TODO_TITLE, id: todo.id, title: "Buy Skimmed Milk" });

      expect(state).toMatchObject({
        todos: [
          {
            title: "Buy Skimmed Milk",
            description: "",
          },
        ],
      });

      state = reducer(state, { type: UPDATE_TODO_DESCRIPTION, id: todo.id, description: "From Tesco" });
      expect(state).toMatchObject({
        todos: [
          {
            title: "Buy Skimmed Milk",
            description: "From Tesco",
          },
        ],
      });
    });

    test("Does not affect state if todo id is invalid", () => {
      let todo = createTodo("id-123", "Buy Milk", "", false);
      let state = reducer(undefined, { type: ADD_TODO, todo: todo });

      let newState = reducer(state, { type: UPDATE_TODO_TITLE, id: "invalid-id", title: "Buy Skimmed Milk" });
      expect(newState).toBe(state);

      newState = reducer(state, { type: UPDATE_TODO_DESCRIPTION, id: "invalid-id", description: "Buy Skimmed Milk" });
      expect(newState).toBe(state);
    });
  });
});

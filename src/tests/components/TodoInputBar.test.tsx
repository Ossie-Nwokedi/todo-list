import React from "react";
import { screen, fireEvent, waitForElement } from "@testing-library/react";
import TodoInputBar from "../../components/TodoInputBar";
import renderConnected from "../utils/renderConnected";
import * as actions from "./../../state/Actions";
import { createStore } from "redux";
import reducer from "../../state/Reducer";

describe("<TodoInputBar />", () => {
  test("default rendering", () => {
    renderConnected(<TodoInputBar />);

    const input = screen.getByPlaceholderText("What would you like to do?");
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  test("submits new todo", () => {
    const addTodo = jest.spyOn(actions, "addTodo");

    renderConnected(<TodoInputBar />);
    const input = screen.getByPlaceholderText("What would you like to do?");

    fireEvent.change(input, { target: { value: "Buy milk" } });
    fireEvent.keyUp(input, { keyCode: 13 });

    expect(addTodo).toHaveBeenCalledWith("Buy milk");
  });

  test("sets focus on the input field when no todos exist", async () => {
    // set up store to have one todo
    const store = createStore(reducer);
    const addTodoAction = actions.addTodo("Buy milk");
    store.dispatch(addTodoAction);

    renderConnected(<TodoInputBar />, { store });

    let input = screen.getByPlaceholderText("What would you like to do?");
    expect(input).not.toHaveFocus();

    // empty the to do list and assert input field is focused
    store.dispatch(actions.removeTodo(addTodoAction.todo.id));

    await waitForElement(() => input);
    expect(input).toHaveFocus();
  });
});

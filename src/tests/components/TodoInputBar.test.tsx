import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { TodoInputBar } from "../../components/TodoInputBar";
import renderConnected from "../utils/renderConnected";
import * as actions from "./../../state/Actions";

describe("<TodoInputBar />", () => {
  test("default rendering", () => {
    renderConnected(<TodoInputBar numTodos={0} />);

    const input = screen.getByPlaceholderText("What would you like to do?");
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  test("submits new todo", () => {
    const addTodo = jest.spyOn(actions, "addTodo");

    renderConnected(<TodoInputBar numTodos={0} />);
    const input = screen.getByPlaceholderText("What would you like to do?");

    fireEvent.change(input, { target: { value: "Buy milk" } });
    fireEvent.keyUp(input, { keyCode: 13 });

    expect(addTodo).toHaveBeenCalledWith("Buy milk");
  });

  test.each([
    ["sets", 0],
    ["does not set", 1],
  ])("%s focus on the input field when there are %s todos", (_, numTodos) => {
    renderConnected(<TodoInputBar numTodos={numTodos} />);
    const input = screen.getByPlaceholderText("What would you like to do?");

    if (numTodos === 0) {
      expect(input).toHaveFocus();
    } else {
      expect(input).not.toHaveFocus();
    }
  });
});

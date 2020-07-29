import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoRow from "../../components/TodoRow";
import Todo from "../../models/Todo";
import renderConnected from "../utils/renderConnected";
import * as actions from "../../state/Actions";

describe("<TodoRow />", () => {
  describe("Rendering", () => {
    test("renders all components", () => {
      const todo = new Todo("Buy Milk");
      renderConnected(<TodoRow todo={todo} isSelected={false} />);
      
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    test("calls action to toggle todo when checkbox is clicked", () => {
      const toggleAction = jest.spyOn(actions, "toggleTodo");
      const todo = new Todo("Buy Milk");

      renderConnected(<TodoRow todo={todo} isSelected={false} />);

      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox, { target: { value: true } });

      expect(toggleAction).toHaveBeenCalledWith(todo.id);
    });

    test("calls action to update todo title when user updates title", () => {
      const updateTitleAction = jest.spyOn(actions, "updateTodoTitle");
      const todo = new Todo("Buy Milk");

      renderConnected(<TodoRow todo={todo} isSelected={false} />);

      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "Buy apples" } });

      expect(updateTitleAction).toHaveBeenCalledWith(todo.id, "Buy apples");
    });

    test("calls action to delete todo when user clicks delete button", () => {
      const removeTodoAction = jest.spyOn(actions, "removeTodo");
      const todo = new Todo("Buy Milk");

      renderConnected(<TodoRow todo={todo} isSelected={false} />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(removeTodoAction).toHaveBeenCalledWith(todo.id);
    });

    test("calls action to select todo as active one when user clicks the row", () => {
      const selectTodoAction = jest.spyOn(actions, "selectTodo");
      const todo = new Todo("Buy Milk");

      renderConnected(<TodoRow todo={todo} isSelected={false} />);

      const container = screen.getByTestId("container");
      fireEvent.click(container);

      expect(selectTodoAction).toHaveBeenCalledWith(todo.id);
    });
  });
});

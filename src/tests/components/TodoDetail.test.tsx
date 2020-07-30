import React from "react";
import { screen, fireEvent } from "@testing-library/react";

import { TodoDetail } from "../../components/TodoDetail";
import renderConnected from "../utils/renderConnected";
import Todo from "../../models/Todo";
import * as actions from "../../state/Actions";

describe("<TodoDetail />", () => {
  describe("Rendering", () => {
    test("renders message when no todo is selected", () => {
      renderConnected(<TodoDetail todo={null} numTodos={1} />);
      expect(screen.getByText("Click on a todo to see its details")).toBeInTheDocument();

      // does not render details
      expect(screen.queryByRole("checkbox")).toBeNull();
      expect(screen.queryByRole("textbox")).toBeNull();
      expect(screen.queryByRole("button")).toBeNull();
    });

    test("renders details when there is a selected todo", () => {
      const todo = new Todo("Write tests");
      todo.description = "Using React testing library!";
      todo.completed = true;

      renderConnected(<TodoDetail todo={todo} numTodos={1} />);

      // todo check
      expect(screen.getByRole("checkbox")).toBeChecked();

      // title and description inputs
      const [titleBox, description] = screen.getAllByRole("textbox");
      expect(titleBox).toHaveValue(todo.title);
      expect(description).toHaveValue(todo.description);

      // delete todo button
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("interaction", () => {
    test("interacting with the todo invokes actions to modify it", () => {
      const toggleAction = jest.spyOn(actions, "toggleTodo");
      const editTitleAction = jest.spyOn(actions, "updateTodoTitle");
      const editDescriptionAction = jest.spyOn(actions, "updateTodoDescription");
      const deleteAction = jest.spyOn(actions, "removeTodo");

      const todo = new Todo("Write tests");
      todo.completed = true;

      renderConnected(<TodoDetail todo={todo} numTodos={1} />);

      fireEvent.click(screen.getByRole("checkbox"));
      expect(toggleAction).toHaveBeenCalledWith(todo.id);

      const [titleBox, description] = screen.getAllByRole("textbox");

      fireEvent.change(titleBox, { target: { value: "Write more tests" } });
      expect(editTitleAction).toHaveBeenCalledWith(todo.id, "Write more tests");

      fireEvent.change(description, { target: { value: "A lot of tests" } });
      expect(editDescriptionAction).toHaveBeenCalledWith(todo.id, "A lot of tests");

      fireEvent.click(screen.getByRole("button"));
      expect(deleteAction).toHaveBeenCalledWith(todo.id);
    });
  });
});

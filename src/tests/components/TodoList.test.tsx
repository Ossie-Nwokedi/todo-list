import React from "react";
import { screen, render } from "@testing-library/react";
import { TodoList } from "../../components/TodoList";
import Todo from "../../models/Todo";
import renderConnected from "../utils/renderConnected";

describe("<TodoList />", () => {
  test("renders empty list message when there are no todos", () => {
    render(<TodoList todos={[]} selectedTodo="" />);
    expect(screen.getByTestId("no-todos")).toBeInTheDocument();
  });

  test("renders rows of todos when todos are present", () => {
    const todos = [new Todo("Buy Milk"), new Todo("Feed the cat"), new Todo("Write unit tests")];

    renderConnected(<TodoList todos={todos} selectedTodo="" />);

    const todoRows = screen.queryAllByTestId("todo-row");
    expect(todoRows).toHaveLength(todos.length);

    // empty todos container should not be present
    expect(screen.queryByTestId("no-todos")).toBeNull();
  });

  test("renders completed section row when there is a completed task", () => {
    const todos = [new Todo("Buy Milk"), new Todo("Feed the cat"), new Todo("Write unit tests")];
    todos[1].completed = true;

    renderConnected(<TodoList todos={todos} selectedTodo="" />);

    const completedSectionHeader = screen.getByTestId("status-row");
    expect(completedSectionHeader).toBeInTheDocument();
    expect(completedSectionHeader).toHaveTextContent("Completed");
  });
});

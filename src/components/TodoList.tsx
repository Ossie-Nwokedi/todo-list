import React, { ReactElement, FunctionComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import TodoStatusRow from "./TodoStatusRow";
import TodoRow from "./TodoRow";
import Todo from "../models/ITodo";
import IState from "../state/IState";

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const NoTodosContainer = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #969899;
`;

type Props = {
  todos: Todo[];
  selectedTodo: string;
};

export const TodoList: FunctionComponent<Props> = ({ todos, selectedTodo }) => {
  const rows: Array<ReactElement> = [];
  let renderedCompleteds: boolean = false;

  if (todos.length === 0) {
    return (
      <NoTodosContainer data-testid="no-todos">
        <h2>No tasks for today!</h2>
        <span>
          Put your feet up and relax
          <span role="img" aria-label="smiley face">
            😎
          </span>
        </span>
      </NoTodosContainer>
    );
  }

  // sort by completed/uncompleted
  todos.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));

  todos.forEach((todo) => {
    if (todo.completed && !renderedCompleteds) {
      renderedCompleteds = true;
      rows.push(<TodoStatusRow key="completed" status="Completed" />);
    }
    rows.push(<TodoRow key={todo.id} todo={todo} isSelected={todo.id === selectedTodo} />);
  });

  return <Container>{rows}</Container>;
};

const mapState = (state: IState) => {
  return { todos: state.todos, selectedTodo: state.selectedTodo };
};

export default connect(mapState)(TodoList);

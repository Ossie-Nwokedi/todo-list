import React, { ReactElement, FunctionComponent } from "react";
import { connect } from "react-redux";

import TodoStatusRow from "./TodoStatusRow";
import TaskRow from "./TodoRow";
import Todo from "../models/ITodo";
import IState from "../models/IState";

type Props = {
  todos: Todo[];
  selectedTodo: string;
};

const TodoList: FunctionComponent<Props> = ({ todos, selectedTodo }) => {
  const rows: Array<ReactElement> = [];
  let completed: any = null;


  if (todos.length === 0){
    return <span>Hurrah! You have nothing to do!</span>
  }

  // sort by completed/uncompleted
  todos.sort((a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1
  );

  todos.forEach((todo) => {
    if (completed !== todo.completed) {
      completed = todo.completed;
      const status = completed ? "Completed" : "To Do";
      rows.push(<TodoStatusRow key={status} status={status} />);
    }
    rows.push(
      <TaskRow
        key={todo.id}
        todo={todo}
        isSelected={todo.id === selectedTodo}
      />
    );
  });

  return <div>{rows}</div>;
};

const mapState = (state: IState) => {
  return { todos: state.todos, selectedTodo: state.selectedTodo };
};

export default connect(mapState)(TodoList);

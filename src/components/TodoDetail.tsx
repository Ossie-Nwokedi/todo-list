import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import ITodo from "../models/ITodo";
import IState from "../models/IState";
import useEditTodo from "../hooks/useEditTodo";
import Todo from "../models/Todo";

type Props = {
  todo: ITodo;
};

const TodoDetail: FunctionComponent<Props> = ({ todo }) => {
  const { toggle, remove, setTitle, setDescription } = useEditTodo(todo);

  if (!todo) {
    return <span>click on a todo to see its details</span>;
  }

  return (
    <div>
      <input type="checkbox" checked={todo.completed} onChange={toggle} />
      <span>{todo.title}</span>

      <div>
        <textarea placeholder="Description" value={todo.description} />
        <button onClick={remove}>X</button>
      </div>
    </div>
  );
  return null;
};

const mapState = (state: IState) => {
  const index: number = state.todos.findIndex(
    (todo) => todo.id === state.selectedTodo
  );

  return index > -1 ? { todo: state.todos[index] } : null;
};

export default connect(mapState)(TodoDetail);

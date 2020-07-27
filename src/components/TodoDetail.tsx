import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import ITodo from "../models/ITodo";
import IState from "../models/IState";
import useEditTodo from "../hooks/useEditTodo";

type Props = {
  todo: ITodo | null;
  numTodos: number;
};

const TodoDetail: FunctionComponent<Props> = ({ todo, numTodos }) => {
  const { toggle, remove, setTitle, setDescription } = useEditTodo(
    todo as ITodo
  );

  const onTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const onDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  if (numTodos === 0) {
    return null;
  }

  if (!todo) {
    return <span>click on a todo to see its details</span>;
  }

  return (
    <div>
      <input type="checkbox" checked={todo.completed} onChange={toggle} />
      <input value={todo.title} onChange={onTitleChange} />

      <div>
        <textarea
          placeholder="Description"
          value={todo.description}
          onChange={onDescriptionChange}
        />
        <button onClick={remove}>X</button>
      </div>
    </div>
  );
};

const mapState = (state: IState) => {
  const index: number = state.todos.findIndex(
    (todo) => todo.id === state.selectedTodo
  );

  const props = {
    numTodos: state.todos.length,
    todo: index > -1 ? state.todos[index] : null,
  };

  return props;
};

export default connect(mapState)(TodoDetail);

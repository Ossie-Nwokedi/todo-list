import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";

import Todo from "../models/Todo";
import useEditTodo from "../hooks/useEditTodo";
import { selectTodo } from "../Actions";

type Props = {
  todo: Todo;
  isSelected: boolean;
};

const TaskRow: FunctionComponent<Props> = ({ todo, isSelected }) => {
  const dispatch = useDispatch();

  const { setTitle, toggle, remove } = useEditTodo(todo);

  const checkBoxRef = React.useRef(null);
  const deleteButtonRef = React.useRef(null);

  const onTitleChanged = (event: any) => {
    setTitle(event.target.value);
  };

  const onClickTodo = (event: any) => {
    if (
      event.target !== checkBoxRef.current &&
      event.target !== deleteButtonRef.current &&
      !isSelected
    ) {
      dispatch(selectTodo(todo.id));
    }
  };

  return (
    <div onClick={onClickTodo}>
      <input
        ref={checkBoxRef}
        type="checkbox"
        checked={todo.completed}
        onChange={toggle}
      />
      <input value={todo.title} onChange={onTitleChanged} />
      <button ref={deleteButtonRef} onClick={remove}>
        X
      </button>
    </div>
  );
};

export default TaskRow;

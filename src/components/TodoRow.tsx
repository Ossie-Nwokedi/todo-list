import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Todo from "../models/Todo";
import useEditTodo from "../hooks/useEditTodo";
import { selectTodo } from "../Actions";
import Checkbox from "./Checkbox";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0 5px 0;
`;

const TitleInput = styled.input`
  border: none;
  flex: 1;
  margin-left: 10px;
`;

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
    <Container onClick={onClickTodo}>
      <Checkbox ref={checkBoxRef} checked={todo.completed} onChange={toggle} />
      <TitleInput value={todo.title} onChange={onTitleChanged} />
      <button ref={deleteButtonRef} onClick={remove}>
        X
      </button>
    </Container>
  );
};

export default TaskRow;

import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Todo from "../models/Todo";
import useEditTodo from "../hooks/useEditTodo";
import { selectTodo } from "../state/Actions";
import Checkbox from "./Checkbox";
import DeleteButton from "./DeleteButton";

type ContainerProp = {
  selected: boolean;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5px 0 5px;

  :hover {
    background-color: #eef1f0;
  }

  background-color: ${(props: ContainerProp) => (props.selected ? "#E6EDEC" : "transparent")};
`;

const TitleInput = styled.input`
  border: none;
  outline: none;
  margin-right: 5px;
  flex: 1;
  background-color: transparent;
`;

const TitleContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #eef1f0;
  width: 100%;
  margin-left: 10px;
  padding: 7px 0 7px 0;
`;

type Props = {
  todo: Todo;
  isSelected: boolean;
};

const TodoRow: FunctionComponent<Props> = ({ todo, isSelected }) => {
  const dispatch = useDispatch();

  const { setTitle, toggle, remove } = useEditTodo(todo);

  const checkBoxRef = React.useRef(null);
  const deleteButtonRef = React.useRef(null);

  const onTitleChanged = (event: any) => {
    setTitle(event.target.value);
  };

  const onClickTodo = (event: any) => {
    if (event.target !== checkBoxRef.current && event.target !== deleteButtonRef.current && !isSelected) {
      dispatch(selectTodo(todo.id));
    }
  };

  return (
    <Container data-testid="container" onClick={onClickTodo} selected={isSelected}>
      <Checkbox ref={checkBoxRef} checked={todo.completed} onChange={toggle} />
      <TitleContainer>
        <TitleInput value={todo.title} onChange={onTitleChanged} />
        <DeleteButton ref={deleteButtonRef} onClick={remove} />
      </TitleContainer>
    </Container>
  );
};

export default TodoRow;

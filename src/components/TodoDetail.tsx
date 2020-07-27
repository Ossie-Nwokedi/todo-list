import React, { FunctionComponent, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import ITodo from "../models/ITodo";
import IState from "../models/IState";
import useEditTodo from "../hooks/useEditTodo";
import Checkbox from "./Checkbox";

const Container = styled.div`
  height: 100%;
  display: flex;
  padding-top: 5px;
  flex-flow: column;
`;

const TitleContainer = styled.div`
  display: flex;
  align-content: center; 
`;

const TitleInput = styled.input`
  margin-left: 10px;
  padding: 0;
  padding-left: 10px;
  border: none;
  border-left: 1px solid #969899;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const DescriptionBox = styled.textarea`
  border: none;
  display: block;
  width: 100%;
  resize: none;
  flex: 1;
  font-family: "arial";
  
  ::placeholder {
    color: #969899;
    font-size: 14px;
  }
`;

const DeleteButton = styled.button`
  align-self: flex-end;
`;

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
    <Container>
      <TitleContainer>
        <Checkbox checked={todo.completed} onChange={toggle} />
        <TitleInput value={todo.title} onChange={onTitleChange} />
      </TitleContainer>

      <DescriptionBox
        placeholder="Description"
        value={todo.description}
        onChange={onDescriptionChange}
      />
      <DeleteButton onClick={remove}>X</DeleteButton>
    </Container>
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

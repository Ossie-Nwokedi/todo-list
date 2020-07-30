import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import ITodo from "../models/ITodo";
import IState from "../state/IState";
import useEditTodo from "../hooks/useEditTodo";
import Checkbox from "./Checkbox";
import DeleteButton from "./DeleteButton";

const Container = styled.div`
  height: 100%;
  display: flex;
  padding-top: 5px;
  flex-flow: column;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const TitleInput = styled.input`
  outline: none;
  margin-left: 10px;
  padding: 0;
  padding-left: 10px;
  border: none;
  border-left: 1px solid #969899;
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  :focus {
    background: #f8f8f8;
  }
`;

const DescriptionBox = styled.textarea`
  outline: none;
  border: none;
  display: block;
  width: 100%;
  resize: none;
  flex: 1;
  font-family: "arial";
  margin-bottom: 20px;
  border-bottom: 1px solid #969899;

  ::placeholder {
    color: #969899;
    font-size: 14px;
  }

  :focus {
    border: 1px solid #eef1f0;
  }
`;

const DeleteTodoButton = styled(DeleteButton)`
  align-self: flex-end;
  margin-bottom: 20px;
`;

const NoSelectionContainer = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: gray;
  font-weight: bold;
  font-size: 14px;
`;

type Props = {
  todo: ITodo | null;
  numTodos: number;
};

export const TodoDetail: FunctionComponent<Props> = ({ todo, numTodos }) => {
  const { toggle, remove, setTitle, setDescription } = useEditTodo(todo as ITodo);

  const onTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const onDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const onKeyPressDown = (event: any) => {
    if (event.keyCode === 13) {
      remove();
    }
  };

  if (numTodos === 0) {
    return null;
  }

  if (!todo) {
    return (
      <NoSelectionContainer>
        Click on a todo to see its details{" "}
        <span role="img" aria-label="paper">
          📝
        </span>
      </NoSelectionContainer>
    );
  }

  return (
    <Container>
      <TitleContainer>
        <Checkbox checked={todo.completed} onChange={toggle} title="Toggle completed" />
        <TitleInput value={todo.title} onChange={onTitleChange} />
      </TitleContainer>

      <DescriptionBox placeholder="Description" value={todo.description} onChange={onDescriptionChange} />

      <DeleteTodoButton onClick={remove} onKeyDown={onKeyPressDown} tabIndex={0} />
    </Container>
  );
};

const mapState = (state: IState) => {
  const index: number = state.todos.findIndex((todo) => todo.id === state.selectedTodo);

  const props = {
    numTodos: state.todos.length,
    todo: index > -1 ? state.todos[index] : null,
  };

  return props;
};

export default connect(mapState)(TodoDetail);

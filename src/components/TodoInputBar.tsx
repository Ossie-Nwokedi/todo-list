import React, { useState, FunctionComponent, useEffect, useRef } from "react";
import { useDispatch, connect } from "react-redux";
import styled from "styled-components";

import { addTodo } from "../Actions";
import IState from "../models/IState";

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  background-color: rgba(226, 229, 230, 0.5);
  border: 1px solid transparent;
  border-radius: 5px;
  height: 35px;
  padding: 0 5px 0 5px;
  margin-bottom: 10px;
  :hover,
  :focus-within {
    border: 1px solid #969899;
  }
`;

const InputField = styled.input`
  outline: none;
  width: 100%;
  height: 25px;
  align-self: center;
  border: none;
  background-color: transparent;
  ::placeholder {
    color: #969899;
  }
`;

type Props = {
  numTodos: number;
};

const TodoInputBar: FunctionComponent<Props> = ({ numTodos }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input field if there are no more todos
    if (numTodos === 0) {
        inputRef?.current?.focus();
    }
  }, [numTodos]);

  const onChangeTitle = (event: any) => {
    setTitle(event.target.value);
  };

  const onKeyPressUp = (event: any) => {
    if (event.keyCode === 13 && title !== "") {
      dispatch(addTodo(title));
      setTitle("");
    }
  };

  return (
    <Container>
      <InputField
        ref={inputRef}
        placeholder="What would you like to do?"
        onKeyUp={onKeyPressUp}
        onChange={onChangeTitle}
        value={title}
      />
    </Container>
  );
};

const mapState = (state: IState) => {
  return { numTodos: state.todos.length };
};

export default connect(mapState)(TodoInputBar);

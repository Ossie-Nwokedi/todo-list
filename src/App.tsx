import React from "react";
import styled from "styled-components";

import TodoDetail from "./components/TodoDetail";
import TodoInputBar from "./components/TodoInputBar";
import TodoList from "./components/TodoList";

const TodoContainer = styled.div`
  display: flex;
  padding: 10px;
  margin: 40px auto;
  max-width: 1024px;
  height: 500px;
  border: 1px solid #969899;
  border-radius: 10px;
`;

const LeftPanel = styled.div`
  width: 60%;
  min-width: 100px;
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  width: 1px;
  margin: 0 10px 0 10px;
  border-left: 1px solid #969899;
`;

const RightPanel = styled.div`
  flex: 1;
`;

function App() {
  return (
    <TodoContainer>
      <LeftPanel>
        <TodoInputBar />
        <TodoList />
      </LeftPanel>
      <Divider />
      <RightPanel>
        <TodoDetail />
      </RightPanel>
    </TodoContainer>
  );
}

export default App;

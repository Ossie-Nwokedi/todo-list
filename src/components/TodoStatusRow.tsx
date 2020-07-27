import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
  display:flex;
  align-items: center;
  height: 25px;
  background-color: rgba(173, 225, 198, 0.2);
  margin-bottom: 10px;
  padding-left: 5px;
  color: #a1a1a1;
  font-size: 13px;
`;

type Props = {
  status: string;
};

const TodoStatusRow: FunctionComponent<Props> = ({ status }) => {
  return <Container>{status}</Container>;
};

export default TodoStatusRow;

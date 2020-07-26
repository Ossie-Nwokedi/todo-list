import React, { FunctionComponent } from "react";

type Props = {
  status: string;
};

const TodoStatusRow: FunctionComponent<Props> = ({ status }) => {
  return <div>{status}</div>;
};

export default TodoStatusRow;

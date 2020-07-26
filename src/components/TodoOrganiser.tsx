import React from "react";
import NewTaskBar from "./NewTodoBar";
import TodoList from "./TodoList";

const TaskOrganiser = () => {
  return (
    <div>
      <NewTaskBar />
      <TodoList />
    </div>
  );
};

export default TaskOrganiser;

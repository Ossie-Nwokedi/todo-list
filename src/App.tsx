import React from "react";

import TaskOrganiser from "./components/TodoOrganiser";
import TodoDetail from "./components/TodoDetail";

function App() {
  return (
    <div>
      <TaskOrganiser />
      <hr />
      <TodoDetail />
    </div>
  );
}

export default App;

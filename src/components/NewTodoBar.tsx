import React, { useState } from "react";
import { addTodo } from "../Actions";
import { useDispatch } from "react-redux";

const NewTaskBar = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

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
    <div>
      <input
        placeholder="What would you like to do?"
        onKeyUp={onKeyPressUp}
        onChange={onChangeTitle}
        value={title}
      />
    </div>
  );
};

export default NewTaskBar;

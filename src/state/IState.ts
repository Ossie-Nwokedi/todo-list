import Todo from "../models/Todo";

export default interface IState {
  selectedTodo: string;
  todos: Todo[];
}

import { v4 as uuid } from 'uuid';
import ITodo from "./ITodo";

class Todo implements ITodo {
  id: string;
  completed: boolean;
  title: string;
  description: string;
  
  constructor(title:string) {
    this.title = title;
    this.completed = false;
    this.description = "";
    this.id = uuid(); 
  }
}

export default Todo;
import { Injectable, NotFoundException } from "@nestjs/common";
import { Todo } from "./todo.model";

@Injectable()
export class TodoService {
  private _tasks: Todo[] = [
    new Todo(1, "Task 1", "Description 1", false),
    new Todo(2, "Task 2", "Description 2", false),
    new Todo(3, "Task 3", "Description 3", false),
    new Todo(4, "Task 4", "Description 4", false),
    new Todo(5, "Task 5", "Description 5", false),
  ];

  
  getTasks(): Todo[] {
    return this._tasks;
  }


  getTaskById(id: number): Todo {
    const task = this._tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }


  createTask(title: string, description: string): Todo {
    const newTask = new Todo(
      this._tasks.length + 1,
      title,
      description,
      false
    );
    this._tasks.push(newTask);
    return newTask;
  }


  updateTask(id: number, title?: string, description?: string, isCompleted?: boolean): Todo {
    const task = this.getTaskById(id); 
    if (title) task.title = title;
    if (description) task.description = description;
    if (isCompleted !== undefined) task.isCompleted = isCompleted;
    return task;
  }

 
  deleteTask(id: number): void {
    const index = this._tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this._tasks.splice(index, 1);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';


export interface Task {
  _id?: string;
  title?: string;
  description?: string;
  completed?: boolean;
  user?: string;
  updating?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private httpClient: HttpClient) { }

  url: string = 'https://zansuken-todo-server.herokuapp.com/tasks';

  tasks: any[] = [];

  activeFilter: string = 'all';

  newArray: any[] = [];

  filteredTasks(filter: string): void {
    switch (filter) {
      case 'all':
        this.activeFilter = 'all';
        this.newArray = [...this.tasks];

        break;
      case 'completed':
        this.activeFilter = 'completed';
        this.newArray = [...this.tasks.filter(task => task.completed)];

        break;

      case 'active':
        this.activeFilter = 'active';
        this.newArray = [...this.tasks.filter(task => !task.completed)];

        break;
      default:
        this.newArray = [...this.tasks];

    }
  }

  async getTasks(): Promise<Task[]> {
    return lastValueFrom(this.httpClient.get<Task[]>(this.url));
  }

  async createTask(task: Task): Promise<Task> {
    const newTask = await lastValueFrom(this.httpClient.post<Task>(this.url, task))

    if (newTask.title && newTask.title?.length > 0) {
      console.log(newTask.title);


      this.tasks.push(newTask);

      this.newArray = [...this.tasks];

      return newTask
    } else {
      return task
    }
  }

  async completeTask(task: Task): Promise<void> {
    task.completed = !task.completed;
    await this.updateTask(task);
  }

  async updateTaskTitle(task: Task, event: any): Promise<Task> {

    const target: HTMLInputElement = event.target;


    if (target.value.length > 0) {

      task.title = target.value;
      task.updating = true;
      await this.updateTask(task);
      task.updating = false;

      return task;
    } else {
      return task;
    }
  }

  async updateTask(task: Task): Promise<Task> {
    const updatedTask = await lastValueFrom(this.httpClient.put<Task>(this.url + '/' + task._id, task))

    this.tasks = this.tasks.map(t => t._id === updatedTask._id ? updatedTask : t);

    return updatedTask
  }

  async deleteTask(task: Task): Promise<Task> {

    const deletedTask = await lastValueFrom(this.httpClient.delete<Task>(this.url + '/' + task._id))

    this.tasks = this.tasks.filter(t => t._id !== task._id);
    this.newArray = [...this.tasks];


    return deletedTask

  }

  async clearCompleted(): Promise<void> {
    const completedTasks = this.tasks.filter(t => t.completed);
    await Promise.all(completedTasks.map(t => this.deleteTask(t)));

    this.tasks = this.tasks.filter(t => !t.completed);

  }

}

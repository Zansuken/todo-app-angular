import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit {

  constructor(public taskService: TaskService) { }

  isUpdating: boolean = false;

  activeTask: any = {};

  cursorPosition: any = {
    x: 0,
    y: 0
  };

  async ngOnInit(): Promise<void> {

    this.taskService.tasks = await this.taskService.getTasks();
    this.taskService.newArray = [...this.taskService.tasks];
  }

  toggleUpdatingState(task: Task, event: any): void {
    this.activeTask = task;
    this.isUpdating = !this.isUpdating;

    this.cursorPosition.x = event.screenX;
    this.cursorPosition.y = event.screenY;
  }

  validateUpdate(): void {
    this.isUpdating = false;
  }

}

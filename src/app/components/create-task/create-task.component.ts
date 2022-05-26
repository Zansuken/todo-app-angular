import { Component, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  theme$: Observable<string>

  ready: boolean = false;

  newTask: string = '';

  constructor(private taskService: TaskService, private store: Store<{ theme: string }>) {
    this.theme$ = this.store.select('theme');
  }


  ngOnInit(): void {

  }

  addNewTaskValue(task: string) {
    if (task.length > 0) this.newTask = task
    return
  }

  async createTask(event: any) {
    event.preventDefault();
    const form = event.target;
    const task: Task = {
      title: this.newTask,
      completed: false,
    };

    await this.taskService.createTask(task)

    form.reset();
  }

}

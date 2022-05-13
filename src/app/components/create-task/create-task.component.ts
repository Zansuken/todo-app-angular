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

  constructor(private taskService: TaskService, private store: Store<{ theme: string }>) {
    this.theme$ = this.store.select('theme');
  }


  ngOnInit(): void {

  }

  handleSearchChange(event: any) {
    this.ready = event.target.value.length > 0;
  }

  async createTask(event: any) {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const task: Task = {
      title: title,
      completed: false,
    };

    await this.taskService.createTask(task)

    form.reset();
  }

}

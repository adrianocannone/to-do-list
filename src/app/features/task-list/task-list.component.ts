import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Task } from './model/task';
@Component({
  selector: 'ac-task-list',
  template: `
    <div class="list-group mx-3">
      <div 
        class="list-group-item"
        *ngFor="let task of tasks"
      >
        {{task.taskText}}
        <div class="pull-right">
          <i class="fa fa-trash" (click)="deleteHandler(task)"></i>
        </div>
      </div>
    </div>
  `,
  styles:[]
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor (private http: HttpClient) {
    this.tasksInit()
  }

  tasksInit() {
    this.http.get<Task[]>('http://localhost:3000/tasks')
      .subscribe(result => this.tasks = result);
  }

  deleteHandler(task: Task) {
    this.http.delete(`http://localhost:3000/tasks/${task.id}`)
      .subscribe(() => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks.splice(index, 1)
      })
  }
}

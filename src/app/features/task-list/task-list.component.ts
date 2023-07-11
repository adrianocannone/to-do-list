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
       <span [ngClass]="task.completed? 'completed': null" >
        {{task.taskText}}
       </span>
        <div class="pull-right">
          
          <i 
            class="fa"
            [ngClass]="{
              'fa-close': task.completed,
              'fa-check': !task.completed
            }"
            [style.color]="task.completed? null : 'green'"
            (click)="editCompletion(task)"
          ></i>
          
          <i 
            class="fa fa-trash" 
            style="color: red;"
            (click)="deleteHandler(task)"
          ></i>
        </div>
      </div>
    </div>
  `,
  styles:[`
    .completed {
      color: green;
      font-weight: bold;
    }`
  ]
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

  editCompletion(task: Task){
    task.completed = !task.completed;
    this.http.patch<Task>(`http://localhost:3000/tasks/${task.id}`, task)
      .subscribe(() => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks[index] = task
      })
  }
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Task } from './model/task';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'ac-task-list',
  template: `
    <form #f="ngForm" (submit)="save(f)">
      <input
        type="text"
        required
        [ngModel]
        name="taskText"
        placeholder="Inserisci la prossima task"
        class="form-control"
      >
      <button type="submit" class="btn btn-info">Crea task</button>
    </form>
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

  save(form: NgForm) {
    console.log(form.value)
    this.http.post<Task>('http://localhost:3000/tasks', form.value)
      .subscribe(result => {
        this.tasks.push(result)
        form.reset()
      })
  }
}

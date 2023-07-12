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
        [ngModel]="active?.taskText"
        name="taskText"
        placeholder="Inserisci la prossima task"
        class="form-control"
      >
      <div class="btn-group">
        <button type="submit" class="btn btn-info">
          {{active ? 'Modifica task' : 'Crea task'}}
        </button>
        <button 
          type="button"
          class="btn btn-warning"
          (click)="reset(f)"
          *ngIf="active"
        >Reset</button>
      </div>
    </form>

    <div class="list-group mx-3">
      <div 
        class="list-group-item"
        *ngFor="let task of tasks"
        (click)="setActive(task)"
      >
       <span [ngClass]="{'completed': task.completed}" >
        {{task.taskText}}
       </span>
        <div class="pull-right" *ngIf="active?.id === task.id">
          
          <i 
            class="fa"
            [ngClass]="task.completed? 'fa-close' : 'fa-check'"
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
  active: Task | null = null;
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
    this.edit(task)
  }

  save(form: NgForm){
    if(this.active){
      this.active.taskText=form.value.taskText
      this.edit(this.active)
    }else{
      this.add(form)
    }
  }

  edit(task: Task){
    this.http.patch<Task>(`http://localhost:3000/tasks/${task.id}`, task)
      .subscribe(result => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks[index] = result
      })
  }

  add(form: NgForm) {
    this.http.post<Task>('http://localhost:3000/tasks', form.value)
      .subscribe(result => {
        this.tasks.push(result);
        this.reset(form);
      })
  }

  setActive(task: Task){
    this.active = task;
  }

  reset(form: NgForm){
    this.active=null;
    form.reset();
  }
}

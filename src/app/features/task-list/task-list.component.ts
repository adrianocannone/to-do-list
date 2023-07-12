import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Task } from './model/task';
@Component({
  selector: 'ac-task-list',
  template: `
    <ac-task-list-form
      [active]="active"
      (save)="save($event)"
      (reset)="reset()"
    ></ac-task-list-form>

    <hr>

    <ac-task-list-collection
      [tasks]="tasks"
      [active]="active"
      (setActive)="setActive($event)"
      (editCompletion)="editCompletion($event)"
      (delete)="deleteHandler($event)"
    ></ac-task-list-collection>
  `,
  styles:[]
})
export class TaskListComponent {
  tasks: Task[] = [];
  active: Task | null = null;
  constructor (private http: HttpClient) {
    this.tasksInit();
  }

  tasksInit() {
    this.http.get<Task[]>('http://localhost:3000/tasks')
      .subscribe(result => this.tasks = result);
  }

  deleteHandler(task: Task) {
    this.http.delete(`http://localhost:3000/tasks/${task.id}`)
      .subscribe(() => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks.splice(index, 1);
      })
  }

  editCompletion(task: Task){
    task.completed = !task.completed;
    this.edit(task);
  }

  save(task: Task){
    if(this.active?.id){
      this.active.taskText=task.taskText;
      this.edit(this.active);
    }else{
      this.add(task);
    }
  }

  edit(task: Task){
    this.http.patch<Task>(`http://localhost:3000/tasks/${task.id}`, task)
      .subscribe(result => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks[index] = result;
      })
  }

  add(task: Task) {
    this.http.post<Task>('http://localhost:3000/tasks', task)
      .subscribe(result => {
        this.tasks.push(result);
        this.reset();
      })
  }

  setActive(task: Task){
    this.active = task;
  }

  reset(){
    this.active = null;
  }
}

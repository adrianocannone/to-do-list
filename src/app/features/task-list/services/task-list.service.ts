import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { HttpClient } from '@angular/common/http';
import { TaskListStore } from './task-list.store';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  constructor(
    private http: HttpClient,
    private store: TaskListStore
  ) {

  }

  tasksInit() {
    this.http.get<Task[]>('http://localhost:3000/tasks')
      .subscribe(result => this.store.load(result));
  }

  deleteHandler(task: Task) {
    this.http.delete(`http://localhost:3000/tasks/${task.id}`)
      .subscribe(() => this.store.delete(task))
  }

  editCompletion(task: Task) {
    task.completed = !task.completed;
    this.edit(task);
  }

  save(task: Task) {
    if (this.store.active?.id) {
      this.store.active.taskText = task.taskText;
      this.edit(this.store.active);
    } else {
      this.add(task);
    }
  }

  edit(task: Task) {
    this.http.patch<Task>(`http://localhost:3000/tasks/${task.id}`, task)
      .subscribe(result => this.store.edit(task))
  }

  add(task: Task) {
    this.http.post<Task>('http://localhost:3000/tasks', task)
      .subscribe(result => this.store.add(result))
  }

  setActive(task: Task) {
    this.store.setActive(task);
  }

  reset() {
    this.store.reset();
  }
}

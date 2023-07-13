import { Component } from '@angular/core';
import { TaskListService } from './services/task-list.service';
import { TaskListStore } from './services/task-list.store';
@Component({
  selector: 'ac-task-list',
  template: `
    <ac-card title="FORM">
      <ac-task-list-form
        [active]="this.store.active"
        (save)="this.actions.save($event)"
        (reset)="this.actions.reset()"
      ></ac-task-list-form>
    </ac-card>
    <ac-card title="LIST">
      <ac-task-list-collection
        [tasks]="this.store.tasks"
        [active]="this.store.active"
        (setActive)="this.actions.setActive($event)"
        (editCompletion)="this.actions.editCompletion($event)"
        (delete)="this.actions.deleteHandler($event)"
      ></ac-task-list-collection>
    </ac-card>
  `,
  styles:[]
})
export class TaskListComponent {

  constructor(
    public actions: TaskListService,
    public store: TaskListStore
  ) {
    this.actions.tasksInit();
  }
}

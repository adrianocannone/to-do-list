import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../model/task';

@Component({
  selector: 'ac-task-list-collection',
  template: `
    <div class="list-group">
      <div 
        class="list-group-item"
        *ngFor="let task of tasks"
        [ngClass]="{
          'active-not-completed': (active?.id === task.id) && !task.completed,
          'active-completed': (active?.id === task.id) && task.completed
        }"
        (click)="setActive.emit(task)"
      >
        <span [ngClass]="{'completed': task.completed}" >
          {{task.taskText}}
        </span>
        <div class="pull-right" *ngIf="active?.id === task.id">
          <i 
            class="fa"
            [ngClass]="task.completed? 'fa-close' : 'fa-check'"
            [style.color]="task.completed? null : 'green'"
            (click)="editCompletion.emit(task)"
          ></i>
          <i 
            class="fa fa-trash" 
            style="color: red;"
            (click)="deleteHandler($event, task)"
          ></i>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .completed {
    color: green;
    font-weight: bold;
  }`,
    `
  .active-not-completed {
    background-color: #EAEAEA;
  }`,
  `.active-completed {
    background-color: #66FF99;
  }`]
})

export class TaskListCollectionComponent {
  @Input() tasks: Task[] = [];
  @Input() active: Task | null = null;
  @Output() setActive: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() editCompletion: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() delete: EventEmitter<Task> = new EventEmitter<Task>();

  deleteHandler(event: MouseEvent, task: Task) {
    event.stopPropagation();
    this.delete.emit(task);
  }
}

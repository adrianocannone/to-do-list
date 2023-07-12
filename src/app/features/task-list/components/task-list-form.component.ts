import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Task } from '../model/task';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ac-task-list-form',
  template: `
    <form #f="ngForm" (submit)="saveHandler()">
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
          {{active?.id ? 'Modifica task' : 'Crea task'}}
        </button>
        <button 
          type="button"
          class="btn btn-warning"
          (click)="resetHandler()"
          *ngIf="active"
        >Reset</button>
      </div>
    </form>
  `,
  styles: [
  ]
})
export class TaskListFormComponent implements OnChanges{
  @Input() active: Task | null = null;
  @Output() save: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() reset: EventEmitter<NgForm> = new EventEmitter<NgForm>();
  @ViewChild('f') form!: NgForm

  ngOnChanges(changes: SimpleChanges): void {
    const active: Task = changes['active'].currentValue
    if(this.form && !active.id){
      this.form.reset();
    }
  }

  saveHandler() {
    this.save.emit(this.form.value);
  }

  resetHandler(){
    this.reset.emit();
    this.form.reset();
  }
}

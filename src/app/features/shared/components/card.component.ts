import { Component, Input } from '@angular/core';

@Component({
  selector: 'ac-card',
  template: `
    <div class="card bg-dark mb-3">
      <div
        class="card-header text-white"
        (click)="opened = !opened"
      >
        <i
          class="fa"
          [ngClass]="{
            'fa-arrow-right': opened,
            'fa-arrow-down': !opened
          }"
        ></i>
        {{title}}
      </div>
      <div class="card-body" *ngIf="opened">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class CardComponent {
  @Input() title: string = '';
  opened: boolean = true;
}

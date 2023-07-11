import { Component } from '@angular/core';
@Component({
  selector: 'ac-root',
  template: `
    <!--<navbar></navbar>-->
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'to-do-list';
}

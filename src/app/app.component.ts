import { Component } from '@angular/core';
@Component({
  selector: 'ac-root',
  template: `
    <!--<navbar></navbar>-->
    <div class="container mt-3">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'to-do-list';
}

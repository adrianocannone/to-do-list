import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './features/task-list/task-list.component';

const routes: Routes = [
  { path: 'task-list', component: TaskListComponent},
  { path: '**', redirectTo: 'task-list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

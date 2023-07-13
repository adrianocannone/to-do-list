import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './features/task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TaskListCollectionComponent } from './features/task-list/components/task-list-collection.component';
import { TaskListFormComponent } from './features/task-list/components/task-list-form.component';
import { CardComponent } from './features/shared/components/card.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskListCollectionComponent,
    TaskListFormComponent,
    //shared
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

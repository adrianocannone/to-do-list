import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TaskListStore {
    tasks: Task[] = [];
    active: Task | null = null;

    add(task: Task){
        this.tasks.push(task);
        this.active = null;
    }

    edit(task: Task){
        const index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks[index] = task;
        this.reset();
    }

    delete(task: Task){
        const index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks.splice(index, 1);
        this.reset();
    }

    load(tasks: Task[]){
        this.tasks = tasks;
    }

    setActive(task: Task) {
        this.active = task;
    }

    reset() {
        this.active = null;
    }
}

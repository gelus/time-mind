import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetTasks, Task } from '../../ai-functions/get-tasks';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {IntersectionObserverDirective} from '../../ui-components/intersection-observer.directive';
import {ModalService} from '../../modal.service';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import {CreateUpdateTasks} from '../../ai-functions/create-update-tasks';

function random(min: any, max: any) {
  const x = (Math.random()*(max-min)) + min;
  return x
}

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, ProgressBarComponent, IntersectionObserverDirective],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

  taskList = signal<Task[]>([]);

  constructor(
    private modalService: ModalService,
  ){
    this.getTasks();
  }

  async getTasks() {
    const tasks = await GetTasks();
    this.taskList.set(tasks.tasks);
  }

  toggleComplete(task: Task) {
    task.complete = !task.complete;
    CreateUpdateTasks({tasks:[task]});
    if (task.complete) {
      this.taskList.update(values => {
        const newItems = [...values];
        newItems.splice(newItems.indexOf(task), 1);
        return newItems;
      });
    }
  }

  openModal(task?: Task) {
    this.modalService.open({component: EditModalComponent, initialState: {task}}).subscribe(e => {
      console.log(e);
    });
  }

}

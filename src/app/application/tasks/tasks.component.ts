import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetTasks, Task } from '../../ai-functions/get-tasks';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {IntersectionObserverDirective} from '../../ui-components/intersection-observer.directive';
import {ModalService} from '../../modal.service';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import {CreateUpdateTasks} from '../../ai-functions/create-update-tasks';
import {FormsModule} from '@angular/forms';
import {SearchPipe} from './search.pipe';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, FormsModule, ProgressBarComponent, IntersectionObserverDirective, SearchPipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

  taskList = signal<Task[]>([]);
  showCompleted = false;
  searchString='';

  constructor(
    private modalService: ModalService,
  ){
    this.getTasks();
  }

  async getTasks() {
    const tasks = await GetTasks(false);
    const myTasks = tasks.tasks.filter(t => !!t.complete === this.showCompleted);
    this.taskList.set(myTasks);
  }

  toggleComplete(task: Task) {
    task.complete = !task.complete;
    CreateUpdateTasks({tasks:[task]});
    if (task.complete && !this.showCompleted) {
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

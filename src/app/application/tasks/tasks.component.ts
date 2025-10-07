import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetTasks, Task } from '../../ai-functions/get-tasks';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {IntersectionObserverDirective} from '../../ui-components/intersection-observer.directive';
import {ModalService} from '../../modal.service';
import { EditModalComponent } from './edit-modal/edit-modal.component';

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
  taskList: Task[] = [];
  taskListfiller: Task[] = [
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '1', userId: '', summary: 'To Do Item 1', description: 'This is my to do item number 1, it is number 1 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '2', userId: '', summary: 'To Do Item 2', description: 'This is my to do item number 2, it is number 2 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '3', userId: '', summary: 'To Do Item 3', description: 'This is my to do item number 3, it is number 3 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '4', userId: '', summary: 'To Do Item 4', description: 'This is my to do item number 4, it is number 4 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '5', userId: '', summary: 'To Do Item 5', description: 'This is my to do item number 5, it is number 5 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '6', userId: '', summary: 'To Do Item 6', description: 'This is my to do item number 6, it is number 6 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '7', userId: '', summary: 'To Do Item 7', description: 'This is my to do item number 7, it is number 7 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '8', userId: '', summary: 'To Do Item 8', description: 'This is my to do item number 8, it is number 8 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '9', userId: '', summary: 'To Do Item 9', description: 'This is my to do item number 9, it is number 9 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '10', userId: '', summary: 'To Do Item 10', description: 'This is my to do item number 10, it is number 10 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '11', userId: '', summary: 'To Do Item 11', description: 'This is my to do item number 11, it is number 11 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '12', userId: '', summary: 'To Do Item 12', description: 'This is my to do item number 12, it is number 12 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '13', userId: '', summary: 'To Do Item 13', description: 'This is my to do item number 13, it is number 13 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '14', userId: '', summary: 'To Do Item 14', description: 'This is my to do item number 14, it is number 14 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '15', userId: '', summary: 'To Do Item 15', description: 'This is my to do item number 15, it is number 15 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '16', userId: '', summary: 'To Do Item 16', description: 'This is my to do item number 16, it is number 16 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '17', userId: '', summary: 'To Do Item 17', description: 'This is my to do item number 17, it is number 17 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '18', userId: '', summary: 'To Do Item 18', description: 'This is my to do item number 18, it is number 18 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '19', userId: '', summary: 'To Do Item 19', description: 'This is my to do item number 19, it is number 19 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '20', userId: '', summary: 'To Do Item 20', description: 'This is my to do item number 20, it is number 20 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '21', userId: '', summary: 'To Do Item 21', description: 'This is my to do item number 21, it is number 21 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '22', userId: '', summary: 'To Do Item 22', description: 'This is my to do item number 22, it is number 22 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '23', userId: '', summary: 'To Do Item 23', description: 'This is my to do item number 23, it is number 23 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '24', userId: '', summary: 'To Do Item 24', description: 'This is my to do item number 24, it is number 24 for a reason, and it is a good reason.'},
    {timeEstimate: random(7,8), timeScheduled: random(2,8), timeCompleted: random(2,8),id: '25', userId: '', summary: 'To Do Item 25', description: 'This is my to do item number 25, it is number 25 for a reason, and it is a good reason.'},
  ];

  constructor(
    private modalService: ModalService,
  ){
    this.getTasks();
  }

  async getTasks() {
    const tasks = await GetTasks();
    this.taskList = tasks.tasks;
    console.log(tasks);
  }

  openModal(task?: Task) {
    this.modalService.open({component: EditModalComponent, initialState: {task}}).subscribe(e => {
      console.log(e);
    });
  }

}

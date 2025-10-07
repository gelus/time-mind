import { Component, Input, inject } from '@angular/core';
import {Task} from '../../../ai-functions/get-tasks';
import {FormsModule} from '@angular/forms';
import {ModalService} from '../../../modal.service';
import {CreateUpdateTasks} from '../../../ai-functions/create-update-tasks';
import {DeleteTasks} from '../../../ai-functions/delete-tasks';

@Component({
  selector: 'app-edit-modal',
  imports: [FormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss'
})
export class EditModalComponent {
  protected modalService = inject(ModalService);
  @Input() task: Task = {} as Task;

  async saveTask() {
    await CreateUpdateTasks({tasks: [this.task]});
    console.log('Saving the Task', this.task);
    this.modalService.close(this.task);
  }

  async deleteTask() {
    await DeleteTasks({tasks: [this.task.id]});
    console.log('deleting the Task', this.task);
    this.modalService.close();
  }

}

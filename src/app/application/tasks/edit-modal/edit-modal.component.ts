import { Component, Input, inject } from '@angular/core';
import {Task} from '../../../ai-functions/get-tasks';
import {FormsModule} from '@angular/forms';
import {ModalService} from '../../../modal.service';

@Component({
  selector: 'app-edit-modal',
  imports: [FormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss'
})
export class EditModalComponent {
  protected modalService = inject(ModalService);
  @Input() task: Task = {} as Task;

  saveTask() {
    console.log('Saving the Task', this.task);
    this.modalService.close(this.task);
  }

}

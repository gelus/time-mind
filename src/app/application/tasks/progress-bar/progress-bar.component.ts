import { Component, Input } from '@angular/core';
import {Task} from '../../../ai-functions/get-tasks';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  estimate = 0;
  scheduled = 0;
  completed = 0;
  scheduledPercent = 0;
  completedPercent = 0;

  @Input() set task(task: Task) {
    this.estimate = task.timeEstimate || 0;
    this.scheduled = task.timeScheduled || 0;
    this.completed = task.timeCompleted || 0;
    this.scheduledPercent = this.estimate ? Math.min((this.scheduled/this.estimate)*100, 100) : 0;
    this.completedPercent = this.estimate ? Math.min((this.completed/this.estimate)*100, 100) : 0;
  }

}

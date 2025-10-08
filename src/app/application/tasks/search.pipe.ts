import { Pipe, PipeTransform } from '@angular/core';
import {Task} from '../../ai-functions/get-tasks';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(tasks: Task[], search: string): Task[] {
    if (!search) return tasks;
    const s = search.toLowerCase();
    return tasks.filter(t => t.summary?.toLowerCase().includes(s) || t.description?.toLowerCase().includes(s));
  }

}

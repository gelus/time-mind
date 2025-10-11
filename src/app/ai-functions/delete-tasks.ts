import { writeBatch, doc } from "firebase/firestore";
import { db } from '../firebase.config';
import {Schema} from "firebase/ai";
import {messages$} from "../message.util";

export const DeleteTasksDeclaration = {
  name: "DeleteTasks",
  description: "Delete a Tasks by id",
  parameters: Schema.object({
    properties: {
      "tasks": Schema.array({
        "description": "An array of task ids to be deleted.",
        items: Schema.string({
          "description": "A task id"
        })
      })
    }
  })
}

export const DeleteTasks = async ({tasks}:{tasks:string[]}) => {

  messages$.next('Removing Tasks');
  const batch = writeBatch(db);

    for(const taskId of tasks) {
      const taskRef = doc(db, 'tasks', taskId);
      batch.delete(taskRef);
    }

    await batch.commit();
    (window as any).toastr.success('Tasks have been removed');
}

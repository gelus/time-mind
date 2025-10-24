import { writeBatch, doc } from "firebase/firestore";
import { db } from '../firebase.config';
import { Task } from  './get-tasks'
import {Schema} from "firebase/ai";
import {taskSchema} from "./schema.util";
import { getUser } from "../auth.service";
import {messages$} from "../message.util";

export const CreateUpdateTasksDeclaration = {
  name: "CreateUpdateTasks",
  description: "Add/Create a new task, or update an existing Tasks on the users task list. Task without an id will be created, task that have a valid id will be updated",
  parameters: Schema.object({
    properties: {
      "tasks": Schema.array({
        "description": "an array of tasks to be created or updated, task without an id will be created, task that have a valid id will be updated.",
        items: taskSchema
      })
    }
  })
}

export const CreateUpdateTasks = async ({tasks}:{tasks:Task[]}) => {
  const batch = writeBatch(db);
  const user = getUser();
  const messageArray = [];

  messages$.next('Updating Tasks');

  if (user) {
    for(const task of tasks) {
      if (!task.id) task.id = crypto.randomUUID();
      messageArray.push(task.summary);
      task.userId = user.uid;
      const storedFields = (
        ({ id, userId, summary, complete=false, description='', timeEstimate=0, timeCompleted=0 }) =>
        ({ id, userId, summary, complete,       description,    timeEstimate,   timeCompleted   })
      )(task);
      const taskRef = doc(db, 'tasks', task.id);
      batch.set(taskRef, storedFields, {merge: true});
    }

    try {
      const ret = await batch.commit();
      console.log(ret);
      (window as any).toastr.success(messageArray.join('<br />'),'Tasks Updated');
      return {result: 'success'}
    } catch {
      (window as any).toastr.error(messageArray.join('<br />'),'Task Update Failed');
      return {result: 'task updated failed'}
    }
  } else {
    (window as any).toastr.error("User Not Found");
    throw "User Not Found"
  }
}

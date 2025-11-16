import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase.config';
import { messages$ } from '../message.util';

export interface Task {
  id: string;
  userId: string;
  summary: string;
  complete?: boolean;
  description?: string;
  open?: boolean;
  timeEstimate?: number; // time estimate in hours
  timeCompleted?: number; // time completed in hours
  timeScheduled?: number; // time scheduled in hours
  scheduledEventsIds?: string[];
}

export const GetTasksDeclaration = {
  name: "GetTasks",
  description: "A function to retreive the users tasks from their task list.",
}

export const GetTasks = async (aiMessage=true) => {
  if (aiMessage) messages$.next('Checking Tasks');
  const q = query(collection(db, "tasks"));

  const querySnapshot = await getDocs(q);
  const tasks: Task[] = [];
  querySnapshot.forEach((doc) => {
    tasks.push(doc.data() as Task);
  });
  console.log(tasks);
  return {tasks};
}

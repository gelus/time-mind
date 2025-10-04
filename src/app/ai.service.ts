import { Injectable } from '@angular/core';
import { GenerateContentResult, getAI, getGenerativeModel, GoogleAIBackend, InferenceMode, ModelParams, Part } from "firebase/ai";
import { firebaseApp } from './firebase.config';
import { tools } from './tool-declarations';
import { functions } from './ai-functions'

@Injectable({
  providedIn: 'root'
})
export class AiService {
  ai;
  model;
  chat;

  constructor() {
    // Initialize the Gemini Developer API backend service
    this.ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });

    // Create a `GenerativeModel` instance
    // Set the mode, for example to use on-device model when possible
    this.model = getGenerativeModel(this.ai, {
      model: "gemini-2.5-flash",
      mode: InferenceMode.PREFER_IN_CLOUD,
    } as ModelParams);

    this.chat = this.model.startChat({
      history: [],
      tools: tools,
      systemInstruction: {
        role: "system",
        parts: [{ text: this.getSystemInstruction() }],
      },
    });

  }

  getSystemInstruction() {
    const disposition = "playful";
    return `You are a masterful schedule keeper. Adept at managing, updating, and analyzing events on a calendar, all in a ${disposition} disposition.
    When you recieve a message follow these steps:
    1 Carefully analyze the request, noting all relevant information from the message and previous messages, Infering all information needed.
    2 Use the GetEvents function call to obtain any needed information about referenced events.
      When looking up information, start at the beginning of a day (00:00:00), and end the end of that day (23:59:59)
    3 make function calls to Update the calendar as instructed.
      Multiple function calls can be made at the same time. Group function calls together as much as possible.
    4 Provide appropriate feedback on what was done, answering any questions, and outlining what changes were made.
      Provide useful suggestions on how best to optimize the schedule or what to do next.

    Rules:
    - All dates must be used in the user's time zone, matching the data returned from the calendar functions. Use dates in this time zone, when creating, editing or refering to all times.
    - Generally dates are relative to today. "Friday" means the upcoming Friday, "The weekend" is the upcoming weekend, and so on.
    - DO NOT discuss internal workings such as functions, ids or data. Refer to events only by their summary, description, and dates.

    Initial Context:
    Today is ${new Date().toString()},
    use the prefered date and time format of "EEEE MMM d, YYYY hh:mm tt"
    `
  }

  async sendChat(prompt: string | (string|Part)[]): Promise<GenerateContentResult> {

    console.log('Chat sent:', prompt)
    //if (typeof prompt === 'string') prompt = {}

    let result = await this.chat.sendMessage(prompt);
    const functionCalls = result.response.functionCalls();

    console.log('InitialResult recieved', result.response.text());

    if (functionCalls && functionCalls.length > 0) {
      const functionPromises = [];
      console.log('Calling Functions', functionCalls)
      for (const call of functionCalls) {
        console.log('calling', call.name);
        if (functions[call.name]) {
          functionPromises.push(functions[call.name](call.args));
        }
      }
      const functionResults = await Promise.all(functionPromises);
      console.log('functionResults', functionResults);
      result = await this.sendChat(functionResults.map((e,i): Part => ({
        functionResponse: {
          name: functionCalls[i].name,
          response: e
        }
      })));
    }

    console.log('Final Result', result)

    return result;

  } // close sendChat
}

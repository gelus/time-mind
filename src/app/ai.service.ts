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
      tools: tools
    } as ModelParams);

    this.chat = this.model.startChat({
      tools: tools
    });
  }

  async sendChat(prompt: string | (string|Part)[]): Promise<GenerateContentResult> {

    console.log('Chat sent', prompt)
    //if (typeof prompt === 'string') prompt = {}

    let result = await this.chat.sendMessage(prompt);
    const functionCalls = result.response.functionCalls();

    console.log('InitialResult recieved', result, functionCalls);

    if (functionCalls && functionCalls.length > 0) {
      const functionPromises = [];
      console.log('Calling Functions')
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

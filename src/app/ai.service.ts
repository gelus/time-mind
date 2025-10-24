import { Injectable } from '@angular/core';
import { GenerateContentResult, getAI, getGenerativeModel, GoogleAIBackend, InferenceMode, ModelParams, Part } from "firebase/ai";
import { firebaseApp } from './firebase.config';
import { tools } from './tool-declarations';
import { functions } from './ai-functions'
import { baseInstructions } from './system-instructions';
import {messages$} from './message.util';

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

    this.model = getGenerativeModel(this.ai, {
      model: "gemini-2.5-flash",
      mode: InferenceMode.PREFER_IN_CLOUD,
      //mode: InferenceMode.PREFER_ON_DEVICE,
      //mode: InferenceMode.ONLY_ON_DEVICE,
    } as ModelParams);

    this.chat = this.model.startChat({

      tools: tools,
      history: [
        {role: "user", parts: [{text: this.getSystemInstruction()}]}
      ],
      systemInstruction: {
        role: "system",
        parts: [{ text: this.getSystemInstruction() }],
      },
    });

  }

  getSystemInstruction() {
    return baseInstructions;
    //return onDeviceInstructions;
  }

  async sendChat(prompt: string | (string|Part)[], recursive=false): Promise<GenerateContentResult> {

    let result = await this.chat.sendMessage(prompt);
    let functionCalls = result.response.functionCalls();

    console.log('results recieved\n', result.response.text());

    if (functionCalls && functionCalls.length > 0) {
      const functionPromises = [];
      console.log('Calling Functions', functionCalls)
      for (const call of functionCalls) {
        messages$.next('Calling Function '+ call.name)
        if (functions[call.name]) {
          console.log('calling', call.name);
          functionPromises.push(functions[call.name](call.args));
        }
      }
      const functionResults = await Promise.all(functionPromises);
      console.log('functionResults', functionResults);
      let formatedFunctionResults;

      // in cloud function handling from tooling
      formatedFunctionResults = functionResults.map((e,i): Part => ({
        functionResponse: {
          name: functionCalls?.[i].name || '',
          response: e
        }
      }))

      result = await this.sendChat(formatedFunctionResults, true);
    }

    if (!recursive) {
      messages$.next(null);
      console.log('Final Result', result)
    }

    return result;

  } // close sendChat
}

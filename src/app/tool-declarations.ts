import {FunctionDeclarationsTool} from "firebase/ai"
import { Tool } from "firebase/ai";
import { functionDeclarations } from './ai-functions';

console.log(functionDeclarations)

export const calendarTool: FunctionDeclarationsTool = { functionDeclarations };

export const tools: Tool[] = [ calendarTool ];

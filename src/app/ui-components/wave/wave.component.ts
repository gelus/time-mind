import {CommonModule} from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wave',
  imports: [CommonModule],
  templateUrl: './wave.component.html',
  styleUrl: './wave.component.scss'
})
export class WaveComponent {

  svgStyle = {
    "width": `calc(${this.random(100, 300)}% + 1.3px)`,
    //"transform": `rotateY(${this.random(1,2)===2?'0':'180'}deg)`,
  }

  random(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

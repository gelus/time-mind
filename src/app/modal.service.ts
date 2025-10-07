import { Injectable, Type } from '@angular/core';
import {Subject, take} from 'rxjs';

export interface ModalEventOptions {
  component?: Type<any>;
  initialState?: {[key: string]: any};
}

export interface ModalEvent {
  type: 'open'|'close';
  options?: ModalEventOptions;
  output?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalEvents$ = new Subject<ModalEvent>();

  constructor() {}

  open(opts?: ModalEventOptions) {
    const options: ModalEventOptions = {
      ...opts,
      initialState : structuredClone(opts?.initialState),
    };
    this.modalEvents$.next({type: 'open', options});
    return this.modalEvents$.pipe(take(1));
  }

  close(output?: any) {
    this.modalEvents$.next({type: 'close', output});
  }

}

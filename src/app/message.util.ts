import {NgZone} from '@angular/core';
import {Subject} from 'rxjs';

export const messages$ = new Subject<string|null>();

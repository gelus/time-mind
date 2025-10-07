import { Component, ElementRef, HostBinding, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
import {ModalService, ModalEvent, ModalEventOptions} from '../modal.service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @HostBinding('class.modal-open') open: boolean = false;
  @ViewChild('dynamicComponentHost', { read: ViewContainerRef }) dynamicComponentHost!: ViewContainerRef;

  constructor(
    protected modalService: ModalService,
  ) {
    this.modalService.modalEvents$.subscribe((event: ModalEvent) => {
      if(event.type === 'open') this.openModal(event.options);
      else if (event.type === 'close') this.closeModal();
    });
  }

  openModal(options?: ModalEventOptions) {
    if (options?.component) {
      const componentRef = this.dynamicComponentHost.createComponent(options.component);
      console.log(options);
      if (options?.initialState) {
        for (let [key, value] of Object.entries(options.initialState)) {
          if (typeof value !== 'undefined')componentRef.instance[key] = value;
        }
      }
    }
    this.open = true;
  }

  closeModal() {
    this.dynamicComponentHost.clear();
    this.open = false;
  }

}

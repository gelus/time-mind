import { Directive, ElementRef, Input, inject } from '@angular/core';

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective {

  @Input('appScrollTo') scrollTo?: HTMLElement;

  private el = inject(ElementRef);

  ngAfterViewInit(): void {
    this.scrollToElement(this.scrollTo || this.el.nativeElement);
  }

  /** Scrolls to the element smoothly */
  scrollToElement(element:HTMLElement, behavior: ScrollBehavior = 'smooth') {
    element.scrollIntoView({ behavior, block: 'center' });
  }

}

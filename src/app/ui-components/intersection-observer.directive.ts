import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[appIntersectionObserver]'
})
export class IntersectionObserverDirective {
  @Input() intersectionOptions: IntersectionObserverInit = {};
  @Output() appIntersectionObserver = new EventEmitter<IntersectionObserverEntry[]>();

  private observer: IntersectionObserver;

  constructor(private el: ElementRef) {
    this.observer = new IntersectionObserver((entries) => {
      if (this.appIntersectionObserver.observers.length) this.appIntersectionObserver.emit(entries);
      else {
        entries.forEach( entry => {
          if (entry.isIntersecting) entry.target.classList.add('intersect-show');
          else entry.target.classList.remove('intersect-show');
        })
      }
    }, this.intersectionOptions);

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

}

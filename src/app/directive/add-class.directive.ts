import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[hover-classes]'
})
export class AddClassDirective {
  public target :any;
  constructor(public elementRef:ElementRef) { }
  @Input('hover-classes') hoverClass:any;

  @HostListener('mouseenter', ['$event.target']) onMouseEnter() {
    // alert("mouse hover")
    // console.log(target.value);
    this.elementRef.nativeElement.classList.add(this.hoverClass);
 }

  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.classList.remove(this.hoverClass);
  }
}

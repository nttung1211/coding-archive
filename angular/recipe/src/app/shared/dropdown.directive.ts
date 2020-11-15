import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor(private eleRef: ElementRef) { }

  // @HostListener('click') onOpen() {
  //   this.isOpen = !this.isOpen;
  // }

  @HostListener('document:click', ['$event']) onOpen(event: Event) {
    // we can put inside others parameter other than $event to pass to onOpen()
    if (this.eleRef.nativeElement.contains(event.target)) {
      this.isOpen = !this.isOpen;
    } else {
      this.isOpen = false;
    }
    // contains() counts the children nodes and the node it  self
  }

}

import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { } // self: order does matter
  // @Input() defaultColor = 'green';
  @Input('appBetterHighlight') defaultColor = 'green';
  @Input() highlightColor = 'red';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  ngOnInit() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', '#acd');
    this.backgroundColor = this.defaultColor; //we assign it here but not when it was declared 'cause here it will be execused after the object instance is created, thus defaulColor is already changed because of the property binding.
  }

  @HostListener('mouseover') onMouseover(event: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', '#acd');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') onMouseleave(event: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }
}


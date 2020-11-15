import { Directive, Input, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective implements OnInit {
  @Input('appUnless') set unless(condition: boolean) { // or we can name the property directly the same as the selector with out having to set alias
    if (!condition) {
      this.VCRef.createEmbeddedView(this.eleRef);
    } else {
      this.VCRef.clear();
    }
  };
  /* we use setter here for the reason that whenever the property unless changes the function will be executed. it is a feature of setter that we can see in defineProperty in mdn */

  constructor(private eleRef: TemplateRef<any>, private VCRef: ViewContainerRef) { }

  ngOnInit() {
    
  }
}

import { 
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ContentChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: 'app.component.html'
})

export class ServerElementComponent implements OnInit, OnChanges {

  @Input('thisElement') element: {
    type: string,
    name: string,
    content: string 
  }

  @ContentChild('paragraph') para: ElementRef;

  constructor() { 
    console.log('constructor called')
  }

  ngOnChanges(changes: SimpleChanges) { 
    console.log('ngOnChanges called', changes)
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called: ' + this.para.nativeElement.textContent)
  }

  ngOnInit() { 
    console.log('ngOnInit called')
  }
}
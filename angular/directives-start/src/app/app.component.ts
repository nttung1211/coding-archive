import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked{
  numbers = [1, 2, 3, 4, 5];
  onlyOdd = true;
  value = 2;

  /* test using native method */
  // @ViewChild('testcolor') testcolor: ElementRef;

  

  constructor() {
  }
  
  ngAfterViewChecked() {
    /* test using native method */
    // this.testcolor.nativeElement.classList.add('tungmai');
    // console.log(this)
  }

}

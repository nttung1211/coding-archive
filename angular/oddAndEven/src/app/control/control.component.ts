import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  @Output('thisCounting') counting = new EventEmitter<{ value: number, isOdd: boolean }>();
  @Output('thisReset') reset = new EventEmitter();
  myInterval;
  counter = 0;

  constructor() { }

  emitCountingEvent() {
    if (!this.myInterval) {
      this.myInterval = setInterval(() => {
        this.counter++;
  
        this.counting.emit({
          value: this.counter,
          isOdd: this.counter % 2 === 1
        })
  
      }, 1000);
    }
  }

  stopEmitting() {
    clearInterval(this.myInterval);
    this.myInterval = false;
  }

  resetCounting() {
    this.counter = 0;
    this.reset.emit();
  }

  ngOnInit(): void {
  }

}

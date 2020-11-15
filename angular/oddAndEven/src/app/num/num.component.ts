import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-num',
  templateUrl: './num.component.html',
  styleUrls: ['./num.component.css']
})
export class NumComponent implements OnInit {

  @Input('thisElement') element: {
    value: string,
    isOdd: boolean
  };

  constructor() { }

  ngOnInit(): void {
  }

}

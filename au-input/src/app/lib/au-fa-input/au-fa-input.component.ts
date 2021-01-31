import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'au-fa-input',
  templateUrl: './au-fa-input.component.html',
  styleUrls: ['./au-fa-input.component.css']
})
export class AuFaInputComponent implements OnInit {
  @Input() icon: string;

  @Input() placeholder: string;

  constructor() { }

  ngOnInit() {
  }
  /* other way of doing it  */
  get classes(){
    const cssclasses = {
      'fa' : true
    }
    if (this.icon) {
      return cssclasses['fa-' + this.icon] = true;
    }
    return cssclasses;
  }
}

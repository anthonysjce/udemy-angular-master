import {Component, ViewChild} from '@angular/core';
import { AuModalOpenOnClickDirective } from './au-modal/au-modal-open-on-click.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginActive = true;
  
  @ViewChild('modal',{static: false})
  directive;

  setLoginActive(loginActive) {
    this.loginActive = loginActive;
  }
  ngAfterViewInit(){   
    console.log(this.directive); // this reference is AuModalOpenOnClickDirective
  } 
}


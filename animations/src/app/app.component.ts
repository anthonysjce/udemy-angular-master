import {Component} from '@angular/core';
import { fadeInOut } from './animation';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [fadeInOut]
})
export class AppComponent {



}

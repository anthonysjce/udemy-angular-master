import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import * as includes from 'lodash.includes';
import { overWriteCharAtPosition, SPECIAL_CHARACTERS, TAB } from './mask.utils';

@Directive({
  selector: '[au-mask]'
})
export class AuMaskDirective implements OnInit {

  @Input('au-mask')
  mask = '';

  input:HTMLInputElement;
  constructor(e1:ElementRef) {
    this.input = e1.nativeElement;
   }
   ngOnInit(){
    this.input.value = this.buildPlaceHolder();
   }

   @HostListener("keydown", ['$event', '$event.keyCode'])
   onKeyDown($event: KeyboardEvent, keyCode) {
      if (keyCode !== TAB) {
        $event.preventDefault();
      }
      const key = String.fromCharCode(keyCode),
        cursorPos = this.input.selectionStart;
      const currentValue = this.input.value;
      overWriteCharAtPosition(this.input,cursorPos,key);      
   }

   buildPlaceHolder() {
    
     const chars = this.mask.split('');
     return chars.reduce((result,char) => {
       return result += includes(SPECIAL_CHARACTERS,char) ? char : '_';
     },'')
    
   }
}

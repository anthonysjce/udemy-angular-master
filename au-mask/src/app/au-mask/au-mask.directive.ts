import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as includes from 'lodash.includes';
import { SPECIAL_CHARACTERS } from './mask.utils';

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
   buildPlaceHolder() {
    
     const chars = this.mask.split('');
     return chars.reduce((result,char) => {
       return result += includes(SPECIAL_CHARACTERS,char) ? char : '_';
     },'')
    
   }
}

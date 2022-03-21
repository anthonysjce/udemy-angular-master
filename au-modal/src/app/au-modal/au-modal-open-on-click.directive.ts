import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuModalService } from './modal.service';

@Directive({
  selector: '[auModalOpenOnClick]',
  exportAs: 'auModalDirective'
})
export class AuModalOpenOnClickDirective implements OnDestroy{
  elements:HTMLBaseElement[];
  
  constructor(private templateRef:TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private modalService: AuModalService) { 
      this.modalService.$close.subscribe(() => this.viewContainer.clear())
    }
    
    
    @Input()
    set auModalOpenOnClick(els) {
      //els can be array or a single element
      //check if it is an array
      
      if(els.length ) {
        this.elements = els;
      } 
      else {
        this.elements = [];
        this.elements.push(els);
      }
      this.elements.forEach(e1 => {        
        e1.addEventListener('click', this.clickHandler);
      });
      
    }
    /* below function 'this' will this will point to button 
    since . when we add listner function to an element 'this' will point
    to the button. if below function is arrow function then this will point to the parent scope that is lexical scope
    that is the directive itself and hence this.viewContainer will not throw errow
    . so binding is not required if it is arrow function  */
    /* clickHandler(e) {
      console.log(this);
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    } */
    clickHandler = ((e) => {
      console.log(this);
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    })//.bind(this);
    
    ngOnDestroy() {
      this.elements.forEach(e1 => {
        e1.removeEventListener('click', this.clickHandler);
      });
    }
}

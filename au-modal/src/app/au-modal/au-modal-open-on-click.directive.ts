import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuModalService } from './modal.service';

@Directive({
  selector: '[auModalOpenOnClick]'
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
    clickHandler(){
      console.log(this);
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    ngOnDestroy() {
      this.elements.forEach(e1 => {
        e1.removeEventListener('click', this.clickHandler);
      });
    }
}

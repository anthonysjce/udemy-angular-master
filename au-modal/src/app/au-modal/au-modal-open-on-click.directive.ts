import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[auModalOpenOnClick]'
})
export class AuModalOpenOnClickDirective {

  constructor(private templateRef:TemplateRef<any>,
    private viewContainer: ViewContainerRef) { 

    }

    @Input()
    set auModalOpenOnClick(els) {
      //els can be array or a single element
      //check if it is an array
      let elements:HTMLBaseElement[];
      if(els.length ) {
        elements = els;
      } 
      else {
        elements = [];
        elements.push(els);
      }
      elements.forEach(e1 => {
        e1.addEventListener('click', () => {
          this.viewContainer.clear();
          this.viewContainer.createEmbeddedView(this.templateRef)
        });
      });
      
    }
}

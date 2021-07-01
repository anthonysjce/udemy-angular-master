import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { AuModalService } from './modal.service';

@Component({
  selector: 'au-modal',
  templateUrl: './au-modal.component.html',
  styleUrls: ['./au-modal.component.scss']
})
export class AuModalComponent implements OnInit {
  
  @Input()
  body:TemplateRef<any>;

  constructor(private modalService: AuModalService,
    private eventManager: EventManager) { }

  ngOnInit() {
    this.eventManager.addGlobalEventListener('window','keyup.esc',() => {
      this.modalService.close();
    })
  }
  
  closeModal(){
    this.modalService.close();
  }
  cancelModal(event:KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}

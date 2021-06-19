import { AfterContentInit, AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { AuTabComponent } from 'app/au-tab/au-tab.component';

@Component({
  selector: 'au-tab-panel',
  templateUrl: './au-tab-panel.component.html',
  styleUrls: ['../tab-panel.component.scss']
})
export class AuTabPanelComponent implements OnInit, AfterContentInit {

  @ContentChildren(AuTabComponent)
  tabs:QueryList<AuTabComponent>;

 /*  @ViewChild(TemplateRef,{static: false})
  headerTemplate: TemplateRef<any>; */
  @Input()
  headerTemplate: TemplateRef<any>;

  constructor() {    

   }

  ngOnInit() {
  }
 /*  ngAfterViewInit(){   //used for studying @ViewChild 
    console.log(this.headerTemplate.elementRef); 
  } */
  ngAfterContentInit(){
    //console.log(this.tabs);
    const selectedTab = this.tabs.find(tab => tab.selected);
    
    if(!selectedTab) {
      this.tabs.first.selected = true;
    }
  }
  selectTab(tab: AuTabComponent){
    this.tabs.forEach(tab => tab.selected = false);
    tab.selected = true;
  }
  get tabsContext(){
    return {
      tabs: this.tabs
    }
  }
}

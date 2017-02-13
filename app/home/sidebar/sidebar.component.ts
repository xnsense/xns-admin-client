import { Component, OnInit, Input } from '@angular/core';
import { XnsService } from '../../api/xns.service';

@Component({
  moduleId: module.id,
  selector: 'xns-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: [ 'sidebar.component.css' ]
})
export class SidebarComponent {
  @Input() toggled: boolean = false;
}
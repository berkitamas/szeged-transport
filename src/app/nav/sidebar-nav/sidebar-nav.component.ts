import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent implements OnInit {
  @Input() items: Array<any>;
  @Input() sidenav: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

  toggleButton() {
    this.sidenav.toggle();
  }

}

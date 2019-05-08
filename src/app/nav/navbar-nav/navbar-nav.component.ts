import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-navbar-nav',
  templateUrl: './navbar-nav.component.html',
  styleUrls: ['./navbar-nav.component.scss']
})
export class NavbarNavComponent implements OnInit {
  @Input() items: Array<any>;
  @Input() sidenav: MatSidenav;

  constructor() { }

  ngOnInit() {
    console.log(this.items);
  }

  toggleButton() {
    this.sidenav.toggle();
  }


}

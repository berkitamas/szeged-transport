import { Component, OnInit } from '@angular/core';
import {AgencyService} from '../core/services/agency.service';
import {Observable} from 'rxjs';
import {Agency} from '../core/models/agency';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  agencies$: Observable<Agency[]>;

  constructor(private agencyService: AgencyService) { }

  ngOnInit() {
    this.agencies$ = this.agencyService.getAgencies();
  }

}

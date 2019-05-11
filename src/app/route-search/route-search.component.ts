import {Component, OnInit} from '@angular/core';
import {RouteService} from '../core/services/route.service';
import {RouteSearch} from '../core/models/route-search';
import {TransportType} from '../core/models/transport-type';
import {Stop} from '../core/models/stop';

@Component({
  selector: 'app-route-search',
  templateUrl: './route-search.component.html',
  styleUrls: ['./route-search.component.scss']
})
export class RouteSearchComponent implements OnInit {

  private transportTypes = [
    {name: 'Villamos', value: TransportType.TRAM},
    {name: 'Trolibusz', value: TransportType.TROLLEY},
    {name: 'Busz', value: TransportType.BUS},
  ];

  constructor(private routeService: RouteService) { }

  ngOnInit() {
    this.routeService.searchRoute(new RouteSearch({
      fromTime: new Date(1557328131000),
      toTime: new Date(1557414531000),
      wheelchair: true,
      types: [TransportType.TROLLEY, TransportType.TRAM],
      stops: [new Stop({id: 2429619152}), new Stop({id: 2429618792})]
    })).subscribe(console.log);
  }

}

import {Component, OnInit} from '@angular/core';
import {RouteService} from '../core/services/route.service';
import {Route} from '../core/models/route';
import {TransportType} from '../core/models/transport-type';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(private routeService: RouteService) { }

  trams: Route[];
  trolleys: Route[];
  buses: Route[];

  ngOnInit() {
    this.routeService.getRoutes().subscribe(routes => {
        this.trams = routes.filter(route => route.type === TransportType.TRAM);
        this.trolleys = routes.filter(route => route.type === TransportType.TROLLEY);
        this.buses = routes.filter(route => route.type === TransportType.BUS);
    });
  }

}

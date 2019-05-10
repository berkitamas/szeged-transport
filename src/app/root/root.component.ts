import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouteService} from '../core/services/route.service';
import {Route} from '../core/models/route';
import {TransportType} from '../core/models/transport-type';
import {SubscriptionLike} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit, OnDestroy {

  constructor(private routeService: RouteService) { }

  occasional: boolean;
  trams: Route[];
  trolleys: Route[];
  buses: Route[];
  routes: SubscriptionLike;

  ngOnInit() {
    this.routes = this.routeService.getRoutes(this.occasional).subscribe(routes => {
        this.trams = routes.filter(route => route.type === TransportType.TRAM);
        this.trolleys = routes.filter(route => route.type === TransportType.TROLLEY);
        this.buses = routes.filter(route => route.type === TransportType.BUS);
    });
  }

  ngOnDestroy(): void {
    this.routes.unsubscribe();
  }

  occasionalCheck() {
    this.routes.unsubscribe();
    this.routes = this.routeService.getRoutes(this.occasional).subscribe(routes => {
      this.trams = routes.filter(route => route.type === TransportType.TRAM);
      this.trolleys = routes.filter(route => route.type === TransportType.TROLLEY);
      this.buses = routes.filter(route => route.type === TransportType.BUS);
    });
  }

}

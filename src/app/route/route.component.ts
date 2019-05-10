import { Component, OnInit } from '@angular/core';
import {RouteService} from '../core/services/route.service';
import {Observable} from 'rxjs';
import {Route} from '../core/models/route';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {TransportType} from '../core/models/transport-type';
import {StopTime} from '../core/models/stop-time';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  route$: Observable<Route>;
  currentStops$: Observable<StopTime[]>;
  time: Date[] = [];

  constructor(private routeService: RouteService, private route: ActivatedRoute) {}


  ngOnInit() {
    this.route$ = this.route.params
      .pipe(switchMap(params => this.routeService.getRouteByID(+params.id)));
    this.currentStops$ = this.route.params
      .pipe(switchMap(params => this.routeService.getCurrentStopsByRoute(+params.id)));
  }

  transportTypeToName(type: TransportType): string {
    switch (type) {
      case TransportType.BUS: return 'Busz';
      case TransportType.TRAM: return 'Villamos';
      case TransportType.TROLLEY: return 'Trolibusz';
      case TransportType.UNKNOWN: return '';
    }
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {StopService} from '../core/services/stop.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, SubscriptionLike} from 'rxjs';
import {Stop} from '../core/models/stop';
import {switchMap} from 'rxjs/operators';
import {Route} from '../core/models/route';
import {TransportType} from '../core/models/transport-type';
import {StopTime} from '../core/models/stop-time';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html',
  styleUrls: ['./stop.component.scss']
})
export class StopComponent implements OnInit, OnDestroy {

  stopSub: SubscriptionLike;
  currentRoutes$: Observable<StopTime[]>;

  occasional: boolean;

  stop: Stop;
  trams: Route[];
  buses: Route[];
  trolleys: Route[];

  time: Date[] = [];

  constructor(private stopService: StopService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.stopSub = this.route.params
      .pipe(switchMap(params => this.stopService.getStopByID(+params.id, this.occasional)))
      .subscribe(value => {
        this.stop = value;
        this.trams = value.routes.filter(route => route.type === TransportType.TRAM);
        this.trolleys = value.routes.filter(route => route.type === TransportType.TROLLEY);
        this.buses = value.routes.filter(route => route.type === TransportType.BUS);
      });
    this.currentRoutes$ = this.route.params
      .pipe(switchMap(params => this.stopService.getCurrentRoutesByStops(+params.id)));
  }

  ngOnDestroy() {
    this.stopSub.unsubscribe();
  }

  occasionalCheck() {
    this.stopSub.unsubscribe();
    this.stopSub = this.route.params
      .pipe(switchMap(params => this.stopService.getStopByID(+params.id, this.occasional)))
      .subscribe(value => {
        this.stop = value;
        this.trams = value.routes.filter(route => route.type === TransportType.TRAM);
        this.trolleys = value.routes.filter(route => route.type === TransportType.TROLLEY);
        this.buses = value.routes.filter(route => route.type === TransportType.BUS);
      });
  }

  getClassFromTransportType(type: TransportType) {
    switch (type) {
      case TransportType.TROLLEY: return 'trolley';
      case TransportType.TRAM: return 'tram';
      case TransportType.BUS: return 'bus';
      default: return '';
    }
  }
}

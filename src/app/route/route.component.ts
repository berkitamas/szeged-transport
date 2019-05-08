import { Component, OnInit } from '@angular/core';
import {RouteService} from '../core/services/route.service';
import {Observable} from 'rxjs';
import {Route} from '../core/models/route';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  constructor(private routeService: RouteService, private route: ActivatedRoute) { }

  route$: Observable<Route>;

  ngOnInit() {
    this.route$ = this.route.params.pipe(switchMap(params => this.routeService.getRouteByID(+params.id)))
      .pipe(tap(console.log));
  }

}

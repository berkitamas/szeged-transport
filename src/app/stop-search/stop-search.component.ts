import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StopService} from '../core/services/stop.service';
import {StopSearch} from '../core/models/stop-search';
import {RouteService} from '../core/services/route.service';
import {Observable, combineLatest} from 'rxjs';
import {Route} from '../core/models/route';
import {FormControl, FormGroup} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {debounceTime, finalize, map, tap} from 'rxjs/operators';
import {RouteSearch} from '../core/models/route-search';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {TransportType} from '../core/models/transport-type';
import {Stop} from '../core/models/stop';

@Component({
  selector: 'app-stop-search',
  templateUrl: './stop-search.component.html',
  styleUrls: ['./stop-search.component.scss']
})
export class StopSearchComponent implements OnInit {

  searchResults$: Observable<Stop[]>;

  stopSearchForm = new FormGroup({
    stopName: new FormControl(''),
    routePickInput: new FormControl('')
  });

  filteredRoutes: Route[];
  selectedRoutes: Route[] = [];

  loadingRoute: boolean;

  separatorKeyCodes = [ENTER, COMMA];

  @ViewChild('routeInput') routeInput: ElementRef<HTMLInputElement>;

  constructor(private stopService: StopService, private routeService: RouteService) {
    this.loadingRoute = false;
    this.stopSearchForm.controls.routePickInput.valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.loadingRoute = true),
        switchMap(value => {
          if (value && value.length > 0) {
            return combineLatest(
              routeService.searchRoute(new RouteSearch({shortName: value})),
              routeService.searchRoute(new RouteSearch({longName: value}))
            )
              .pipe(map(([shorts, longs]) => shorts.concat(longs)),
                map(array => array.filter(route => !this.isRouteInList(route))),
                finalize(() => this.loadingRoute = false));
          } else {
            this.loadingRoute = false;
            return [];
          }
        })
      )
      .subscribe(routes => this.filteredRoutes = routes);
  }

  ngOnInit() {
  }

  submitSearch() {
    this.searchResults$ = this.stopService.searchStops(new StopSearch({
      routes: this.selectedRoutes,
      name: this.stopSearchForm.get('stopName').value.toString()
    }));
  }

  isRouteInList(route: Route): boolean {
    return (this.selectedRoutes.filter(value => value.id === route.id).length !== 0);
  }

  addRouteToList(route: Route) {
    if (!this.isRouteInList(route)) {
      this.selectedRoutes.push(route);
      this.routeInput.nativeElement.value = '';
    }
  }

  removeRouteFromList(route: Route) {
    this.selectedRoutes = this.selectedRoutes.filter(value => value.id !== route.id);
  }

  selectRoute(event: MatAutocompleteSelectedEvent) {
    this.addRouteToList(event.option.value);
    this.stopSearchForm.controls.routePickInput.setValue('');
  }

  getClassFromTransportType(type: TransportType) {
    switch (type) {
      case TransportType.TROLLEY:
        return 'trolley';
      case TransportType.TRAM:
        return 'tram';
      case TransportType.BUS:
        return 'bus';
      default:
        return '';
    }
  }
}

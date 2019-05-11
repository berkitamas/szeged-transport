import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RouteService} from '../core/services/route.service';
import {RouteSearch} from '../core/models/route-search';
import {TransportType} from '../core/models/transport-type';
import {Stop} from '../core/models/stop';
import {Observable} from 'rxjs';
import {Route} from '../core/models/route';
import {FormControl, FormGroup} from '@angular/forms';
import {StopService} from '../core/services/stop.service';
import {debounceTime, finalize, map, switchMap, tap} from 'rxjs/operators';
import {StopSearch} from '../core/models/stop-search';
import {MatAutocompleteSelectedEvent} from '@angular/material';

@Component({
  selector: 'app-route-search',
  templateUrl: './route-search.component.html',
  styleUrls: ['./route-search.component.scss']
})
export class RouteSearchComponent implements OnInit {

  searchResults$: Observable<Route[]>;

  routeSearchForm = new FormGroup({
    routeLongName: new FormControl(''),
    wheelchairAccessible: new FormControl(''),
    occasional: new FormControl(''),
    routeTypes: new FormControl(''),
    stopPickInput: new FormControl(''),
    fromTime: new FormControl(''),
    toTime: new FormControl(''),
  });

  filteredStops: Stop[];
  selectedStops: Stop[] = [];

  loadingStops: boolean;

  @ViewChild('stopInput') stopInput: ElementRef<HTMLInputElement>;

  transportTypes = [
    {name: 'Villamos', value: TransportType.TRAM},
    {name: 'Trolibusz', value: TransportType.TROLLEY},
    {name: 'Busz', value: TransportType.BUS},
  ];

  constructor(private routeService: RouteService, private stopService: StopService) {
    this.loadingStops = false;
    this.routeSearchForm.controls.stopPickInput.valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.loadingStops = true),
        switchMap( value => {
          if (value && value.length > 2) {
            return stopService.searchStops(new StopSearch({name: value}))
              .pipe(map(array => array.filter(stop => !this.isStopInList(stop))),
                finalize(() => this.loadingStops = false)
              );
          } else {
            this.loadingStops = false;
            return [];
          }
        })
      )
      .subscribe(stops => this.filteredStops = stops);
  }

  ngOnInit() {
  }

  searchRoutes() {
    this.searchResults$ = this.routeService.searchRoute(new RouteSearch({
      longName: this.routeSearchForm.get('routeLongName').value.toString(),
      types: this.routeSearchForm.get('routeTypes').value,
      stops: this.selectedStops,
      wheelchair: this.routeSearchForm.get('wheelchairAccessible').value,
      fromTime: (this.routeSearchForm.get('fromTime').value) ? this.routeSearchForm.get('fromTime').value.toDate() : null,
      toTime: (this.routeSearchForm.get('toTime').value) ? this.routeSearchForm.get('toTime').value.toDate() : null,
      occasional: this.routeSearchForm.get('occasional').value
    }));
  }

  isStopInList(stop: Stop): boolean {
    return (this.selectedStops.filter(value => value.id === stop.id).length !== 0);
  }

  addStopToList(stop: Stop) {
    if (!this.isStopInList(stop)) {
      this.selectedStops.push(stop);
      this.stopInput.nativeElement.value = '';
    }
  }

  removeStopFromList(stop: Stop) {
    this.selectedStops = this.selectedStops.filter(value => value.id !== stop.id);
  }

  selectStop(event: MatAutocompleteSelectedEvent) {
    this.addStopToList(event.option.value);
    this.routeSearchForm.controls.stopPickInput.setValue('');
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

import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';
import {Stop} from '../models/stop';
import {Route} from '../models/route';
import {TransportType} from '../models/transport-type';
import {Agency} from '../models/agency';
import {StopTime} from '../models/stop-time';
import {StopSearch} from '../models/stop-search';

@Injectable({
  providedIn: 'root'
})
export class StopService {
  private apiUrl = environment.apiUrl + '/stops/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getStopByID(id: number, occasional: boolean = false): Observable<Stop> {
    return this.http.get(this.apiUrl + id + (occasional ? '?occasional' : ''), this.httpOptions)
      .pipe(map((value: any) => {
        value.routes = value.routes.map(route => {
          let type: TransportType;
          switch (route.type) {
            case 'Villamos':
              type = TransportType.TRAM;
              break;
            case 'Busz':
              type = TransportType.BUS;
              break;
            case 'Trolibusz':
              type = TransportType.TROLLEY;
              break;
            default:
              type = TransportType.UNKNOWN;
              break;
          }
          return new Route({
            id: route.id,
            shortName: route.short_name,
            longName: route.long_name,
            type,
            description: route.desc,
            occasional: (+route.occasional === 1),
            agency: new Agency(route.agency)
          });
        });
        return new Stop(value);
      }));
  }

  searchStops(search: StopSearch): Observable<Stop[]> {
    let query = '';

    if (search.routes && search.routes.length > 0) {
      const routeString = search.routes.map(route => route.id).join(',');
      query = '?routes=' + routeString;
    }

    if (search.name !== '') {
      if (query === '') {
        query = '?';
      } else {
        query += '&';
      }
      query += 'name=' + search.name;
    }

    return this.http.get(this.apiUrl + 'search' + query, this.httpOptions)
      .pipe(map((array: any[]) => array.map(value => new Stop(value))));
  }

  getCurrentRoutesByStops(id: number): Observable<StopTime[]> {
    return timer(0, 30000)
      .pipe(concatMap(() => this.http.get(this.apiUrl + id + '/next-routes?time=' + Math.round(Date.now() / 1000))))
      .pipe(map((array: any[]) => array.map(route => {
        let type: TransportType;
        switch (route.type) {
          case 'Villamos':
            type = TransportType.TRAM;
            break;
          case 'Busz':
            type = TransportType.BUS;
            break;
          case 'Trolibusz':
            type = TransportType.TROLLEY;
            break;
          default:
            type = TransportType.UNKNOWN;
            break;
        }
        return new StopTime({
          route: new Route({
            id: route.id,
            shortName: route.short_name,
            longName: route.long_name,
            type,
            description: route.desc,
            occasional: (+route.occasional === 1),
            agency: new Agency(route.agency),
          }),
          arrivalTime: new Date(new Date().toISOString().slice(0, 11) + route.arrival_time + 'Z'),
          departureTime: new Date(new Date().toISOString().slice(0, 11) + route.departure_time + 'Z'),
          nextStop: (route.next_stop) ? new Stop(route.next_stop) : null,
          tripStart: new Stop(route.trip_start),
          tripEnd: new Stop(route.trip_end)
        });
      })));
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Route} from '../models/route';
import {Observable, timer} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';
import {TransportType} from '../models/transport-type';
import {Agency} from '../models/agency';
import {Stop} from '../models/stop';
import {StopTime} from '../models/stop-time';
import {RouteSearch} from '../models/route-search';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private apiUrl = environment.apiUrl + '/routes/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getRoutes( occasional: boolean): Observable<Route[]> {
    return this.http.get(this.apiUrl + (occasional ? '?occasional' : ''), this.httpOptions)
      .pipe(map((array: any[]) => array.map(value => {
        let type: TransportType;
        switch (value.type) {
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
          id: value.id,
          type,
          shortName: value.short_name,
          longName: value.long_name,
          occasional: value.occasional === 1
        });
      })));
  }

  searchRoute(routeSearch: RouteSearch): Observable<Route[]> {
    if (!routeSearch.toTime) {
      routeSearch.toTime = new Date();
    }

    let query = '?to-time=' + Math.floor((routeSearch.toTime).getTime() / 1000);

    if (routeSearch.shortName) {
      query += '&short-name=' + routeSearch.shortName;
    }
    if (routeSearch.longName) {
      query += '&long-name=' + routeSearch.longName;
    }
    if (routeSearch.wheelchair) {
      query += '&wheelchair';
    }
    if (routeSearch.occasional) {
      query += '&occasional';
    }
    if (routeSearch.fromTime) {
      query += '&from-time=' + Math.floor((routeSearch.fromTime).getTime() / 1000);
    }
    if (routeSearch.stops && routeSearch.stops.length > 0) {
      query += '&stops=' + routeSearch.stops.map(value => value.id).join(',');
    }
    if (routeSearch.types && routeSearch.types.length > 0) {
      const types = routeSearch.types.map(type => {
        switch (type) {
          case TransportType.BUS: return 'bus';
          case TransportType.TRAM: return 'tram';
          case TransportType.TROLLEY: return 'trolley';
          case TransportType.UNKNOWN: return 'unknown';
        }
      }).join(',');
      query += '&types=' + types;
    }

    return this.http.get(this.apiUrl + 'search' + query, this.httpOptions)
      .pipe(map((array: any[]) => array.map(value => {
        let type: TransportType;
        switch (value.type) {
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
          id: value.id,
          shortName: value.short_name,
          longName: value.long_name,
          type,
          description: value.desc,
          occasional: (+value.occasional === 1),
        });
      })));
  }

  getRouteByID(id: number): Observable<Route> {
    return this.http.get(this.apiUrl + id, this.httpOptions)
      .pipe(map((value: any) => {
        let type: TransportType;
        switch (value.type) {
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
          id: value.id,
          shortName: value.short_name,
          longName: value.long_name,
          type,
          description: value.desc,
          occasional: (+value.occasional === 1),
          agency: new Agency(value.agency),
          stopsFrom: value.stops_from.map(stop => new Stop({
            id: stop.id,
            name: stop.name,
            lat: stop.lat,
            lon: stop.lon,
            minOffset: stop.min_offset
          })),
          stopsTo: value.stops_to.map(stop => new Stop({
            id: stop.id,
            name: stop.name,
            lat: stop.lat,
            lon: stop.lon,
            minOffset: stop.min_offset
          }))
        });
      }));
  }

  getCurrentStopsByRoute(id: number): Observable<StopTime[]> {
    return timer(0, 30000)
      .pipe(concatMap(() => this.http.get(this.apiUrl + id + '/next-stops?time=' + Math.round(Date.now() / 1000))))
      .pipe(map((array: any[]) => array.map(stop => {
        return new StopTime({
          arrivalTime: new Date(new Date().toISOString().slice(0, 11) + stop.arrival_time + 'Z'),
          departureTime: new Date(new Date().toISOString().slice(0, 11) + stop.departure_time + 'Z'),
          currentStop: new Stop(stop.current_stop),
          nextStop: (stop.next_stop) ? new Stop(stop.next_stop) : null,
          tripStart: new Stop(stop.trip_start),
          tripEnd: new Stop(stop.trip_end)
        });
      })));
  }

}

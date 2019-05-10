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

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getRoutes( occasional: boolean): Observable<Route[]> {
    return this.http.get(this.apiUrl + '/routes' + (occasional ? '?occasional' : ''), this.httpOptions)
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

  getRouteByID(id: number): Observable<Route> {
    return this.http.get(this.apiUrl + '/routes/' + id, this.httpOptions)
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
          stops: value.stops.map(stop => new Stop(stop))
        });
      }));
  }

  getCurrentStopsByRoute(id: number): Observable<StopTime[]> {
    return timer(0, 30000)
      .pipe(concatMap(() => this.http.get(this.apiUrl + '/routes/' + id + '/next-stops?time=' + Math.round(Date.now() / 1000))))
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

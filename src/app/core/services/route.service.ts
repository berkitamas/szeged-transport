import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Route} from '../models/route';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TransportType} from '../models/transport-type';
import {Agency} from '../models/agency';

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

  getRoutes(): Observable<Route[]> {
    return this.http.get(this.apiUrl + '/routes', this.httpOptions)
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
          longName: value.long_name
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
          agency: new Agency(value.agency)
        });
      }));
  }

}

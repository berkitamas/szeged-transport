import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Agency} from '../models/agency';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAgencies(): Observable<Agency[]> {
    return this.http.get(this.apiUrl + '/agencies', this.httpOptions)
      .pipe(map((array: any[]) => array.map(value => new Agency(value))));
  }
}

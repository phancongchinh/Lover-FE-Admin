import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CITY_API_URL} from '../../api-urls';
import {City} from '../../model/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<City[]> {
    return this.httpClient.get<City[]>(CITY_API_URL);
  }

  findById(id: number): Observable<City> {
    return this.httpClient.get<City>(CITY_API_URL + `/${id}`);
  }

  addNew(city: City): Observable<City> {
    return this.httpClient.post<City>(CITY_API_URL, city);
  }

  edit(city: City, id: number): Observable<City> {
    return this.httpClient.put<City>(CITY_API_URL + `/${id}`, city);
  }

  deleteById(id: number): Observable<any> {
    return this.httpClient.delete<any>(CITY_API_URL + `/${id}`);
  }
}

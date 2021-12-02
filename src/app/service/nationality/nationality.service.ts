import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Nationality} from '../../model/Nationality';
import {NATIONALITY_API_URL} from '../../api-urls';

@Injectable({
  providedIn: 'root'
})
export class NationalityService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Nationality[]> {
    return this.httpClient.get<Nationality[]>(NATIONALITY_API_URL);
  }

  findById(id: number): Observable<Nationality> {
    return this.httpClient.get<Nationality>(NATIONALITY_API_URL + `/${id}`);
  }

  addNew(nationality: Nationality): Observable<Nationality> {
    return this.httpClient.post<Nationality>(NATIONALITY_API_URL, nationality);
  }

  edit(nationality: Nationality, id: number): Observable<Nationality> {
    return this.httpClient.put<Nationality>(NATIONALITY_API_URL + `/${id}`, nationality);
  }

  deleteById(id: number): Observable<any> {
    return this.httpClient.delete<any>(NATIONALITY_API_URL + `/${id}`);
  }
}

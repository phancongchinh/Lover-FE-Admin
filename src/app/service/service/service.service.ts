import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SERVICE_API_URL} from '../../api-urls';
import {HttpClient} from '@angular/common/http';
import {Service} from '../../model/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(SERVICE_API_URL);
  }

  findById(id: number): Observable<Service> {
    return this.httpClient.get<Service>(SERVICE_API_URL + `/${id}`);
  }

  addNew(service: Service): Observable<Service> {
    return this.httpClient.post<Service>(SERVICE_API_URL, service);
  }

  edit(service: Service, id: number): Observable<Service> {
    return this.httpClient.put<Service>(SERVICE_API_URL + `/${id}`, service);
  }

  deleteById(id: number): Observable<any> {
    return this.httpClient.delete<any>(SERVICE_API_URL + `/${id}`);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMAGE_API_URL} from '../../api-urls';
import {Image} from '../../model/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  findImagesByUserId(id: any): Observable<Image[]> {
    return this.httpClient.get<Image[]>(`${IMAGE_API_URL}/users/${id}`);
  }
}

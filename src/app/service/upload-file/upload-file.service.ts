import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMAGE_API_URL} from '../../api-urls';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private httpClient: HttpClient) {
  }

  upload(images: any): Observable<any> {
    return this.httpClient.post(`${IMAGE_API_URL}/many`, images);
  }
}

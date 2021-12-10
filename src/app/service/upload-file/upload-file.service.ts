import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private httpClient: HttpClient) {
  }

  // upload(files: File[]): Observable<HttpEvent<any>> {
  //   const formData = new FormData();
  //   for (const file of files) {
  //     formData.append('file', file);
  //   }
  //   const request = new HttpRequest('POST', , formData, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   });
  //
  //   return this.httpClient.request(request);
  //
  // }
}

import {Injectable} from '@angular/core';

declare var SweetAlert: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  Toast = SweetAlert.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  constructor() {
  }

  notify(icon: string, title: string) {
    this.Toast.fire({
      icon: icon,
      title: title
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {UploadFileService} from '../../../service/upload-file/upload-file.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {Image} from '../../../model/image';
import {ImageService} from '../../../service/image/image.service';
import {AuthenticationService} from '../../../service/authentication.service';
import {UserToken} from '../../../model/user-token';
import {API_URL} from '../../../api-urls';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.css']
})
export class UserImageComponent implements OnInit {

  apiUrl = API_URL;

  formData = new FormData();

  images: Image[] = [];

  userToken: UserToken = {};

  constructor(private uploadFileService: UploadFileService,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private imageService: ImageService) { }

  ngOnInit() {
    this.findImagesByUserId();
  }

  saveImage() {
    this.uploadFileService.upload(this.formData).subscribe(data => {
      this.notificationService.notify('success', 'File download successful')
    }, error => this.notificationService.notify('error', 'Error'));
  }

  onFileImage(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.formData.append('name', event.target.files[i]);
      }
    } else {
      this.formData.append('images', null);
    }
  }

  findImagesByUserId() {
    this.userToken = this.authenticationService.currentUserValue;
    this.imageService.findImagesByUserId(this.userToken.id).subscribe(data => {
      this.images = data;
    }, error => console.log(error.message));
  }
}

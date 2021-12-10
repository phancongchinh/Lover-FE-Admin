import {Component, OnInit} from '@angular/core';
import {UploadFileService} from '../../../service/upload-file/upload-file.service';
import {NotificationService} from '../../../service/notification/notification.service';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.css']
})
export class UserImageComponent implements OnInit {

  formData = new FormData();

  constructor(private uploadFileService: UploadFileService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  saveImage() {
    this.uploadFileService.upload(this.formData).subscribe(data => {
      this.notificationService.notify('success', 'File download successful');
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
}

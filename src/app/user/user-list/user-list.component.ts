import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../service/user/user.service';
import {NotificationService} from '../../service/notification/notification.service';

declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  currentUserId: number;

  constructor(private userService: UserService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  private getAllUsers() {
    this.userService.findAll().subscribe((data) => {
      this.users = data;
    }, (error) => {
      console.log(error.name);
    });
  }

  getCurrentUserId(id) {
    this.currentUserId = id;
  }

  deleteUserById(id: number) {
    this.userService.deleteById(id).subscribe((data) => {
      $('#modal-delete').modal('toggle');
      this.notificationService.notify('success', 'User deleted successfully!');
      this.getAllUsers();
    }, (error) => {
      this.notificationService.notify('error', 'User deleted failed!');
      console.log(error);
    });
  }
}

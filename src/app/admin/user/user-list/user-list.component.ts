import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from '../../../service/user/user.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {ACTIVE, BLOCKED, DEACTIVATED, PENDING, USER} from '../../../model/constants';

declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  currentUserId: number;

  currentUser: any;

  USER = USER;
  PENDING = PENDING;
  ACTIVE = ACTIVE;
  DEACTIVATED = DEACTIVATED;
  BLOCKED = BLOCKED;

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

  blockUser(id: number) {
    this.userService.findById(id).subscribe((user) => {
      user.status = BLOCKED;
      console.log(user);
      this.userService.edit(user, id).subscribe(() => {
        $('#modal-block').modal('toggle');
        this.notificationService.notify('success', 'User blocked successfully!');
        this.getAllUsers();
      }, (error) => {
        this.notificationService.notify('error', 'User blocked failed!');
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  unblockUser(id: number) {
    this.userService.findById(id).subscribe((user) => {
      user.status = ACTIVE;
      this.userService.edit(user, id).subscribe(() => {
        $('#modal-unblock').modal('toggle');
        this.notificationService.notify('success', 'User unblocked successfully!');
        this.getAllUsers();
      }, (error) => {
        this.notificationService.notify('error', 'User unblocked failed!');
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  approveUser(id: number) {
    this.userService.findById(id).subscribe((user) => {
      user.status = ACTIVE;
      this.userService.edit(user, id).subscribe(() => {
        $('#modal-approve').modal('toggle');
        this.notificationService.notify('success', 'User approved successfully!');
        this.getAllUsers();
      }, (error) => {
        this.notificationService.notify('error', 'User approved failed!');
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }
}

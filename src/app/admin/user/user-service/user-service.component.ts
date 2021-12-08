import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../../service/service/service.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {Service} from '../../../model/service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../service/authentication.service';
import {UserToken} from '../../../model/user-token';
import {UserServiceService} from '../../../service/user-service/user-service.service';
import {UserService} from '../../../model/user-service';

@Component({
  selector: 'app-user-service',
  templateUrl: './user-service.component.html',
  styleUrls: ['./user-service.component.css']
})
export class UserServiceComponent implements OnInit {

  currentUser: UserToken = {};

  allServices: Service[] = [];

  currentUserServices: UserService[] = [];

  userServiceFormGroup: FormGroup;

  selectedUserServices: UserService[] = [];

  constructor(private fb: FormBuilder,
              private serviceService: ServiceService,
              private userServiceService: UserServiceService,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
    this.currentUser = authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.getAllServices();
    this.getCurrentUserServices();

    this.userServiceFormGroup = this.fb.group({
      services: this.fb.array([
        ['', Validators.required]
      ]),
      prices: this.fb.array([
        ['', Validators.required]
      ])
    });
  }

  private getAllServices() {
    this.serviceService.findAll().subscribe((data) => {
      this.allServices = data;
    }, (error) => {
      console.log(error);
    });
  }

  get services(): FormArray {
    return this.userServiceFormGroup.get('services') as FormArray;
  }

  addService() {
    this.services.push(this.fb.control(''));
    this.addPrice();
  }

  removeService(index: number) {
    this.services.removeAt(index);
    this.removePrice(index);
  }

  get prices(): FormArray {
    return this.userServiceFormGroup.get('prices') as FormArray;
  }

  addPrice() {
    this.prices.push(this.fb.control(''));
  }

  removePrice(index: number) {
    this.prices.removeAt(index);
  }

  onSubmit() {
    const userServiceForm = this.userServiceFormGroup.value;

    console.log(userServiceForm.services);
    console.log(userServiceForm.prices);

    for (let i = 0; i < userServiceForm.services.length; i++) {
      const userService = {
        user: {
          id: this.currentUser.id,
        },
        service: {
          id: userServiceForm.services[i],
        },
        price: userServiceForm.prices[i]
      };
      this.selectedUserServices.push(userService);
    }

    this.userServiceService.addManyNew(this.selectedUserServices).subscribe(() => {
      this.notificationService.notify('success', 'Update successfully!');
    }, (error) => {
      this.notificationService.notify('error', 'Update failed!');
      console.log(error);
    });
  }

  private getCurrentUserServices() {
    this.userServiceService.findBySeller(this.currentUser.id).subscribe((data) => {
      this.currentUserServices = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {City} from '../../../model/city';
import {Nationality} from '../../../model/nationality';
import {User} from '../../../model/user';
import {UserService} from '../../../service/user/user.service';
import {ServiceService} from '../../../service/service/service.service';
import {CityService} from '../../../service/city/city.service';
import {NationalityService} from '../../../service/nationality/nationality.service';
import {NotificationService} from '../../../service/notification/notification.service';

declare var $: any;

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  allCities: City[] = [];

  allNationalities: Nationality[] = [];

  allYears: number[] = [];

  currentUser: User = {};

  currentUserId: number;

  userEditForm: FormGroup = new FormGroup({
    id: new FormControl('1'),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    yearOfBirth: new FormControl(''),
    city: new FormControl(''),
    nationality: new FormControl(''),
    facebookUrl: new FormControl(''),
    joinedAt: new FormControl(''),
    lastLoginAt: new FormControl(''),
    description: new FormControl(''),
    weight: new FormControl(''),
    height: new FormControl(''),
    bust: new FormControl(''),
    waist: new FormControl(''),
    hips: new FormControl(''),
    viewCounter: new FormControl(''),
    rentedCounter: new FormControl(''),
    status: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private userService: UserService,
              private serviceService: ServiceService,
              private cityService: CityService,
              private nationalityService: NationalityService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAllCities();
    this.getAllNationalities();
    this.getAllYears();

    $(document).ready(() => {
      $('#userEditForm').validate({
        rules: {
          firstName: {required: true},
          lastName: {required: true},
        },
        messages: {
          firstName: {
            required: 'Enter first name'
          },
          lastName: {
            required: 'Enter last name'
          },
        },
        errorElement: 'span',
        errorPlacement: (error, element) => {
          error.addClass('invalid-feedback');
          element.closest('.form-group').append(error);
        },
        highlight: (element, errorClass, validClass) => {
          $(element).addClass('is-invalid');
        },
        unhighlight: (element, errorClass, validClass) => {
          $(element).removeClass('is-invalid');
        }
      });
    });


    this.activatedRoute.paramMap.subscribe(async (paramMap: ParamMap) => {
      this.currentUserId = +paramMap.get('id');
      this.currentUser = await this.getCurrentUser(this.currentUserId);
    });
  }

  submitUserEditForm(userEditForm: any) {
    const user: User = {
      id: this.currentUser.id,
      firstName: this.userEditForm.value.firstName === '' ? this.currentUser.firstName : this.userEditForm.value.firstName,
      lastName: this.userEditForm.value.lastName === '' ? this.currentUser.lastName : this.userEditForm.value.fullName,
      gender: this.userEditForm.value.gender === '' ? this.currentUser.gender : this.userEditForm.value.gender,
      email: this.userEditForm.value.email === '' ? this.currentUser.email : this.userEditForm.value.email,
      phone: this.userEditForm.value.phone === '' ? this.currentUser.phone : this.userEditForm.value.phone,
      yearOfBirth: this.userEditForm.value.yearOfBirth === '' ? this.currentUser.yearOfBirth : this.userEditForm.value.yearOfBirth,
      city: this.userEditForm.value.city === '' ? this.currentUser.city : this.userEditForm.value.city,
      nationality: this.userEditForm.value.nationality === '' ? this.currentUser.nationality : this.userEditForm.value.nationality,
      facebookUrl: this.userEditForm.value.facebookUrl === '' ? this.currentUser.facebookUrl : this.userEditForm.value.facebookUrl,
      joinedAt: this.currentUser.joinedAt,
      lastLoginAt: this.currentUser.lastLoginAt,
      description: this.userEditForm.value.description === '' ? this.currentUser.description : this.userEditForm.value.description,
      weight: this.userEditForm.value.weight === '' ? this.currentUser.weight : this.userEditForm.value.weight,
      height: this.userEditForm.value.height === '' ? this.currentUser.height : this.userEditForm.value.height,
      bust: this.userEditForm.value.bust === '' ? this.currentUser.bust : this.userEditForm.value.bust,
      waist: this.userEditForm.value.waist === '' ? this.currentUser.waist : this.userEditForm.value.waist,
      hips: this.userEditForm.value.hips === '' ? this.currentUser.hips : this.userEditForm.value.hips,
      viewCounter: this.currentUser.viewCounter,
      rentedCounter: this.currentUser.rentedCounter,
      status: this.currentUser.status,
      username: this.currentUser.username,
      password: this.currentUser.password,
    };

    this.userService.edit(user, 1).subscribe((data) => {
      this.notificationService.notify('success', 'User updated successfully!');
    }, (error) => {
      this.notificationService.notify('error', 'User updated failed!');
      console.log(error);
    });
  }

  private getAllYears() {
    for (let i = 1950; i < new Date().getFullYear() - 18; i++) {
      this.allYears.push(i);
    }
  }

  private getAllCities() {
    this.cityService.findAll().subscribe((data) => {
      this.allCities = data;
    }, (error) => {
      console.log(error);
    });
  }

  private getAllNationalities() {
    this.nationalityService.findAll().subscribe((data) => {
      this.allNationalities = data;
    }, (error) => {
      console.log(error);
    });
  }

  private getCurrentUser(id) {
    return this.userService.findById(id).toPromise();
  }

  private switchActivationStatus(): void {
  }
}

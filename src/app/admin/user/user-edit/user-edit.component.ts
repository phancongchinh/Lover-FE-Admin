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
import {AuthenticationService} from '../../../service/authentication.service';
import {UserToken} from '../../../model/user-token';
import {API_URL} from '../../../api-urls';

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

  currentUserToken: UserToken;

  apiUrl = API_URL;

  userForm: FormGroup = new FormGroup({
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
              private authenticationService: AuthenticationService,
              private nationalityService: NationalityService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute) {
    this.currentUserToken = authenticationService.currentUserValue;
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
          gender: {required: true},
          email: {required: true},
          phone: {required: true},
          yearOfBirth: {required: true},
          city: {required: true},
          nationality: {required: true},
          weight: {required: true},
          height: {required: true},
          bust: {required: true},
          waist: {required: true},
          hips: {required: true},
        },
        messages: {
          firstName: {
            required: 'First name must not be empty!'
          },
          lastName: {
            required: 'Last name must not be empty!'
          },
          gender: {
            required: 'Gender has not been selected!'
          },
          email: {
            required: 'Email must not be empty!'
          },
          phone: {
            required: 'Phone must not be empty!'
          },
          yearOfBirth: {
            required: 'Year of birth has not been selected!!'
          },
          city: {
            required: 'City has not been selected!'
          },
          nationality: {
            required: 'Nationality has not been selected!'
          },
          weight: {
            required: 'Weight must not be empty!'
          },
          height: {
            required: 'Height must not be empty!'
          },
          bust: {
            required: 'Bust must not be empty!'
          },
          waist: {
            required: 'Waist must not be empty!'
          },
          hips: {
            required: 'Hips must not be empty!'
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
      this.currentUser.id = +paramMap.get('id');
      this.currentUser = await this.getCurrentUser(this.currentUser.id);
    });
  }

  submitUserEditForm(userEditForm: any) {
    const user: User = {
      id: this.currentUser.id,
      firstName: this.userForm.value.firstName === '' ? this.currentUser.firstName : this.userForm.value.firstName,
      lastName: this.userForm.value.lastName === '' ? this.currentUser.lastName : this.userForm.value.fullName,
      gender: this.userForm.value.gender === '' ? this.currentUser.gender : this.userForm.value.gender,
      email: this.userForm.value.email === '' ? this.currentUser.email : this.userForm.value.email,
      phone: this.userForm.value.phone === '' ? this.currentUser.phone : this.userForm.value.phone,
      yearOfBirth: this.userForm.value.yearOfBirth === '' ? this.currentUser.yearOfBirth : this.userForm.value.yearOfBirth,
      city: this.userForm.value.city === '' ? this.currentUser.city : this.userForm.value.city,
      nationality: this.userForm.value.nationality === '' ? this.currentUser.nationality : this.userForm.value.nationality,
      facebookUrl: this.userForm.value.facebookUrl === '' ? this.currentUser.facebookUrl : this.userForm.value.facebookUrl,
      joinedAt: this.currentUser.joinedAt,
      lastLoginAt: this.currentUser.lastLoginAt,
      description: this.userForm.value.description === '' ? this.currentUser.description : this.userForm.value.description,
      weight: this.userForm.value.weight === '' ? this.currentUser.weight : this.userForm.value.weight,
      height: this.userForm.value.height === '' ? this.currentUser.height : this.userForm.value.height,
      bust: this.userForm.value.bust === '' ? this.currentUser.bust : this.userForm.value.bust,
      waist: this.userForm.value.waist === '' ? this.currentUser.waist : this.userForm.value.waist,
      hips: this.userForm.value.hips === '' ? this.currentUser.hips : this.userForm.value.hips,
      viewCounter: this.currentUser.viewCounter,
      rentedCounter: this.currentUser.rentedCounter,
      status: this.currentUser.status,
      username: this.currentUser.username,
      password: this.currentUser.password,
    };

    this.userService.edit(user, this.currentUser.id).subscribe((data) => {
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

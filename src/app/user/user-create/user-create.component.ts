import {Component, OnInit} from '@angular/core';
import {City} from '../../model/city';
import {Nationality} from '../../model/nationality';
import {CityService} from '../../service/city/city.service';
import {NationalityService} from '../../service/nationality/nationality.service';
import {NotificationService} from '../../service/notification/notification.service';
import {User} from '../../model/user';
import {UserService} from '../../service/user/user.service';
import {Router} from '@angular/router';
import {Service} from '../../model/service';
import {ServiceService} from '../../service/service/service.service';

declare var $: any;

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  cities: City[] = [];

  nationalities: Nationality[] = [];

  years: number[] = [];

  // tslint:disable-next-line:ban-types
  selectedRoles: String[] = [];

  allServices: Service[] = [];

  services: Service[] = [];

  constructor(private userService: UserService,
              private serviceService: ServiceService,
              private cityService: CityService,
              private nationalityService: NationalityService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAllCities();
    this.getAllNationalities();
    this.getAllServices();
    for (let i = 1950; i < new Date().getFullYear() - 18; i++) {
      this.years.push(i);
    }

    $(() => {
      $('.select2').select2();

      $('.select2bs4').select2({
        theme: 'bootstrap4'
      });

      $.validator.setDefaults({
        submitHandler: () => {
          alert('Form successful submitted!');
        }
      });

      $('#userCreateForm').validate({
        rules: {
          firstName: {
            required: true,
          },
          lastName: {
            required: true,
          },
          gender: {
            required: true,
          },
          yearOfBirth: {
            required: true,
          },
          email: {
            required: true,
            email: true,
          },
          phone: {
            required: true,
            minlength: 10,
          },
          username: {
            required: true,
            minlength: 8
          },
          password: {
            required: true,
            minlength: 5
          },
          roles: {
            required: true,
          },
          city: {
            required: true,
          },
          nationality: {
            required: true,
          },
          terms: {
            required: true
          },
        },
        // messages: {},
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
  }

  private getAllCities() {
    this.cityService.findAll().subscribe((data) => {
      this.cities = data;
    }, (error) => {
      console.log(error);
    });
  }

  private getAllNationalities() {
    this.nationalityService.findAll().subscribe((data) => {
      this.nationalities = data;
    }, (error) => {
      console.log(error);
    });
  }

  private getAllServices() {
    this.serviceService.findAll().subscribe((data) => {
      this.allServices = data;
    }, (error) => {
      console.log(error);
    });
  }

  submitUserCreateForm(userCreateForm: any) {
    const newUser: User = userCreateForm.value;
    newUser.city = {
      id: newUser.city,
    };
    newUser.nationality = {
      id: newUser.nationality,
    };

    newUser.roles = $('#roles').val();
    newUser.services = $('#services').val();

    this.userService.addNew(newUser).subscribe((data) => {
      this.notificationService.notify('success', 'User created successfully!');
      this.router.navigateByUrl('admin/users').then();
    }, (error) => {
      this.notificationService.notify('error', 'User created failed!');
      console.log(error);
    });
  }
}

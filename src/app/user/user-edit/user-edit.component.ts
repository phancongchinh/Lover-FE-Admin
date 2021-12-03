import {Component, OnInit} from '@angular/core';
import {City} from '../../model/city';
import {Nationality} from '../../model/nationality';
import {Service} from '../../model/service';
import {UserService} from '../../service/user/user.service';
import {ServiceService} from '../../service/service/service.service';
import {CityService} from '../../service/city/city.service';
import {NationalityService} from '../../service/nationality/nationality.service';
import {NotificationService} from '../../service/notification/notification.service';
import {User} from '../../model/user';

declare var $: any;
declare var bsCustomFileInput: any;

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  allCities: City[] = [];

  allNationalities: Nationality[] = [];

  allYears: number[] = [];

  allServices: Service[] = [];

  selectedServices: Service[] = [];

  currentSelectedServiceId: number;

  constructor(private userService: UserService,
              private serviceService: ServiceService,
              private cityService: CityService,
              private nationalityService: NationalityService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.getAllCities();
    this.getAllNationalities();
    this.getAllServices();
    this.getAllYears();

    $(() => {
      $('.select2').select2();

      $('.select2bs4').select2({
        theme: 'bootstrap4'
      });

      $('input[data-bootstrap-switch]').each(function() {
        $(this).bootstrapSwitch('state', $(this).prop('checked'));
      });

      bsCustomFileInput.init();

      $.validator.setDefaults({
        submitHandler: () => {
          alert('Form successful submitted!');
        }
      });

      $(() => {
        $(document).on('click', '[data-toggle="lightbox"]', (event) => {
          event.preventDefault();
          $(this).ekkoLightbox({
            alwaysShowClose: true
          });
        });
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
          roles: {
            required: true,
          },
          city: {
            required: true,
          },
          nationality: {
            required: true,
          },
          weight: {
            required: true,
          },
          height: {
            required: true,
          },
          bust: {
            required: true,
          },
          waist: {
            required: true,
          },
          hips: {
            required: true,
          },
        },
        // messages: {
        //   weight: {
        //     required: 'Required',
        //   },
        // },
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

  submitUserEditForm(userEditForm: any) {
    const newUser: User = userEditForm.value;
    newUser.city = {
      id: newUser.city,
    };
    newUser.nationality = {
      id: newUser.nationality,
    };

    newUser.roles = $('#roles').val();
    newUser.services = $('#services').val();

    this.userService.addNew(newUser).subscribe((data) => {
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

  private getAllServices() {
    this.serviceService.findAll().subscribe((data) => {
      this.allServices = data;
    }, (error) => {
      console.log(error);
    });
  }
}

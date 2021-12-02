import {Component, OnInit} from '@angular/core';
import {City} from '../../model/city';
import {Nationality} from '../../model/nationality';
import {CityService} from '../../service/city/city.service';
import {NationalityService} from '../../service/nationality/nationality.service';
import {NotificationService} from '../../service/notification/notification.service';
import {User} from '../../model/user';
import {UserService} from '../../service/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  cities: City[] = [];

  nationalities: Nationality[] = [];

  constructor(private userService: UserService,
              private cityService: CityService,
              private nationalityService: NationalityService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAllCities();
    this.getAllNationalities();

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation');
      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach((form) => {
          form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
    })();
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

  addNew(user: User) {
    this.userService.addNew(user).subscribe((data) => {
      this.notificationService.notify('success', 'User created successfully!');
      this.router.navigateByUrl('admin/users').then();
    }, (error) => {
      this.notificationService.notify('error', 'User created failed!');
      console.log(error);
    });
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReservationViewComponent } from './user-reservation-view.component';

describe('UserReservationViewComponent', () => {
  let component: UserReservationViewComponent;
  let fixture: ComponentFixture<UserReservationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReservationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReservationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPaymentInfoComponent } from './set-payment-info.component';

describe('SetPaymentInfoComponent', () => {
  let component: SetPaymentInfoComponent;
  let fixture: ComponentFixture<SetPaymentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPaymentInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetPaymentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

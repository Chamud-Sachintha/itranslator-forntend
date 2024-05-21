import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgOrderRequestComponent } from './lg-order-request.component';

describe('LgOrderRequestComponent', () => {
  let component: LgOrderRequestComponent;
  let fixture: ComponentFixture<LgOrderRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LgOrderRequestComponent]
    });
    fixture = TestBed.createComponent(LgOrderRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

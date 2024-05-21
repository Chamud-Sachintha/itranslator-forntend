import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgOrderProcessComponent } from './lg-order-process.component';

describe('LgOrderProcessComponent', () => {
  let component: LgOrderProcessComponent;
  let fixture: ComponentFixture<LgOrderProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LgOrderProcessComponent]
    });
    fixture = TestBed.createComponent(LgOrderProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

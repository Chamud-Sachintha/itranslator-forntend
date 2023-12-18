import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateOrderRequestsComponent } from './translate-order-requests.component';

describe('TranslateOrderRequestsComponent', () => {
  let component: TranslateOrderRequestsComponent;
  let fixture: ComponentFixture<TranslateOrderRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslateOrderRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslateOrderRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

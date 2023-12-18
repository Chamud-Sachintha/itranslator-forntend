import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaryOrderRequestsComponent } from './notary-order-requests.component';

describe('NotaryOrderRequestsComponent', () => {
  let component: NotaryOrderRequestsComponent;
  let fixture: ComponentFixture<NotaryOrderRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaryOrderRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaryOrderRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsServiceRequestsComponent } from './cs-service-requests.component';

describe('CsServiceRequestsComponent', () => {
  let component: CsServiceRequestsComponent;
  let fixture: ComponentFixture<CsServiceRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsServiceRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsServiceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

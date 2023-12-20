import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaryOrderProcessComponent } from './notary-order-process.component';

describe('NotaryOrderProcessComponent', () => {
  let component: NotaryOrderProcessComponent;
  let fixture: ComponentFixture<NotaryOrderProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaryOrderProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaryOrderProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

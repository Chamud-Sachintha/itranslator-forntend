import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsOrderProcessComponent } from './cs-order-process.component';

describe('CsOrderProcessComponent', () => {
  let component: CsOrderProcessComponent;
  let fixture: ComponentFixture<CsOrderProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsOrderProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsOrderProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

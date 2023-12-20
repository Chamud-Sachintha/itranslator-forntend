import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateOrderProcessComponent } from './translate-order-process.component';

describe('TranslateOrderProcessComponent', () => {
  let component: TranslateOrderProcessComponent;
  let fixture: ComponentFixture<TranslateOrderProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslateOrderProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslateOrderProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

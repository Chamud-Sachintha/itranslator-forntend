import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteLgOrdersComponent } from './complete-lg-orders.component';

describe('CompleteLgOrdersComponent', () => {
  let component: CompleteLgOrdersComponent;
  let fixture: ComponentFixture<CompleteLgOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteLgOrdersComponent]
    });
    fixture = TestBed.createComponent(CompleteLgOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

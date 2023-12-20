import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateTaskComponent } from './translate-task.component';

describe('TranslateTaskComponent', () => {
  let component: TranslateTaskComponent;
  let fixture: ComponentFixture<TranslateTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslateTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

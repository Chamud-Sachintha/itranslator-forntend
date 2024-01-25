import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsTaskComponent } from './cs-task.component';

describe('CsTaskComponent', () => {
  let component: CsTaskComponent;
  let fixture: ComponentFixture<CsTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

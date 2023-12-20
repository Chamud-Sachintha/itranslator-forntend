import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaryTaskComponent } from './notary-task.component';

describe('NotaryTaskComponent', () => {
  let component: NotaryTaskComponent;
  let fixture: ComponentFixture<NotaryTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaryTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaryTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

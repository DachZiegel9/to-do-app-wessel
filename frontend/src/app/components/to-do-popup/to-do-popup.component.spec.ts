import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoPopupComponent } from './to-do-popup.component';

describe('ToDoPopupComponent', () => {
  let component: ToDoPopupComponent;
  let fixture: ComponentFixture<ToDoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

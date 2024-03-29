import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeltDialogeComponent } from './admin-delt-dialoge.component';

describe('AdminDeltDialogeComponent', () => {
  let component: AdminDeltDialogeComponent;
  let fixture: ComponentFixture<AdminDeltDialogeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDeltDialogeComponent]
    });
    fixture = TestBed.createComponent(AdminDeltDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

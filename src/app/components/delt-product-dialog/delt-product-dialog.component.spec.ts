import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeltProductDialogComponent } from './delt-product-dialog.component';

describe('DeltProductDialogComponent', () => {
  let component: DeltProductDialogComponent;
  let fixture: ComponentFixture<DeltProductDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeltProductDialogComponent]
    });
    fixture = TestBed.createComponent(DeltProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

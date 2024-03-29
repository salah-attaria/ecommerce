import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDialogeComponent } from './order-dialoge.component';

describe('OrderDialogeComponent', () => {
  let component: OrderDialogeComponent;
  let fixture: ComponentFixture<OrderDialogeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDialogeComponent]
    });
    fixture = TestBed.createComponent(OrderDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

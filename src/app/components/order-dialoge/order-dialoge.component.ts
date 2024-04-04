import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-dialoge',
  templateUrl: './order-dialoge.component.html',
  styleUrls: ['./order-dialoge.component.css'],
})
export class OrderDialogeComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {}
}


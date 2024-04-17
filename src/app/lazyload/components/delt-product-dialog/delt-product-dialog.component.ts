import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-delt-product-dialog',
  templateUrl: './delt-product-dialog.component.html',
  styleUrls: ['./delt-product-dialog.component.css']
})
export class DeltProductDialogComponent {

  userName!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private connect:ConnectionService) {}
  ngOnInit(){
    this.connect.getDataById(this.data).subscribe((resp:any)=>{
      this.userName = resp.name
  })
}}
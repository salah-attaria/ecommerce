import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-admin-delt-dialoge',
  templateUrl: './admin-delt-dialoge.component.html',
  styleUrls: ['./admin-delt-dialoge.component.css']
})
export class AdminDeltDialogeComponent {
  userName!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private connect:ConnectionService) {}
  ngOnInit(){
    this.connect.getUserById(this.data).subscribe((resp:any)=>{
      this.userName = resp.firstName + ' ' + resp.lastName
    })
  }
}

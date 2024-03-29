import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
import { toArray } from 'rxjs';
import { ConnectionService } from 'src/app/services/connection.service';
import { AdminDeltDialogeComponent } from '../admin-delt-dialoge/admin-delt-dialoge.component';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css'],
})
export class GetUsersComponent implements OnInit {
  displayedColumns: string[] = [
    'no.',
    'id',
    'name',
    'email',
    'role',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;
  data: any;
  constructor(private connect: ConnectionService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.connect.getUsers().subscribe((resp: any) => {
      console.log(resp);
      this.data = resp.map((item: any) => {
        return {
          id: item._id,
          name: item.firstName + ' ' + item.lastName,
          email: item.email,
          role: item.role,
        };
      });
      console.log(this.data);
      this.dataSource = new MatTableDataSource(this.data);
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  deleteUser(id: any) {
    debugger;

    const userId = id;
    const dialogRef = this.dialog.open(AdminDeltDialogeComponent, {
      height: '300px',
      width: '500px',
      data:userId
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp == 'ok') {
        this.connect.delUserById(userId).subscribe((resp: any) => {
          console.log(resp);
        });
      } else {
        (error: any) => {
          console.error(error);
          // Handle error if needed
        };
      }
    });

    // console.log(id)
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}

import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConnectionService } from 'src/app/services/connection.service';
import { AdminDeltDialogeComponent } from '../admin-delt-dialoge/admin-delt-dialoge.component';
import { DeltProductDialogComponent } from '../delt-product-dialog/delt-product-dialog.component';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent {
  displayedColumns: string[] = [
    'no.',
    'image',
    'name',
    'description',
    'price',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;
  data: any;
  constructor(
    private connect: ConnectionService,
    public dialog: MatDialog,
    private snack: SnackbarService
  ) {}
  ngOnInit(): void {
    this.connect.getData().subscribe((resp: any) => {
      console.log(resp);
      this.data = resp.map((item: any) => {
        return {
          id:item._id,
          image: item.image,
          name: item.name,
          description: item.description,
          price: item.price,
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
  deleteProduct(id: any) {
    debugger;

    const productId = id;
    const dialogRef = this.dialog.open(DeltProductDialogComponent, {
      height: '300px',
      width: '500px',
      data: productId,
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp == 'ok') {
        this.connect.deltProductById(productId).subscribe((resp: any) => {
          console.log(resp);
          this.snack.openSnackBar('Producted has  been deleted', 'Success');
          this.dataSource;
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

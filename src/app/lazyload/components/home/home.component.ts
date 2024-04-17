import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data: any;
  imageData: any;
  constructor(private connect: ConnectionService) {
  }
  ngOnInit(): void {
    this.getProducts()
  //       this.products = data.map(product => ({
  //         ...product,
  //         imageUrl: `http://your-node-server-url/uploads/${product.image}`
  //       }));
  //     });
  // }
}
  getProducts() {
    const result = this.connect.getData().subscribe((resp: any) => {
      this.data = resp
      // .map((product:any) =>({
      //   ...product,
      //   imageUrl: `/nodeBackend/uploads/${product.image}`

      // }));
      console.log(resp);
    });
  }
  getImageUrl(imagePath: string): string {
    return `/nodeBackend/uploads/download (1).jfif_1711538231140`;
  }
}



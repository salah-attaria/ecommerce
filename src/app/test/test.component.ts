import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service';
import { toArray } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent  {
// [x: string]: FileList;
  fileToUpload: File | null = null;

  constructor(private http: HttpClient) { }

  // handleFileInput(files: FileList | null) {
  //   if(files){
  //     this.fileToUpload = files.item[0];

  //   }
  // }
  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    // Now you can safely access the files property
    if (files) {
      // Files are not null, proceed with handling them
      // Your file handling logic here
      this.fileToUpload = files.item(0);
      console.log(this.fileToUpload)

    } else {
      // Files are null, handle this scenario gracefully
      console.error("No files selected");
    }
  }

  uploadFile() {
    if (this.fileToUpload) {
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload);
      console.log(formData)

      // Now you can proceed with your logic using formData
      this.http.post('http://localhost:4800/upload', formData)
      .subscribe(
        (response) => {
          console.log('File uploaded successfully', response);
        },
        (error) => {
          console.error('Error uploading file', error);
        }
      );
  } else {
      console.error('No file selected.');
  }

   
  }
}
  // ngOnInit(): void {
  //   this.connect.getData().subscribe((resp:any)=>{
  //     this.data =resp
  //   })


//   async getProducts() {
//     const result =this.connect.getData().subscribe(res=>{
//       console.log(res);
//       this.data=result
//     })
// }
// }
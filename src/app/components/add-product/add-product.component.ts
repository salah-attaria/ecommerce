import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  fileToUpload: File | null = null;

  addProductForm: FormGroup = this.fb.group({
    // _id:new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    image: new FormControl(null, Validators.required),
  });
  register: boolean = false;
  errormsg: boolean = false;
  srcResult: any;
  url: any;
  file: FileList | any;
  fileName: any;
  error: any;
  constructor(
    private connect: ConnectionService,
    private fb: FormBuilder,
    public route: Router
  ) {}
  ngOnInit(): void {}
  addProduct() {
    let productData = this.addProductForm.value;

    const formData = new FormData();
    formData.append('image', this.file?.item(0));
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('description', productData.description);
    console.log(productData);

    if (formData) {
      this.connect.addProduct(formData).subscribe(
        (resp: any) => {
          console.log('add');
          this.register = true;
        },

        (error) => {
          this.error = error;
          console.log(this.error)

          // Handle the error in the component
        }
      );
    } else {
          this.errormsg = true;

    }
  }

  selectedFile: any = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    console.log(this.selectedFile);

    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    this.file = files;
    this.fileName = this.file.item(0).name;
    if (files) {
      // this.addProductForm.get('image')?.setValue(files.item(0));
      this.addProductForm.controls['image'].setValue(files.item(0));
      // console.log( this.addProductForm.patchValue({image:files[0]}));
    } else {
      console.error('No files selected');
    }
  }

  fileToBlob(file: any): Blob {
    debugger;
    return new Blob([file], { type: file.type });
  }
}

import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConnectionService } from 'src/app/services/connection.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent {
  updateProductForm: FormGroup = this.fb.group({
    _id: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    image: new FormControl(null, Validators.required),
  });
  error: boolean = false;
  register: boolean = false;
  id: any;
  selectedFile: any;
  file: any;
  data: any;
  image: any;
  fileName: any;
  constructor(
    private connect: ConnectionService,
    private fb: FormBuilder,
    public route: Router,
    private router: ActivatedRoute,
    private snack:SnackbarService
  ) {}
  ngOnInit(): void {
    this.router.params.subscribe((params: any) => {
      params['id'];
      console.log(params['id']);
      this.id = params['id'];
    });
    debugger;
    this.connect.getDataById(this.id).subscribe((resp: any) => {
      console.log(resp);
      this.data = resp;
      this.image = this.data[0].image;
      // Patching the form with retrieved data
      this.updateProductForm.patchValue({
        _id: this.data[0]._id,
        name: this.data[0].name,
        description: this.data[0].description,
        price: this.data[0].price,
      });
      // Manually set the image field value
      this.updateProductForm.controls['image'].setValue(this.data[0].image);
    });
  }
  update() {
    const data = this.updateProductForm.value;
    const updateData = new FormData();
    updateData.append('image', this.file?.item(0));
    updateData.append('_id', data._id);
    updateData.append('name', data.name);
    updateData.append('price', data.price);
    updateData.append('description', data.description);
    console.log(updateData);
    if (this.updateProductForm.valid) {
      this.connect.updateProductData(updateData).subscribe(resp=>{

        console.log('updated successfully');
        this.snack.openSnackBar('Product has been updated','Success')

      setTimeout(() => {
        this.route.navigateByUrl('/getProducts')
      },3000);
      }
      ,
        (error) => {
          // this.error = error;
          this.snack.openSnackBar('Something went wrong','Warning')
          console.log(this.error);
         

        }
      );
    } else {
      console.log(console.error());
      this.snack.openSnackBar('Something went wrong','Warning')

    }
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    console.log(this.selectedFile);

    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    this.file = files;
    this.fileName = this.file.item(0).name;
    console.log(this.fileName);
    if (files) {
      this.updateProductForm.controls['image'].setValue(files.item(0));
    } else {
      console.error('No files selected');
    }
  }
}

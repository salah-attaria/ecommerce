import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service';
import { toArray, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModuleModule } from '../translate-module.module';
import { jwtDecode } from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent {
  // [x: string]: FileList;
  fileToUpload: any;
  switchLang: any;
  testForm: FormGroup = this.fb.group({
    description: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
    file: new FormControl(null, Validators.required),
  });
  browserLang: any;
  file: any;
  id: any;
  videoUrls: string[] = [];
  videoUrl: any;
  videoDescription: string[] = [];
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private connect: ConnectionService,
    private translate: TranslateService,
    private jwt: JwtHelperService
  ) {
    this.connect.selectedlang.subscribe((resp) => {
      this.switchLang = resp;
    });
  }

  ngOnInit(): void {
    this.translate.addLangs(['de', 'en']);

    this.translate.setDefaultLang('en');
    let token: any = localStorage.getItem('token');
    let decodedToken = this.jwt.decodeToken(token);
    this.id = decodedToken.id;
    console.log(this.id);

    // this.translate.use('en')
    // this.browserLang=this.translate.getDefaultLang();
    // debugger
    // this.languageChanged();
    // this.connect.selectedlang.next(this.browserLang)
  }
  selectedLang(lang: any) {
    this.translate.use(lang);
  }
  languageChanged() {
    this.translate.use(
      this.browserLang.match(/de|en/) ? this.browserLang : 'en'
    );
  }
  onFileSellected(event: any) {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    this.fileToUpload = selectedFile;

    // const files = (event.target as HTMLInputElement).files;
    // this.file = files;
    if (this.fileToUpload) {
      this.testForm.controls['file'].setValue(this.fileToUpload);
    }
  }
  upload() {
    console.log('File to upload:', this.fileToUpload);

    if (!this.fileToUpload) {
      console.error('No file selected');
      return;
    }
    const testData = this.testForm.value;
    const formData: FormData = new FormData();
    formData.append('userId', this.id);
    formData.append('description', testData.description);
    formData.append('file', this.fileToUpload);
    console.log('FormData:', formData);
    this.connect.uploadVideo(formData).subscribe((res) => {
      console.log(res);
    });
  }
  getVideo() {
    this.connect.getVideo(this.id).subscribe((resp: any) => {
      console.log(resp);
      this.videoUrls = resp.map((video: any) => video.videoName);
      this.videoDescription=resp.map((video:any)=>video.description)
    });
    console.log(this.videoUrls);
  }
  //   handleFileInput(event: Event) {
  //     const inputElement = event.target as HTMLInputElement;
  //     const files = inputElement.files;
  //     // Now you can safely access the files property
  //     if (files) {
  //       // Files are not null, proceed with handling them
  //       // Your file handling logic here
  //       this.fileToUpload = files.item(0);
  //       console.log(this.fileToUpload)

  //     } else {
  //       // Files are null, handle this scenario gracefully
  //       console.error("No files selected");
  //     }
  //   }

  //   uploadFile() {
  //     if (this.fileToUpload) {
  //       const formData: FormData = new FormData();
  //       formData.append('file', this.fileToUpload);
  //       console.log(formData)

  //       // Now you can proceed with your logic using formData
  //       this.http.post('http://localhost:4800/upload', formData)
  //       .subscribe(
  //         (response) => {
  //           console.log('File uploaded successfully', response);
  //         },
  //         (error) => {
  //           console.error('Error uploading file', error);
  //         }
  //       );
  //   } else {
  //       console.error('No file selected.');
  //   }

  //   }
}

import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service';
import { toArray } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core'
import { TranslateModuleModule } from '../translate-module.module';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent{
  // [x: string]: FileList;
  fileToUpload: File | null = null;
  switchLang:any;
  testForm: FormGroup = this.fb.group({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  browserLang:any;
  constructor(private http: HttpClient, private fb: FormBuilder,  private connect:ConnectionService,private translate:TranslateService
  ) {
    this.connect.selectedlang.subscribe((resp)=>{
      this.switchLang=resp
    })}
    
  ngOnInit():void{
this.translate.addLangs(['de','en'])


this.translate.setDefaultLang('en');
// this.translate.use('en')
// this.browserLang=this.translate.getDefaultLang();
// debugger
// this.languageChanged();
// this.connect.selectedlang.next(this.browserLang)
  }
  selectedLang(lang:any){
     
    this.translate.use(lang)
   }
languageChanged(){
  this.translate.use(this.browserLang.match( /de|en/ ) ? this.browserLang :'en')
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

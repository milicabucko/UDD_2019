import { Component, OnInit } from '@angular/core';
import { PretragaService } from '../pretraga.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  private fileToUpload : File;
  private categories : any;
  private uploadScientificWorkForm : FormGroup;
  private scientiticWork: any;

  constructor(public pretragaService: PretragaService) { }

  ngOnInit() {

    this.uploadScientificWorkForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      publicationYear: new FormControl('', [Validators.required]),
      keywords: new FormControl('', [Validators.required]),
      filename: new FormControl('', [Validators.required]),
      mime: new FormControl('', [Validators.required]),
      magazine: new FormControl('', [Validators.required]),
      openAccess: new FormControl(true, [Validators.required]),
      category: new FormControl('', [Validators.required])
    })

    this.scientiticWork = {};

    this.pretragaService.getAllCategories().subscribe(data=>{
      this.categories = data;
    })

  }

  
  private handleFileInput(files: FileList) {
    console.log("ajde");
    this.fileToUpload = files.item(0);
    this.pretragaService.uploadPdfFileHttpClient(this.fileToUpload).subscribe(data=>{
      console.log(data);
      this.uploadScientificWorkForm.controls['title'].setValue(data.title);
      this.uploadScientificWorkForm.controls['author'].setValue(data.author);
      this.uploadScientificWorkForm.controls['publicationYear'].setValue(data.publicationYear);
      this.uploadScientificWorkForm.controls['keywords'].setValue(data.keywords);
      this.uploadScientificWorkForm.controls['filename'].setValue(data.filename);
      this.uploadScientificWorkForm.controls['mime'].setValue(data.mime);
      this.uploadScientificWorkForm.controls['magazine'].setValue(data.magazine);
      this.uploadScientificWorkForm.controls['openAccess'].setValue(data.openAccess);
      this.uploadScientificWorkForm.controls['category'].setValue(this.categories[0].value);
      this.scientiticWork.text = data.text;
    })
  }

  saveScientificWork() {
    this.scientiticWork.title = this.uploadScientificWorkForm.value.title;
    this.scientiticWork.author = this.uploadScientificWorkForm.value.author;
    this.scientiticWork.publicationYear = this.uploadScientificWorkForm.value.publicationYear;
    this.scientiticWork.keywords = this.uploadScientificWorkForm.value.keywords;
    this.scientiticWork.filename = this.uploadScientificWorkForm.value.filename;
    this.scientiticWork.mime = this.uploadScientificWorkForm.value.mime;
    this.scientiticWork.magazine = this.uploadScientificWorkForm.value.magazine;
    this.scientiticWork.openAccess = this.uploadScientificWorkForm.value.openAccess;
    this.scientiticWork.category = this.uploadScientificWorkForm.value.category;
    console.log(this.scientiticWork);
    this.pretragaService.saveScientificWork(this.scientiticWork).subscribe(data=>{
      console.log(data);
    })
  }
}

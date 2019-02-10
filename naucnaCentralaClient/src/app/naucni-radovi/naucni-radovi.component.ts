import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NaucnaCentralaService } from '../naucna-centrala.service';
import { Constants } from '../constants/constants';
import {  DialogData } from '../izdanja-magazina/izdanja-magazina.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

export interface DialogData {
  // izdanjeId: number;
   //magazinId: number;
   //korisnik: any;
 }

@Component({
  selector: 'app-naucni-radovi',
  templateUrl: './naucni-radovi.component.html',
  styleUrls: ['./naucni-radovi.component.css']
})
export class NaucniRadoviComponent implements OnInit {
  
  izdanjeId : number;
  radovi: any;
  korisnik: any;

  constructor(public dialog: MatDialog,private route: ActivatedRoute, public ncService : NaucnaCentralaService, private router: Router) { }

  

  ngOnInit() {
    
    this.izdanjeId = parseInt(this.route.snapshot.paramMap.get('izdanjeId'));

    this.ncService.getActiveUser().subscribe(data =>{
      this.korisnik = data;
    })

    this.ncService.izlistajSveRadove(this.izdanjeId).subscribe(data=>{
      console.log(data);
      this.radovi = data;
      if(data.length == 0){
        alert("Trenutno radova za ovo izdanje");
        this.router.navigate(['/homePageCitalac']);
      }
    })
  }

  kupiRad(id, cena) {
    
    const dialogRef = this.dialog.open(NaucniRadoviDialog, {
      width: '400px',
      data: {id, cena,korisnik: this.korisnik}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
   
  }

}

@Component({
  selector: 'naucni-radovi-dialog',
  templateUrl: 'naucni-radovi-dialog.html',
})
export class NaucniRadoviDialog {

  constructor(
    public dialogRef: MatDialogRef<NaucniRadoviDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public ncService : NaucnaCentralaService) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

  kupiRad(id, cena, korisnik){
    this.ncService.executePayment(id, Constants.TIP_PROIZVODA_NAUCNI_RAD, korisnik, cena).subscribe(data=> {
      console.log(data);
      window.open(data);
    })
  }

}

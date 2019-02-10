import { Component, OnInit, Inject } from '@angular/core';
import { NaucnaCentralaService } from '../naucna-centrala.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';


export interface DialogData {
 }

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  magazini: any;
  korisnik: any;

  constructor(public dialog: MatDialog,public ncService : NaucnaCentralaService, private router: Router) { }

  ngOnInit() {

    this.ncService.getActiveUser().subscribe(data =>{
      this.korisnik = data;
    })

    this.ncService.findAllMagazin().subscribe(data =>{
      this.magazini = data;
    })
  }


  prikaziIzdanja(magazinId){
    this.router.navigate(['/izdanjaMagazina', magazinId]);
  }

  platiClanarinu(){

    const dialogRef = this.dialog.open(PlatiClanarinuAutorDialog, {
      width: '400px',
      data: {korisnik: this.korisnik}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }


}

@Component({
  selector: 'plati-clanarinu-autor-dialog',
  templateUrl: 'plati-clanarinu-autor-dialog.html',
})
export class PlatiClanarinuAutorDialog {

  constructor(
    public dialogRef: MatDialogRef<PlatiClanarinuAutorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public ncService : NaucnaCentralaService) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

  platiClanarinu() {
    alert("Funkcionalnost jos nije implementirana");
  }
  

}

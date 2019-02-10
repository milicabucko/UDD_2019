import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NaucnaCentralaService } from '../naucna-centrala.service';
import { Constants } from '../constants/constants';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

export interface DialogData {
 // izdanjeId: number;
  //magazinId: number;
  //korisnik: any;
}

@Component({
  selector: 'app-izdanja-magazina',
  templateUrl: './izdanja-magazina.component.html',
  styleUrls: ['./izdanja-magazina.component.css']
})
export class IzdanjaMagazinaComponent implements OnInit {

  magazinId: number;
  izdanjaMagazina: any;
  korisnik: any;
  izdanjeId: number;



  constructor(public dialog: MatDialog, private route: ActivatedRoute, public ncService : NaucnaCentralaService, private router: Router) { }

  ngOnInit() {

    this.magazinId = parseInt(this.route.snapshot.paramMap.get('magazinId'));

    this.ncService.getActiveUser().subscribe(data =>{
      this.korisnik = data;
    })

    this.ncService.izlistajSvaIzdanja(this.magazinId).subscribe(data=>{
      console.log(data.length);
      this.izdanjaMagazina = data;
      if(data.length == 0){
        alert("Nema izdanja za ovaj magazin");
        this.router.navigate(['/homePageCitalac']);
      }
    })
  }

  prikaziRadove(izdanjeId){
    this.router.navigate(['/listaRadova', izdanjeId]);
  }

  kupiIzdanje(id, cena) {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data: {id, cena,korisnik: this.korisnik}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  kupiIzdanjeBitCoin(amount, naziv) {
    this.ncService.executeBitCoin(naziv, amount).subscribe(data=> {
      
    })
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public ncService : NaucnaCentralaService) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

  kupiIzdanje(izdanjeId, cenaIzdanja, korisnik) {
     this.ncService.executePayment(izdanjeId, Constants.TIP_PROIZVODA_IZDANJE_MAGAZINA, korisnik, cenaIzdanja).subscribe(data=> {
       console.log(data);
       window.open(data);
     })
  }
  

}

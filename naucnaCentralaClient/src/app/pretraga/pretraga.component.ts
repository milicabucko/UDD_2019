import { Component, OnInit } from '@angular/core';
import { Constants } from '../constants/constants';
import { SimpleQuery } from '../model/SimpleQuery';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PretragaService } from '../pretraga.service';
import { AdvancedQuery } from '../model/AdvancedQuery';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {

  private vrstaPretrage: String;

  private simpleQuery: SimpleQuery;
  private searchScientificWorkForm : FormGroup;
  
  private advancedQuery: AdvancedQuery;
  private searchBooleanScientificWorkForm: FormGroup;
  results: any;
  

  constructor(public pretragaService: PretragaService) { }

  ngOnInit() {

    this.searchScientificWorkForm = new FormGroup({
      tip: new FormControl('', [Validators.required]),
      userInput: new FormControl('', [Validators.required])
    })

    this.searchBooleanScientificWorkForm = new FormGroup({
      prviParametar: new FormControl('', [Validators.required]),
      prviParametarVrednost: new FormControl('', [Validators.required]),
      operator: new FormControl('', [Validators.required]),
      drugiParametar: new FormControl('', [Validators.required]),
      drugiParametarVrednost: new FormControl('', [Validators.required])
    })

    this.vrstaPretrage = Constants.PHRAZEQUERY;

    this.simpleQuery = new SimpleQuery();
    this.advancedQuery = new AdvancedQuery();

    this.results = [];

  }

  searchScientificWork() {
    this.results = [];
    console.log("Pretraga");
    this.simpleQuery.field = this.searchScientificWorkForm.value.tip;
    this.simpleQuery.value = this.searchScientificWorkForm.value.userInput;
    this.pretragaService.searchScientificWork(this.simpleQuery, Constants.PHRAZEQUERY).subscribe(data=>{
      console.log(data);
      this.results = data;
    })
  }

  searchBooleanScientificWork() {
    this.results = [];
    console.log("Pretraga boolean");
    this.advancedQuery.field1 = this.searchBooleanScientificWorkForm.value.prviParametar;
    this.advancedQuery.value1 = this.searchBooleanScientificWorkForm.value.prviParametarVrednost;
    this.advancedQuery.operation = this.searchBooleanScientificWorkForm.value.operator;
    this.advancedQuery.field2 = this.searchBooleanScientificWorkForm.value.drugiParametar;
    this.advancedQuery.value2 = this.searchBooleanScientificWorkForm.value.drugiParametarVrednost;
    this.pretragaService.searchBooleanScientificWork(this.advancedQuery, Constants.BOOLEAN_QUERY).subscribe(data=>{
      console.log(data);
      this.results = data;
    })
  }

  download(scientificWork: any) {
    this.pretragaService.download(scientificWork).then(data => {
        var blob = new Blob([data], { type: 'application/pdf' });
        console.log(data);
        FileSaver.saveAs(blob, scientificWork.title + '.pdf')
    })
  }



  tipovi = [
    {value: Constants.PRETRAZI_PO_NASLOVU, viewValue: 'Naslov'},
    {value: Constants.PRETRAZI_PO_NAZIVU_MAGAZINA, viewValue: 'Naziv magazina'},
    {value: Constants.PRETRAZI_PO_AUTORU, viewValue: 'Autor'},
    {value: Constants.PRETRAZI_PO_NAUCNOJ_OBLASTI, viewValue: 'Naucna oblast'},
    {value: Constants.PRETRAZI_PO_SADRZAJ, viewValue: 'Sadrzaj'},
    {value: Constants.PRETRAZI_PO_KLJUCNI_POJMOVI, viewValue: 'Kljucni pojmovi'}
  ];

  vrste =  [
    {value: Constants.BOOLEAN_QUERY, viewValue: 'Boolean'},
    {value: Constants.PHRAZEQUERY, viewValue: 'Phraze'}
  ];

  operatori = [
    {value: Constants.AND, viewValue: 'And'},
    {value: Constants.OR, viewValue: 'Or'}
  ];

}

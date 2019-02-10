import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class NaucnaCentralaService {

  private SERVER_URL = "http://localhost:7000";
  private PAYMENT_CONCENTRATOR_URL = "https://localhost:9000";

  constructor(private http : Http) { }

  hello() {
    return this.http.get(this.SERVER_URL + "/korisnik/hello").map(res => res.toString());
  }

  executePayment(proizvodId: Number, tipProizvoda: String, korisnikId: Number, cena: Number) {
    var kupovina : any;
    kupovina = {};
    kupovina.proizvodId = proizvodId;
    kupovina.tipProizvoda = tipProizvoda;
    kupovina.korisnikId = korisnikId;
    kupovina.cena = cena;
    return this.http.post(this.PAYMENT_CONCENTRATOR_URL + "/payment/execute", kupovina).map(res => res.text());
  }

  executeBitCoin(naziv: String, amount: Number) {
    var kupovina : any;
    kupovina = {};
    kupovina.naziv = naziv;
    kupovina.amount = amount;
    return this.http.post(this.PAYMENT_CONCENTRATOR_URL + "/api/bitcoin", kupovina).map(res => res.toString());
  }

  login(username: String){
    console.log(username);
    return this.http.get(this.SERVER_URL + "/korisnik/login/" + username).map(res => res.json());
  }

  getActiveUser() {
    return this.http.get(this.SERVER_URL + "/getActiveUser").map(res=>res.json());
  }

  findAllMagazin(){
    return this.http.get(this.SERVER_URL + '/magazin/findAllMagazin').map(res => res.json());
  }

  izlistajSvaIzdanja(magazinId: Number){
    return this.http.get(this.SERVER_URL + '/magazin/izlistajSvaIzdanja/' + magazinId).map(res => res.json());
  }

  izlistajSveRadove(izdanjeId : Number){
    return this.http.get(this.SERVER_URL + '/izdanje/izlistajSveRadove/' + izdanjeId).map(res => res.json());
  }

}

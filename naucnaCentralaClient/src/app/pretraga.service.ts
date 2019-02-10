import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NaucniRad } from './model/naucniRad';
import { SimpleQuery } from './model/SimpleQuery';
import { AdvancedQuery } from './model/AdvancedQuery';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PretragaService {

  private SERVER_URL = "http://localhost:8080";

  constructor(private http : Http, private httpClient: HttpClient) { }

  uploadPdfFileHttpClient(file: File){

    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.SERVER_URL + "/api/ebooks/upload", formData).map(res => res.json());
  }

  saveScientificWork(scientificWork: any) {
    return this.http.post(this.SERVER_URL + "/api/ebooks/create", scientificWork).map(res => res.json());
  }

  searchScientificWork(simpleQuery: SimpleQuery, type: String) {
    return this.http.post(this.SERVER_URL + '/api/search/' + type, simpleQuery).map(res => res.json());
  }

  searchBooleanScientificWork(advancedQuery: AdvancedQuery, type: String) {
    return this.http.post(this.SERVER_URL + '/api/search/' + type, advancedQuery).map(res => res.json());
  }

  download(scientificWork){
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.httpClient.get(this.SERVER_URL + "/api/ebooks/download/" + scientificWork.id, { headers: headers, responseType: 'blob' }).toPromise();
  }

  getAllCategories() {
    return this.http.get(this.SERVER_URL + "/category/getAll").map(res => res.json());
  }
  
}

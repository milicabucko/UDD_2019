import { Component, OnInit } from '@angular/core';
import { NaucnaCentralaService } from './naucna-centrala.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(public ncService : NaucnaCentralaService) { }

  ngOnInit() {

  }

  zdravo() {
    this.ncService.hello().subscribe(
      data => {
        alert(data);
      }
    )
  }

}

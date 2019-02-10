import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule,routingComponents } from './app-routing';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

//MATERIALS
import {
  MatAutocompleteModule,  MatButtonModule,  MatButtonToggleModule,  MatCardModule,  MatCheckboxModule,
  MatChipsModule,  MatDatepickerModule,  MatDialogModule,  MatExpansionModule,  MatGridListModule,
  MatIconModule,  MatInputModule,  MatListModule,  MatMenuModule,  MatNativeDateModule,  MatPaginatorModule,
  MatProgressBarModule,  MatProgressSpinnerModule,  MatRadioModule,  MatRippleModule,  MatSelectModule,
  MatSidenavModule,  MatSliderModule,  MatSlideToggleModule,  MatSnackBarModule,  MatSortModule,
  MatTableModule,  MatTabsModule,  MatToolbarModule,  MatTooltipModule,  MatStepperModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//SERVISI
import { NaucnaCentralaService } from './naucna-centrala.service';

//COMPONENTS
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomepageComponent, PlatiClanarinuAutorDialog } from './homepage/homepage.component';
import { IzdanjaMagazinaComponent, DialogOverviewExampleDialog } from './izdanja-magazina/izdanja-magazina.component';
import { HomepagecitalacComponent, PlatiClanarinuHomepageDialog } from './homepagecitalac/homepagecitalac.component';
import { PosaljiRadComponent } from './posalji-rad/posalji-rad.component';
import { NaucniRadoviComponent, NaucniRadoviDialog } from './naucni-radovi/naucni-radovi.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { UploadComponent } from './upload/upload.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    IzdanjaMagazinaComponent,
    HomepagecitalacComponent,
    PosaljiRadComponent,
    NaucniRadoviComponent,
    DialogOverviewExampleDialog,
    NaucniRadoviDialog,
    PlatiClanarinuHomepageDialog,
    PlatiClanarinuAutorDialog,
    PretragaComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule, AppRoutingModule,
    FormsModule,ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,  MatButtonModule,  MatButtonToggleModule,  MatCardModule,  MatCheckboxModule,
    MatChipsModule,  MatDatepickerModule,  MatDialogModule,  MatExpansionModule,  MatGridListModule,
    MatIconModule,  MatInputModule,  MatListModule,  MatMenuModule,  MatNativeDateModule,  MatPaginatorModule,
    MatProgressBarModule,  MatProgressSpinnerModule,  MatRadioModule,  MatRippleModule,  MatSelectModule,
    MatSidenavModule,  MatSliderModule,  MatSlideToggleModule,  MatSnackBarModule,  MatSortModule,
    MatTableModule,  MatTabsModule,  MatToolbarModule,  MatTooltipModule,  MatStepperModule, HttpClientModule

  ],
  providers: [NaucnaCentralaService],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog,
                    NaucniRadoviDialog,
                    PlatiClanarinuHomepageDialog,
                    PlatiClanarinuAutorDialog]
})
export class AppModule { }

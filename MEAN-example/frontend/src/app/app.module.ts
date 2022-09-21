import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaStranaComponent } from './pocetna-strana/pocetna-strana.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { CitalacProfilComponent } from './citalac-profil/citalac-profil.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { AdminPrijavaComponent } from './admin-prijava/admin-prijava.component';
import { AdminPocetnaComponent } from './admin-pocetna/admin-pocetna.component';
import { CitalacPodaciStrComponent } from './citalac-podaci-str/citalac-podaci-str.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RezPretragaComponent } from './rez-pretraga/rez-pretraga.component';
import { DetaljiKnjigaComponent } from './detalji-knjiga/detalji-knjiga.component';
import { IstorijaComponent } from './istorija/istorija.component';
import { ZaduzenjaComponent } from './zaduzenja/zaduzenja.component';
import { DodajKnjiguComponent } from './dodaj-knjigu/dodaj-knjigu.component';


@NgModule({
  declarations: [
    AppComponent,
    PocetnaStranaComponent,
    RegistracijaComponent,
    PrijavaComponent,
    CitalacProfilComponent,
    PromenaLozinkeComponent,
    AdminPrijavaComponent,
    AdminPocetnaComponent,
    CitalacPodaciStrComponent,
    RezPretragaComponent,
    DetaljiKnjigaComponent,
    IstorijaComponent,
    ZaduzenjaComponent,
    DodajKnjiguComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

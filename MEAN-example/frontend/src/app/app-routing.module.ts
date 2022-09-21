import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPocetnaComponent } from './admin-pocetna/admin-pocetna.component';
import { AdminPrijavaComponent } from './admin-prijava/admin-prijava.component';
import { CitalacPodaciStrComponent } from './citalac-podaci-str/citalac-podaci-str.component';
import { CitalacProfilComponent } from './citalac-profil/citalac-profil.component';
import { DetaljiKnjigaComponent } from './detalji-knjiga/detalji-knjiga.component';
import { DodajKnjiguComponent } from './dodaj-knjigu/dodaj-knjigu.component';
import { IstorijaComponent } from './istorija/istorija.component';
import { PocetnaStranaComponent } from './pocetna-strana/pocetna-strana.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RezPretragaComponent } from './rez-pretraga/rez-pretraga.component';
import { ZaduzenjaComponent } from './zaduzenja/zaduzenja.component';

const routes: Routes = [
  {path:'pocetna',component:PocetnaStranaComponent},
  {path:'prijava',component:PrijavaComponent},
  {path:'citalac-profil',component:CitalacProfilComponent},
  {path:'registracija',component:RegistracijaComponent},
  {path:'promena_lozinke',component:PromenaLozinkeComponent},
  {path:'admin-prijava',component:AdminPrijavaComponent},
  {path:'admin-pocetna',component:AdminPocetnaComponent},
  {path:'citalac-podaci',component:CitalacPodaciStrComponent},
  {path:'rez-pretrazi',component:RezPretragaComponent},
  {path:'detalji-knjiga',component:DetaljiKnjigaComponent},
  {path:'istorija',component:IstorijaComponent},
  {path:'zaduzenja',component:ZaduzenjaComponent},
  {path:'dodaj-knjigu',component:DodajKnjiguComponent},
  {path:'**',component:PocetnaStranaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';
import { KnjigeService } from '../services/knjige.service';

@Component({
  selector: 'app-citalac-profil',
  templateUrl: './citalac-profil.component.html',
  styleUrls: ['./citalac-profil.component.css']
})
export class CitalacProfilComponent implements OnInit {

  constructor(private router: Router, private knjigeService: KnjigeService,config: NgbCarouselConfig) {
    config.interval = 2600;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = true;
    config.showNavigationIndicators = false;
   }

  ngOnInit(): void {
    this.korisnik=JSON.parse(sessionStorage.getItem('prijavljeniKorisnik'))
    this.knjigeService.dohvati_knjige().subscribe((knjige:Knjiga[])=>{
      if(knjige!=null){

      this.knjige=knjige
      this.knjige.sort((a,b)=>{ return (parseInt(b.brUzimanja) - parseInt(a.brUzimanja));})
      this.knjiga_dana=this.knjige[((new Date().getFullYear() + new Date().getDay()) % this.knjige.length)];
      }
    })
  }

  korisnik:Korisnik;
  knjige:Knjiga[];
  knjiga_dana:Knjiga;

  odjava(){
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate(['pocetna'])
  }

  promena_lozinke(){
    this.router.navigate(['promena_lozinke'])
  }

  profilna(){
    this.router.navigate(['citalac-podaci'])
  }
  pocetna_stara(){
    this.router.navigate(['pocetna'])
  }

  pretrazi(){
    this.router.navigate(['rez-pretrazi'])
  }

  istorija(){
    this.router.navigate(['istorija'])
  }

  zaduzenja(){
    this.router.navigate(['zaduzenja'])
  }

  dodajKnjigu(){
    this.router.navigate(['dodaj-knjigu'])
  }



}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';
import { ZaduzenaKnjiga } from '../models/zaduzena_knjiga';
import { KnjigeService } from '../services/knjige.service';
import { KorisniciService } from '../services/korisnici.service';

@Component({
  selector: 'app-zaduzenja',
  templateUrl: './zaduzenja.component.html',
  styleUrls: ['./zaduzenja.component.css']
})
export class ZaduzenjaComponent implements OnInit {

  constructor(private router:Router,private korisnikService:KorisniciService,private knjigeService:KnjigeService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem('prijavljeniKorisnik'))

  }

  rokovi:Number[]

  korisnik:Korisnik

  profil(){
    this.router.navigate(['/citalac-podaci'])
  }
  pocetna(){
    this.router.navigate(['/citalac-profil'])
  }
  odjava(){
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate(['/pocetna'])
  }

  detalji(knjiga){
    if(this.korisnik!=null) this.router.navigate(['detalji-knjiga',{arg:knjiga.id}])
  }

  vrati(id,datum_zaduzivanja){
    this.knjigeService.dohvati_knjiguID(id).subscribe((k:Knjiga)=>{
      this.knjigeService.vrati_knjigu(id,k.kolicina,k.brZaduzenja).subscribe((k2:Knjiga)=>{
        this.korisnikService.vrati_knjigu(this.korisnik.korisnicko_ime,k2.id,k2.naziv,k2.autori,k2.slikaPutanja,datum_zaduzivanja).subscribe((u:Korisnik)=>{
          this.korisnik=u;
          sessionStorage.setItem('prijavljeniKorisnik',JSON.stringify(this.korisnik))
        })
      })
    })
  }


}

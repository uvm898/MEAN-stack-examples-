import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-citalac-podaci-str',
  templateUrl: './citalac-podaci-str.component.html',
  styleUrls: ['./citalac-podaci-str.component.css']
})
export class CitalacPodaciStrComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.korisnik= JSON.parse(sessionStorage.getItem('prijavljeniKorisnik'))
    this.forma = new FormGroup({
      korisnicko_ime: new FormControl(this.korisnik.korisnicko_ime),
      ime: new FormControl(this.korisnik.ime),
      prezime: new FormControl(this.korisnik.prezime),
      adresa: new FormControl(this.korisnik.adresa),
      telefon: new FormControl(this.korisnik.telefon),
      mejl: new FormControl(this.korisnik.mejl)
    })
    this.izabranaSlika=this.korisnik.slikaPutanja
  }

  korisnik:Korisnik;
  forma: FormGroup;
  izabranaSlika:string;

  promena_lozinke(){
    this.router.navigate(['promena_lozinke'])
  }

  odjava(){
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate(['pocetna'])
  }

  azuriraj(){
    // kada stidgnes dovrsi za dodatne poene
  }

}

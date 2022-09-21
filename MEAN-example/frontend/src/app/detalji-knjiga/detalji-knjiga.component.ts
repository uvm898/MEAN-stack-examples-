import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';
import { ZaduzenaKnjiga } from '../models/zaduzena_knjiga';
import { KnjigeService } from '../services/knjige.service';
import { KorisniciService } from '../services/korisnici.service';

@Component({
  selector: 'app-detalji-knjiga',
  templateUrl: './detalji-knjiga.component.html',
  styleUrls: ['./detalji-knjiga.component.css']
})
export class DetaljiKnjigaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private knjigaService: KnjigeService, private korisnikService: KorisniciService,private router:Router) { }
  knjiga:Knjiga;
  ngOnInit(): void {
    this.idKnjiga=this.route.snapshot.paramMap.get('arg');
    this.korisnik=JSON.parse(sessionStorage.getItem('prijavljeniKorisnik'))
    this.knjigaService.dohvati_knjiguID(this.idKnjiga).subscribe((k:Knjiga)=>{
      this.knjiga=k;
    })
  }

  korisnik:Korisnik;
  idKnjiga:string;


  pocetna(){
    this.router.navigate(['citalac-profil'])
  }

  profilna(){
    this.router.navigate(['citalac-podaci'])
  }

  odjava(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['**']);
  }

  imam_knjigu():boolean{
    if(this.korisnik.zaduzene_knjige){
      for(let i=0;i<this.korisnik.zaduzene_knjige.length;i++)
        if(this.knjiga.id==this.korisnik.zaduzene_knjige[i].id)
              return true;
      return false;
    }
    else return false;
  }

  zaduzi(){
    if(this.imam_knjigu())alert('KORISNIK VEC IMA OVU KNJIGU!');
    else if(this.korisnik.zaduzene_knjige && this.korisnik.zaduzene_knjige.length>=3) alert('KORISNIK VEC ZADUZIO 3 KNJIGE');
    else if(this.knjiga.kolicina==0)alert('NEMA KNJIGE NA STANJU');
    else{
      this.knjigaService.zaduzi_knjigu(this.knjiga.id,this.knjiga.kolicina,this.knjiga.brUzimanja,this.knjiga.brZaduzenja).subscribe((k:Knjiga)=>{
        this.knjiga = k;
        this.korisnikService.zaduzi_knjigu(this.korisnik.korisnicko_ime,this.knjiga.id,this.knjiga.naziv,this.knjiga.autori,this.knjiga.slikaPutanja).subscribe((u:Korisnik)=>{
          this.korisnik=u;
          sessionStorage.removeItem('prijavljeniKorisnik');
          sessionStorage.setItem('prijavljeniKorisnik',JSON.stringify(this.korisnik))
        })
      })
    }
  }

}

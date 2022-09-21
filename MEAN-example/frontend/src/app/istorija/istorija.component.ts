import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { KorisniciService } from '../services/korisnici.service';

@Component({
  selector: 'app-istorija',
  templateUrl: './istorija.component.html',
  styleUrls: ['./istorija.component.css']
})
export class IstorijaComponent implements OnInit {

  constructor(private router:Router,private korisnikService:KorisniciService) { }


  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem('prijavljeniKorisnik'))
  }

  korisnik:Korisnik;


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

  sortNaziv(){
    this.korisnik.istorija.sort((knjiga1, knjiga2)=>{return knjiga1.naziv.localeCompare(knjiga2.naziv);})
  }

  sortAutor(){
    this.korisnik.istorija.sort((knjiga1, knjiga2)=>{return knjiga1.autori.localeCompare(knjiga2.autori);})
  }
  sortDZ(){
    this.korisnik.istorija.sort((knjiga1,knjiga2)=>{
      let ret= (knjiga1.datum_zaduzivanja<knjiga2.datum_zaduzivanja)?-1:((knjiga1.datum_zaduzivanja==knjiga2.datum_zaduzivanja)?0:1);
      console.log(ret)
      return ret;
    })
  }
  sortDV(){
    this.korisnik.istorija.sort((knjiga1,knjiga2)=>{
      if(knjiga1==null && knjiga2==null) return 0;
      else if(knjiga1==null) return 1;
      else if(knjiga2==null) return -1;
      else return (knjiga1.datum_vracanja<knjiga2.datum_vracanja)?-1:((knjiga1.datum_vracanja==knjiga2.datum_vracanja)?0:1);
    })
  }

}

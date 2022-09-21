import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';
import { KnjigeService } from '../services/knjige.service';

@Component({
  selector: 'app-rez-pretraga',
  templateUrl: './rez-pretraga.component.html',
  styleUrls: ['./rez-pretraga.component.css']
})
export class RezPretragaComponent implements OnInit {

  constructor(private router: Router, private knjigeService: KnjigeService) { }

  korisnik: Korisnik;

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem('prijavljeniKorisnik'))
  }

  naziv: string;
  autori: string;
  knjige: Knjiga[];
  knjigeA: Knjiga[];
  knjigeN: Knjiga[];


  pretrazi() {
    if (this.naziv!=null) {
      this.knjigeService.pretrazi_po_nazivu(this.naziv).subscribe((kN: Knjiga[]) => {
        this.knjigeN = kN;
        if(this.autori){
          this.knjigeService.pretrazi_po_autorima(this.autori).subscribe((kA: Knjiga[]) => {
            this.knjigeA = kA;
            this.knjige = kA;
            if(kN!=null){
              for (let i = 0; i < this.knjigeN.length; i++) {
                let nadjena = false;
                for (let j = 0; j < this.knjigeA.length; j++) {
                  if (this.knjigeN[i].id == this.knjigeA[j].id)
                    nadjena = true;
                }
                if (!nadjena) this.knjige.push(this.knjigeN[i])
              }
            }
          })
        }
        else this.knjige=kN;
        this.naziv=this.autori=null;
      })
    }
    else if(this.autori){
      this.knjigeService.pretrazi_po_autorima(this.autori).subscribe((kA: Knjiga[]) => {
        this.knjige = kA;
        this.naziv=this.autori=null;
      })
    }
    else this.knjige=null;

  }

  prijava() {
    this.router.navigate(['prijava'])
  }

  pocetna() {
    this.router.navigate(['pocetna'])
  }

  detaljiKnjiga(knjiga:Knjiga){
   if(this.korisnik!=null) this.router.navigate(['detalji-knjiga',{arg:knjiga.id}])
  }

  odjava(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['pocetna'])
  }

  profilna(){

  }

}

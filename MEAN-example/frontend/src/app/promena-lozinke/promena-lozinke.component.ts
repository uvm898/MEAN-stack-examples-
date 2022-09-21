import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { KorisniciService } from '../services/korisnici.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private router:Router,private korisnikService:KorisniciService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem('korisnik'))
  }

  korisnik:Korisnik;
  stara_lozinka:string;
  nova_lozinka:string;
  nova_lozinka2:string;

  odjava(){
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate(['/prijava'])
  }

  promeni_lozinku(){
    let passworPattern = new RegExp("^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$");
    let passwordBeginWith = new RegExp("^[A-Z,a-z]", "i");
    if(this.nova_lozinka==this.nova_lozinka2 && this.stara_lozinka==this.korisnik.lozinka &&
      passworPattern.test(this.nova_lozinka) && passwordBeginWith.test(this.nova_lozinka) ){
        this.korisnikService.promeni_lozinku(this.korisnik.korisnicko_ime,this.stara_lozinka,this.nova_lozinka).subscribe(res=>{
          if(res['poruka']=='ok'){
            alert('LOZINKA JE USPESNO PROMENJENA')
            this.odjava()
          }
          else alert('GRESKA PRI PROMENI LOZINKE')
        })
      }
      else{
        alert('NEKOREKTNO STE UNELI PODATKE')
      }
  }
  profilna(){
    this.router.navigate(['citalac-podaci'])
  }
}



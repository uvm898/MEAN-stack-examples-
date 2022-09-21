import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisniciService } from '../services/korisnici.service';
import { Korisnik } from '../models/korisnik'

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private router:Router, private korisnikService:KorisniciService) { }

  ngOnInit(): void {
  }

  korisnicko_ime:string;
  lozinka:string;

  pocetna(){
    this.router.navigate(['pocetna'])
  }

  registracija(){
    this.router.navigate(['registracija'])
  }


  prijava(){
    if(this.korisnicko_ime && this.lozinka)

     this.korisnikService.prijava(this.korisnicko_ime,this.lozinka).subscribe((res:Korisnik) =>{
      if(res!=null){
        sessionStorage.setItem('prijavljeniKorisnik',JSON.stringify(res))
       this.router.navigate(['citalac-profil'])


      }
      else{
        alert("NEUSPELA PRIJAVA")
        this.router.navigate(['prijava'])
      }
     })
  }


}

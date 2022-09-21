import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { KorisniciService } from '../services/korisnici.service';

@Component({
  selector: 'app-admin-prijava',
  templateUrl: './admin-prijava.component.html',
  styleUrls: ['./admin-prijava.component.css']
})
export class AdminPrijavaComponent implements OnInit {

  constructor(private router: Router, private korisnikService: KorisniciService) { }

  ngOnInit(): void {
  }

  korisnicko_ime: string;
  lozinka: string;

  prijava() {
    if (this.korisnicko_ime && this.lozinka) {
      this.korisnikService.prijava(this.korisnicko_ime, this.lozinka).subscribe((resp: Korisnik) => {
        if (resp != null) {

          if (resp.tip == 'admin') {
            sessionStorage.setItem('admin', JSON.stringify(resp))
            this.router.navigate(['admin-pocetna'])
          }
          else alert('GRESKA PRI PRIJAVI')
        }
        else {
          console.log('ovde sam')
          alert('GRESKA PRI PRIJAVI')
        }
      })
    }
  }

  pocetna() {
    this.router.navigate(['pocetna'])
  }

}

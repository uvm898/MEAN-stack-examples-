import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-admin-pocetna',
  templateUrl: './admin-pocetna.component.html',
  styleUrls: ['./admin-pocetna.component.css']
})
export class AdminPocetnaComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.admin=JSON.parse(sessionStorage.getItem('admin'))
  }

  admin:Korisnik

  odjava(){
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate(['admin-prijava'])
  }

  pocetna(){
    this.router.navigate(['pocetna'])
  }

}

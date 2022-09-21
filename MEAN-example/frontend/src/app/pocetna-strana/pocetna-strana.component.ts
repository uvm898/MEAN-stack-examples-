import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../models/knjiga';
import { KnjigeService } from '../services/knjige.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pocetna-strana',
  templateUrl: './pocetna-strana.component.html',
  styleUrls: ['./pocetna-strana.component.css']
})
export class PocetnaStranaComponent implements OnInit {

  constructor(private router: Router, private knjigeService: KnjigeService,config: NgbCarouselConfig) {
    config.interval = 2600;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = true;
    config.showNavigationIndicators = false;
   }

  ngOnInit(): void {
    this.knjigeService.dohvati_knjige().subscribe((knjige: Knjiga[]) => {
      if (knjige != null) {

        this.knjige = knjige
        this.knjige.sort((a, b) => { return (parseInt(b.brUzimanja) - parseInt(a.brUzimanja)); })
      }
    })
  }

  knjige: Knjiga[];
  slajder:Knjiga[];
  registracija() {
    this.router.navigate(['registracija'])
  }

  prijava() {
    this.router.navigate(['prijava']);
  }

  pretrazi(){
    this.router.navigate(['rez-pretrazi'])
  }




}

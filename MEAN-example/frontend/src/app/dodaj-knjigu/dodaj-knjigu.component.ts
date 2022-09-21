import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';
import { mimetype } from '../registracija/mime-type.validators'
import { KnjigeService } from '../services/knjige.service';

@Component({
  selector: 'app-dodaj-knjigu',
  templateUrl: './dodaj-knjigu.component.html',
  styleUrls: ['./dodaj-knjigu.component.css']
})
export class DodajKnjiguComponent implements OnInit {

  constructor(private router: Router,private knjigaService: KnjigeService) { }


  korisnik:Korisnik;

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem('prijavljeniKorisnik'));
    this.forma = new FormGroup({
      naziv: new FormControl(null),
      autori: new FormControl(null),
      zanrovi: new FormControl(null),
      izdavac: new FormControl(null),
      godina: new FormControl(null),
      jezik: new FormControl(null),
      slika: new FormControl(null, { asyncValidators: [mimetype] })
    })
    this.knjigaService.dohvati_knjige().subscribe((k:Knjiga[])=>{
      k.sort((a,b)=>{return b.id.localeCompare(a.id)})
      console.log(k[0].id)
      this.maxid = parseInt(k[0].id)+1;
      this.myID=this.maxid.toString();
      console.log(this.myID)
    })
  }

  forma: FormGroup;
  maxid:number;
  myID:string
  izabranaSlika:string;

  IzabranaSlika(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.forma.patchValue({ slika: file });
    this.forma.get('slika').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.izabranaSlika = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  uneti_podaci_ok():boolean{
    if (this.forma.value.naziv == ""){ alert("Obavezno uneti naziv knjige"); return false;}
    else if (this.forma.value.autori == "" ){ alert("Obavezno uneti autora knjige"); return false;}
    else if (this.forma.value.zanrovi.length == 0) { alert("Obavezno uneti zanr knjige"); return false;}
    else if (this.forma.value.zanrovi.length > 3) { alert("Dozvoljeno 3 zanra"); return false;}
    else if (this.forma.value.izdavac == ""){ alert("Obavezno uneti izdavaca knjige"); return false;}
    else if (!this.forma.value.godina) { alert("Obavezno uneti godinu knjige"); return false;}
    else if (this.forma.value.jezik ==  "") { alert("Obavezno uneti jezik knjige"); return false;}
    else return true;
  }
  zanrovi:String[]
  registruj(){

    if(this.uneti_podaci_ok()){
    // this.zanrovi= this.forma.value.zanrovi
    //   console.log(this.zanrovi.toString());
    //     this.forma.value.zanrovi=this.zanrovi.toString()
      if(this.forma.value.slika){
        this.knjigaService.registracija_slika(this.myID,this.forma.value.naziv,this.forma.value.autori,
          this.forma.value.zanrovi,this.forma.value.izdavac,this.forma.value.godina,this.forma.value.jezik,this.forma.value.slika).subscribe((k:Knjiga)=>{
            alert('USPESNO REGISTROVANA KNJIGA')
            this.forma.reset();
          })
      }
      else{
        this.zanrovi= this.forma.value.zanrovi
      console.log(this.zanrovi.toString());
        this.forma.value.zanrovi=this.zanrovi.toString()
        this.knjigaService.registracija_bez_slike(this.myID,this.forma.value.naziv,this.forma.value.autori,
          this.forma.value.zanrovi,this.forma.value.izdavac,this.forma.value.godina,this.forma.value.jezik).subscribe((k:Knjiga)=>{
            alert('USPESNO REGISTROVANA KNJIGA')
            this.forma.reset();
          })
      }

    }
  }

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

}

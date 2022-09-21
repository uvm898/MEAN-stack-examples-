import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisniciService } from '../services/korisnici.service';
import { mimetype } from './mime-type.validators'

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private router: Router, private korisniciService: KorisniciService) { }

  ngOnInit(): void {
    this.forma = new FormGroup({
      korisnicko_ime: new FormControl(null),
      lozinka: new FormControl(null),
      potvrda_lozinke: new FormControl(null),
      ime: new FormControl(null),
      prezime: new FormControl(null),
      adresa: new FormControl(null),
      telefon: new FormControl(null),
      mejl: new FormControl(null),
      slika: new FormControl(null, { asyncValidators: [mimetype] })
    })
  }

  forma: FormGroup;
  izabranaSlika: string;

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

  pocetna() {
    this.router.navigate(['pocetna'])
  }
  registruj() {

    if (this.uneti_podaci_ok()) {
      this.korisniciService.postoji_mejl_korisnicko_ime(this.forma.value.korisnicko_ime, this.forma.value.mejl).subscribe(res => {
        if (res['poruka'] == 'postoji') {
          alert('POSTOJI KORISNIK SA DATIM KREDENCIJALIMA')
          this.forma.reset()

        }
        else {
          // ovde treba hesirati sifru odmah na frontu

          if(this.forma.value.slika){
          this.korisniciService.registruj(
            this.forma.value.korisnicko_ime,
            this.forma.value.lozinka,
            this.forma.value.ime,
            this.forma.value.prezime,
            this.forma.value.adresa,
            this.forma.value.telefon,
            this.forma.value.mejl,
            this.forma.value.slika).subscribe(res => {
              if (res['poruka'] == 'ok') {
                alert('KORISNIK JE REGISTROVAN')
                this.forma.reset()
                this.router.navigate(['pocetna'])
              }
              else {
                alert('GRESKA PRI REGISTRACIJI')
              }
            })}
            else{
              this.korisniciService.registruj(
                this.forma.value.korisnicko_ime,
                this.forma.value.lozinka,
                this.forma.value.ime,
                this.forma.value.prezime,
                this.forma.value.adresa,
                this.forma.value.telefon,
                this.forma.value.mejl,
                null).subscribe(res => {
                  if (res['poruka'] == 'ok') {
                    alert('KORISNIK JE REGISTROVAN')
                    this.forma.reset()
                    this.router.navigate(['pocetna'])
                  }
                  else {
                    alert('GRESKA PRI REGISTRACIJI')
                  }
                })
            }
        }
      })
    }
  }

  uneti_podaci_ok(): boolean {
    let passworPattern = new RegExp("^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$");
    let passwordBeginWith = new RegExp("^[A-Z,a-z]", "i");
    if (this.forma.value.potvrda_lozinke != this.forma.value.lozinka) {
      alert('LOZINKE SE NE POKLAPAJU')
      return false;
    }
    if (!passworPattern.test(this.forma.value.lozinka) || !passwordBeginWith.test(this.forma.value.potvrda_lozinke)) {
      alert('NEKOREKTAN FORMAT LOZINKE')
      return false;
    }
    if (this.forma.value.korisnicko_ime == null || this.forma.value.ime == null || this.forma.value.prezime == null ||
      this.forma.value.adresa == null || this.forma.value.telefon == null || this.forma.value.mejl == null) {
      alert('OBAVEZNO POPUNITI SVA POLJA FORME')
      return false;
    }
    return true;
  }

}




import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'


  registruj(korisnicko_ime, lozinka, ime, prezime, adresa, telefon, mejl, slika) {
    if (slika != null) {
      const postData = new FormData();
      postData.append('korisnicko_ime', korisnicko_ime)
      postData.append('lozinka', lozinka)
      postData.append('ime', ime)
      postData.append('prezime', prezime)
      postData.append('adresa', adresa)
      postData.append('telefon', telefon)
      postData.append('mejl', mejl)
      postData.append('tip', 'citalac')
      postData.append('slika', slika, korisnicko_ime)
      return this.http.post(`${this.uri}/korisnici/registracija_slika`, postData)
    }
    else {
      const postData = {
        korisnicko_ime:korisnicko_ime,
        lozinka:lozinka,
        ime:ime,
        prezime:prezime,
        adresa:adresa,
        telefon:telefon,
        mejl:mejl,
        tip:'citalac'
      }
      return this.http.post(`${this.uri}/korisnici/registracija_bez_slike`, postData)
    }

  }

  postoji_mejl_korisnicko_ime(korisnicko_ime, mejl) {
    const postData = new FormData();
    postData.append('korisnicko_ime', korisnicko_ime);
    postData.append('mejl', mejl);
    return this.http.post(`${this.uri}/korisnici/postoji_mejl_korisnicko_ime`, postData)
  }

  prijava(korisnicko_ime,lozinka){
    const postData={
      korisnicko_ime:korisnicko_ime,
      lozinka:lozinka
    }
    return this.http.post(`${this.uri}/korisnici/prijava`,postData)
  }

  dohvati_korisnika(korisnicko_ime,lozinka){
    const postData={
      korisnicko_ime:korisnicko_ime,
      lozinka:lozinka
    }
    return this.http.post(`${this.uri}/korisnici/dohvati_korisnika`,postData)
  }

  promeni_lozinku(korisnicko_ime,stara_lozinka,nova_lozinka){
      const postData={
        korisnicko_ime:korisnicko_ime,
        lozinka:stara_lozinka,
        nova_lozinka:nova_lozinka
      }
      return this.http.post(`${this.uri}/korisnici/promeni_lozinku`,postData)
  }

  zaduzi_knjigu(korisnicko_ime,id,naziv,autori,slikaPutanja){
    const data = {
      korisnicko_ime:korisnicko_ime,
      id:id,
      naziv:naziv,
      autori:autori,
      slikaPutanja:slikaPutanja
    }

    return this.http.post(`${this.uri}/korisnici/zaduzi_knjigu`,data)
  }

  vrati_knjigu(korisnicko_ime,id,naziv,autori,slikaPutanja,datum_zaduzivanja){
    const data = {
      korisnicko_ime:korisnicko_ime,
      id:id,
      naziv:naziv,
      autori:autori,
      slikaPutanja:slikaPutanja,
      datum_zaduzivanja:datum_zaduzivanja
    }

    return this.http.post(`${this.uri}/korisnici/vrati_knjigu`,data)
  }
}

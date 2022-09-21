import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Knjiga } from '../models/knjiga';

@Injectable({
  providedIn: 'root'
})
export class KnjigeService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000';


  pretrazi_po_nazivu(naziv){
    const data  = { naziv:naziv }
    return this.http.post(`${this.uri}/knjige/pretrazi_po_nazivu`,data);
  }

  pretrazi_po_autorima(autori){
    const data = { autori:autori }
    return this.http.post(`${this.uri}/knjige/pretrazi_po_autorima`,data)
  }


  dohvati_knjige(){
    return this.http.get(`${this.uri}/knjige/dohvati_knjige`);
  }

  dohvati_knjiguID(id){
    const data = {id:id}
    return this.http.post(`${this.uri}/knjige/dohvati_knjiguID`,data);
  }

  zaduzi_knjigu(id,kolicina,brUzimanja,brZaduzenja){
    const data = {
      id:id,
      kolicina:kolicina,
      brUzimanja:brUzimanja,
      brZaduzenja:brZaduzenja
    }

    return this.http.post(`${this.uri}/knjige/zaduzi_knjigu`,data);

  }

  registracija_slika(id,naziv, autori, zanrovi, izdavac, godina, jezik, slika){
    let postData = new FormData();
    postData.append("naziv", naziv);
    postData.append("autori", autori);
    postData.append("zanrovi", null);
    postData.append("izdavac", izdavac);
    postData.append("godina", godina);
    postData.append("jezik", jezik);
    postData.append("image", slika);
    postData.append("id", id);

    return this.http.post(`${this.uri}/knjige/registracija_slika`, postData);


  }

  registracija_bez_slike(id,naziv, autori, zanrovi, izdavac, godina, jezik){
    const data={
      naziv:naziv,
      id:id,
      autori:autori,
      zanrovi:zanrovi,
      izdavac:izdavac,
      godina:godina,
      jezik:jezik
    }

    return this.http.post(`${this.uri}/knjige/registracija_bez_slike`, data);
  }

  vrati_knjigu(id,kolicina,brZaduzenja){
    const data = {
      id:id,
      kolicina:kolicina,
      brZaduzenja:brZaduzenja
    }

    return this.http.post(`${this.uri}/knjige/vrati_knjigu`,data);
  }
}

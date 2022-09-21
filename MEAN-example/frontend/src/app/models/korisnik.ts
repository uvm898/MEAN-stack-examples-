import { ZaduzenaKnjiga } from "./zaduzena_knjiga";

export class Korisnik{
  korisnicko_ime:string;
  lozinka:string;
  ime:string;
  prezime:string;
  adresa:string;
  telefon:string;
  mejl:string;
  slikaPutanja:string;
  tip:string;
  registrovan:boolean;
  zaduzene_knjige:Array<ZaduzenaKnjiga>;
  istorija:Array<ZaduzenaKnjiga>;
}

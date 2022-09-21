import mongoose from "mongoose";

const Schema = mongoose.Schema

let Korisnik = new Schema(
    {
        korisnicko_ime: { type: String },
        lozinka: { type: String },
        ime: { type: String },
        prezime: { type: String },
        adresa: { type: String },
        telefon: { type: String },
        mejl: { type: String },
        tip: { type: String },
        slikaPutanja: { type: String },
        registrovan: { type: Boolean },
        zaduzene_knjige: { type: Array },
        istorija: { type: Array }

    }
)

export default mongoose.model('KorisnikModel', Korisnik, 'korisnici')
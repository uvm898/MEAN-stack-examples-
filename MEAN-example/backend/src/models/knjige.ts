import mongoose from "mongoose";

const Schema = mongoose.Schema

let Knjiga = new Schema(
    {
        id: { type: String },
        naziv: { type: String },
        autori: { type: String },
        zanrovi: { type: String },
        izdavac: { type: String },
        godina_izdanja: { type: String },
        jezik: { type: String },
        slikaPutanja: { type: String },
        brUzimanja: { type: String },
        ocena:{type:Number},
        kolicina:{type:Number},
        rok:{type:Number},//rok upotrebe knjige
        brZaduzenja:{type:Number},
        komentari: { type: Array }
    }
)


export default mongoose.model('KnjigaModel', Knjiga, 'knjige')
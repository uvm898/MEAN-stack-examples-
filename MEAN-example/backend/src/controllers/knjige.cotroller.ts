import express from 'express'
import KnjigaModel from '../models/knjige'

export class KnjigeController{

    dohvati_knjige = (req:express.Request,res:express.Response)=>{
        KnjigaModel.find({'brUzimanja' : {$not: {$regex : "-1"}}}, (err, knjige) =>{
            if (err) console.log(err);
            else res.json(knjige);
        })
    }

    pretrazi_po_nazivu = (req:express.Request,res:express.Response)=>{
        let naziv = req.body.naziv;
        KnjigaModel.find({'naziv':{$regex:naziv,$options:"i"},'brUzimanja' : {$not: {$regex : "-1"}}},(err,knjige)=>{
            if(err)console.log(err)
            else res.json(knjige)
        })
    }

    pretrazi_po_autorima = (req:express.Request,res:express.Response)=>{
        let autori = req.body.autori
        KnjigaModel.find({'autori':{$regex:autori,$options:"i"},'brUzimanja' : {$not: {$regex : "-1"}}},(err,knjige)=>{
            if(err)console.log(err)
            else res.json(knjige)
        })
    }

    dohvati_knjiguID = (req:express.Request,res:express.Response)=>{
        let id = req.body.id
        KnjigaModel.findOne({'id':id},(err,resp)=>{
            if(err)console.log(err)
            else res.json(resp)
        });
    }

    zaduzi_knjigu = (req:express.Request,res:express.Response)=>{
        let id = req.body.id;
        let kolicina = req.body.kolicina;
        let brUzimanja = req.body.brUzimanja;
        let brZaduzenja = req.body.brZaduzenja;

        kolicina--; brUzimanja++; brZaduzenja++;
        console.log('ovde sam')
        KnjigaModel.updateOne({'id':id},{$set:{'kolicina':kolicina,'brUzimanja':brUzimanja,'brZaduzenja':brZaduzenja}},(err,resp)=>{
            if(err)console.log(err)
            else{
                KnjigaModel.findOne({'id':id},(err,resp1)=>{
                    res.json(resp1);
                })
            }
        })

    }

    vrati_knjigu = (req:express.Request,res:express.Response)=>{
        let id = req.body.id;
        let kolicina = req.body.kolicina;
        let brZaduzenja = req.body.brZaduzenja;
        brZaduzenja--;
        kolicina++;
        KnjigaModel.updateOne({'id':id},{$set:{'kolicina':kolicina,'brZaduzenja':brZaduzenja}},(err,resp)=>{
            if(err)console.log(err)
            else {
                KnjigaModel.findOne({'id':id},(err,knjiga)=>{
                    if(err)console.log(err)
                    else res.json(knjiga)
                })
            }
        })
    }

    registracija_slika = (req:express.Request,res:express.Response)=>{
        console.log('ovde sam')
        let naziv = req.body.naziv;
        let autori = req.body.autori;
        let zanrovi = req.body.zanrovi;
        let izdavac = req.body.izdavac;
        let godina = req.body.godina;
        let jezik = req.body.jezik;
        let brUzimanja = req.body.brUzimanja;

        const url = req.protocol + "://" + req.get("host");
        let slikaPutanja = url + "/images/" + req.file.filename;
        let id = req.body.id;

        let knjiga = new KnjigaModel();

        knjiga.naziv = naziv;
        knjiga.autori = autori;
        knjiga.zanrovi = zanrovi;
        knjiga.izdavac = izdavac;
        knjiga.godina_izdanja = godina;
        knjiga.jezik = jezik;
        knjiga.slikaPutanja = slikaPutanja;
        knjiga.id = id;
        knjiga.brUzimanja = brUzimanja;
        knjiga.kolicina = 1;
        knjiga.brZaduzenja = 0;
        knjiga.rok = 14;
        //knjiga.komentari = null;
        knjiga.ocena = 0;

        knjiga.save((err, resp) => {
            if (err) console.log(err);
            else console.log('Dodat korisnik');
        })
    }

    registracija_bez_slike = (req:express.Request,res:express.Response)=>{
        let naziv = req.body.naziv;
        let autori = req.body.autori;
        let zanrovi = req.body.zanrovi;
        let izdavac = req.body.izdavac;
        let godina = req.body.godina;
        let jezik = req.body.jezik;
        let brUzimanja = req.body.brUzimanja;
        let id = req.body.id;
        

        let knjiga = new KnjigaModel();

        knjiga.naziv = naziv;
        knjiga.autori = autori;
        knjiga.zanrovi = null;
        knjiga.izdavac = izdavac;
        knjiga.godina_izdanja = godina;
        knjiga.jezik = jezik;
        knjiga.brUzimanja = brUzimanja;
        
        knjiga.slikaPutanja = "http://localhost:4000/images/knjiga.jpg";
        knjiga.id = id;
        knjiga.kolicina = 1;
        knjiga.brZaduzenja = 0;
        knjiga.rok = 14;
        //knjiga.komentari = null;
        knjiga.ocena = 0;
        KnjigaModel.insertMany(knjiga,(err,resp)=>{
            if(err)console.log(err)
            else res.json(resp)
        });
    }

}
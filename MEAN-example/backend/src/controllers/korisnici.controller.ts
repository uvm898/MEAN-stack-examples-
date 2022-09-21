import express from 'express'
import KorisnikModel from '../models/korisnici'

export class KorisnikControllers {

    registerSlika = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let lozinka = req.body.lozinka
        let ime = req.body.ime
        let prezime = req.body.prezime
        let adresa = req.body.adresa
        let mejl = req.body.mejl
        let telefon = req.body.telefon
        let tip = req.body.tip
        const url = req.protocol + "://" + req.get('host') + "/images/" + req.file.filename

        let korisnik = new KorisnikModel()


        korisnik.korisnicko_ime = korisnicko_ime
        korisnik.lozinka = lozinka
        korisnik.ime = ime
        korisnik.prezime = prezime
        korisnik.adresa = adresa
        korisnik.mejl = mejl
        korisnik.telefon = telefon
        korisnik.slikaPutanja = url
        korisnik.tip = tip
        korisnik.registrovan = false

        KorisnikModel.insertMany(korisnik).then(() => { res.json({ poruka: 'ok' }) }).catch(err => console.log(err))
    }


    register = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.body.korisnicko_ime
        let lozinka = req.body.lozinka
        let ime = req.body.ime
        let prezime = req.body.prezime
        let adresa = req.body.adresa
        let mejl = req.body.mejl
        let telefon = req.body.telefon
        let tip = req.body.tip
        const url = req.protocol + "://" + req.get('host') + "/images/" + 'default.jpg'

        let korisnik = new KorisnikModel()


        korisnik.korisnicko_ime = korisnicko_ime
        korisnik.lozinka = lozinka
        korisnik.ime = ime
        korisnik.prezime = prezime
        korisnik.adresa = adresa
        korisnik.mejl = mejl
        korisnik.telefon = telefon
        korisnik.slikaPutanja = url
        korisnik.tip = tip
        korisnik.registrovan = false

        KorisnikModel.insertMany(korisnik).then(() => { res.json({ poruka: 'ok' }) }).catch(err => console.log(err))
    }


    postoji_mejl_korisnicko_ime = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let mejl = req.body.mejl

        KorisnikModel.findOne({ 'korisnicko_ime': korisnicko_ime, 'mejl': mejl }, (err, resp) => {
            if (err) console.log(err)
            else if (resp != null) res.json({ poruka: 'postoji' })
            else res.json({ poruka: '' })
        })
    }

    prijava = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let lozinka = req.body.lozinka

        KorisnikModel.findOne({ 'korisnicko_ime': korisnicko_ime, 'lozinka': lozinka, 'registrovan': true }, (err, resp) => {
            if (err) console.log(err)
            else {
                res.json(resp)
            }
        })
    }

    dohvati_korisnika = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let lozinka = req.body.lozinka

        KorisnikModel.findOne({ 'korisnicko_ime': korisnicko_ime, 'lozinka': lozinka }, (err, resp) => {
            if (err) console.log(err)
            else res.json(resp)
        })
    }

    promeni_lozinku = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let lozinka = req.body.lozinka
        let nova_lozinka = req.body.nova_lozinka

        KorisnikModel.updateOne({ 'korisnicko_ime': korisnicko_ime, 'lozinka': lozinka }, { $set: { 'lozinka': nova_lozinka } }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'poruka': 'ok' });
        })
    }

    zaduzi_knjigu = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let datum_zaduzivanja = new Date();
        let datum_vracanja = null;
        let naziv = req.body.naziv;
        let id = req.body.id;
        let autori = req.body.autori;
        let slikaPutanja = req.body.slikaPutanja;

        let zaduzenaknjiga = {
            id: id,
            naziv: naziv,
            autori: autori,
            slikaPutanja: slikaPutanja,
            datum_zaduzivanja: datum_zaduzivanja,
            datum_vracanja: datum_vracanja
        }
        console.log(zaduzenaknjiga.slikaPutanja)
        KorisnikModel.updateOne({ 'korisnicko_ime': korisnicko_ime }, { $push: { 'zaduzene_knjige': zaduzenaknjiga, 'istorija': zaduzenaknjiga } }, (err, resp) => {
            if (err) console.log(err)
            else {
                KorisnikModel.findOne({ 'korisnicko_ime': korisnicko_ime }, (err, resp1) => {
                    console.log(zaduzenaknjiga.datum_zaduzivanja)
                    if (err) console.log(err)
                    else res.json(resp1)
                })
            }
        })
    }

    vrati_knjigu = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let datumVracanja = new Date();
        let id= req.body.id
        let zaduzenaKnjiga = {
            id: req.body.id,
            naziv: req.body.naziv,
            autori: req.body.autori,
            slikaPutanja: req.body.slikaPutanja,
            datum_zaduzivanja: req.body.datum_zaduzivanja,
            datum_vracanja: null
        };

        KorisnikModel.updateOne({'korisnicko_ime' : korisnicko_ime}, {$set : {"istorija.$[elem].datum_vracanja" : datumVracanja}}, {arrayFilters: [{
            "elem.id" : id
        }]},(err,resp)=>{
                                    if(err)console.log(err)
                                    else{
                                        KorisnikModel.updateOne({'korisnicko_ime':korisnicko_ime},
                                                                {$pull:{'zaduzene_knjige':zaduzenaKnjiga}},(err,resp1)=>{
                                                                    if(err)console.log(err)
                                                                    else{
                                                                        KorisnikModel.findOne({'korisnicko_ime':korisnicko_ime},(err,u)=>{
                                                                            if(err)console.log(err)
                                                                            else res.json(u)
                                                                        })
                                                                    }
                                                                })
                                    }
                                })
    }

}
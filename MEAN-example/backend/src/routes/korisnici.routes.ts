import express from 'express'
import { KorisnikControllers } from '../controllers/korisnici.controller'
import multer from 'multer';


const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid Mime Type");
        if (isValid) {
            error = null;
        }
        cb(error, "./images");
        
    },
    filename: (req, file, cb) => {
        //const name = file.originalname.toLowerCase().split(' ').join('_');
        const ext = MIME_TYPE_MAP[file.mimetype];
        //cb(null, name+ '-'+ Date.now()+ '.'+ ext); 
        cb(null, req.body.korisnicko_ime + '.' + ext);
    }
});


const korisnikRouter = express.Router()

korisnikRouter.route('/registracijaSlika').post(multer({storage:storage}).single('slika'),
    (req,res)=> new KorisnikControllers().registerSlika(req,res)
)

korisnikRouter.route('/registracija').post(
    (req,res)=> new KorisnikControllers().register(req,res)
)

korisnikRouter.route('/postoji_mejl_korisnicko_ime').post(
    (req,res)=> new KorisnikControllers().postoji_mejl_korisnicko_ime(req,res)
)

korisnikRouter.route('/prijava').post(
    (req,res)=> new KorisnikControllers().prijava(req,res)
)

korisnikRouter.route('/zaduzi_knjigu').post(
    (req,res)=> new KorisnikControllers().zaduzi_knjigu(req,res)
)

korisnikRouter.route('/vrati_knjigu').post(
    (req,res)=> new KorisnikControllers().vrati_knjigu(req,res)
)

korisnikRouter.route('/dohvati_korisnika').post(
    (req,res)=> new KorisnikControllers().dohvati_korisnika(req,res)
)

korisnikRouter.route('/promeni_lozinku').post(
    (req,res)=> new KorisnikControllers().promeni_lozinku(req,res)
)


export default korisnikRouter
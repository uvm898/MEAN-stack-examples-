import express from 'express'
import multer from 'multer';
import { KnjigeController } from '../controllers/knjige.cotroller'


const knjigeRouter = express.Router()

const MIME_TYPE_MAP = { 
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage2 = multer.diskStorage({
    destination:(req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid Mime Type");  
        if(isValid){  
            error = null;
        }  
        cb(error, "./images");
    },

    filename:(req,file,cb) => {
        console.log('ovde sam')
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, '_'+ req.body.id + '.' + ext);
    }
});

knjigeRouter.route('/registracija_slika').post(multer({storage : storage2}).single("slika"),
    (req, res) => new KnjigeController().registracija_slika(req,res)
)

knjigeRouter.route('/registracija_bez_slike').post(
    (req, res) => new KnjigeController().registracija_bez_slike(req, res)
)

knjigeRouter.route('/dohvati_knjige').get(
    (req,res)=> new KnjigeController().dohvati_knjige(req,res)
)


knjigeRouter.route('/pretrazi_po_nazivu').post(
    (req,res)=> new KnjigeController().pretrazi_po_nazivu(req,res)
)

knjigeRouter.route('/pretrazi_po_autorima').post(
    (req,res)=> new KnjigeController().pretrazi_po_autorima(req,res)
)

knjigeRouter.route('/dohvati_knjiguID').post(
    (req,res)=> new KnjigeController().dohvati_knjiguID(req,res)
)

knjigeRouter.route('/zaduzi_knjigu').post(
    (req,res)=> new KnjigeController().zaduzi_knjigu(req,res)
)

knjigeRouter.route('/vrati_knjigu').post(
    (req,res)=> new KnjigeController().vrati_knjigu(req,res)
)



export default knjigeRouter
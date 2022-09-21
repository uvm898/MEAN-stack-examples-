import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import path from 'path';
import korisnikRouter from './routes/korisnici.routes';
import knjigeRouter from './routes/knjige.routes';
const app = express();
app.use(cors())
app.use(express.json())
app.use("/images", express.static(path.join("./images")));  

mongoose.connect("mongodb://localhost:27017/Projekat")
const connection = mongoose.connection
connection.once('open',()=>{
    console.log('mongo ok')
})



const router =express.Router()
router.use('/korisnici',korisnikRouter)
router.use('/knjige',knjigeRouter)


app.use('/',router)
app.listen(4000, () => console.log(`Express server running on port 4000`));
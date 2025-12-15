import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();


export default function conexion(){
mongoose.connect(process.env.MONGOURI)
.then(()=>{
    console.log('conenctado a MONGO')
})
.catch((err)=>{
    console.log('error al conectarnos a MONGO',err)
})}
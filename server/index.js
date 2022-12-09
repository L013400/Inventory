import express from 'express'
import apiRouter from './routes/index.js'
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from 'url'

dotenv.config()
const app = new express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', apiRouter)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})

const IS_PROD = process.env.ENVIRONMENT === "prod" ? true : false
if(IS_PROD){
    const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const buildPath = path.join(_dirname,'../client/build')
app.use(express.static(buildPath))

app.get('*',(req,res)=>{
    res.sendFile(buildPath +'/index.html')
})
    
}
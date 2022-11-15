import express from 'express'
import apiRouter from './routes/index.js'
import dotenv from "dotenv"

dotenv.config()
const app = new express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', apiRouter)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})
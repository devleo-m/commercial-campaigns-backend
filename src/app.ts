import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
app.use(express.json())
app.use(cors())

dotenv.config()
const PORT = process.env.PORT

app.get("/", async (req, res) =>{
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`Server running web http://localhost:${PORT}`)
})
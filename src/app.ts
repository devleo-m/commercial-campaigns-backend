import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'
import { authRouter } from './http/routes/authRoutes'
import { userRouter } from './http/routes/usersRoutes'

const app = express()
app.use(express.json())
app.use(cors())

dotenv.config()
const PORT = process.env.PORT

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/auth', authRouter)
app.use('/', userRouter)

app.get('/', async (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Server running web http://localhost:${PORT}`)
})
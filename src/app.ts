import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'
import { authRouter } from './http/routes/authRoutes'
import { userRouter } from './http/routes/usersRoutes'
import { advertiserCommercialsRouter } from './http/routes/advertiserCommercialsRoutes'

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

dotenv.config()
const PORT = process.env.PORT

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/auth', authRouter)
app.use('/', userRouter)
app.use('/', advertiserCommercialsRouter)

app.listen(PORT, () => {
    console.log(`Server running web http://localhost:${PORT}`)
})

export { app }
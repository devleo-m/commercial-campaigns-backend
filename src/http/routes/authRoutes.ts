import { Router } from 'express'
import { AuthController } from '../controllers'

const authRouter = Router()

authRouter.post('/login', AuthController.login)

export { authRouter }
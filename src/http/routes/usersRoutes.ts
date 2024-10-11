import { Router } from 'express'
import { verifyJwt } from '../middleware/verify-jwt'
import { UserController } from '../controllers'

const userRouter = Router()

userRouter.post('/users', verifyJwt, UserController.createUser)
userRouter.get('/users', verifyJwt, UserController.getAllUsers)
userRouter.get('/users/:id', verifyJwt, UserController.getByIdUser)
userRouter.get('/users/:id', verifyJwt, UserController.getByIdUserAuth)
userRouter.patch('/users/:id', verifyJwt, UserController.updateUser)
userRouter.delete('/users/:id', verifyJwt, UserController.deleteUser)

export { userRouter }
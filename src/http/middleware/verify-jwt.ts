import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UnauthorizedError } from '../../utils/error/errors'
import { UserRepositoryDatabase } from '../../repositories/postgres'
import dotenv from 'dotenv'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export const verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers.authorization

        if (!authToken) {
            throw new UnauthorizedError('Token is missing!')
        }

        const [type, token] = authToken.split(' ')

        if (type !== 'Bearer') {
            throw new UnauthorizedError('Invalid token format!')
        }

        const user = await verifyUser(token)

        if (!user) {
            throw new UnauthorizedError('Unauthorized!')
        }

        req['authUser'] = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        next()
    } catch (err) {
        next(err)
    }
}

const verifyUser = async (token: string) => {
    const userRepository = new UserRepositoryDatabase()

    const decoded: any = verify(token, JWT_SECRET)

    if (!decoded.sub) {
        return null
    }

    const user = await userRepository.getById({ id: decoded.sub })

    if (!user) {
        return null
    }

    return user
}
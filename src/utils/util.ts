import { Request } from 'express'
import { IAuthUser } from './interfaces'

export const getAuthUser = (request: Request): IAuthUser => {
    return {
        id: request['authUser'].id,
        name: request['authUser'].name,
        email: request['authUser'].email
    }
}
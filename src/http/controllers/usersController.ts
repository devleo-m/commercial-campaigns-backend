import { NextFunction, Request, Response } from 'express'
import { makeCreateUser } from '../../use-cases/users/factories/makeCreateUser'
import { makeGetAllUsers } from '../../use-cases/users/factories/makeGetAllUsers'
import { makeGetByIdUsers } from '../../use-cases/users/factories/makeGetByIdUsers'
import { makeUpdateUser } from '../../use-cases/users/factories/makeUpdateUsers'
import { makeDeleteUser } from '../../use-cases/users/factories/makeDeleteUsers'
import { getAuthUser } from '../../utils/util'
import { z } from 'zod'

export class UserController {
    static async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const requestBodySchema = z.object({
                user: z.object({
                    name: z.string().min(3),
                    email: z.string().email(),
                    password: z.string().min(6)
                })
            })
            const body = requestBodySchema.parse(req.body)

            const createUser = makeCreateUser()

            const userData = await createUser.execute(body.user)

            return res.status(201).json({ data: userData })
        } catch (error) {
            next(error)
        }
    }

    static async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const getAllUsers = makeGetAllUsers()

            const allUsers = await getAllUsers.execute()

            return res.status(200).json({ data: allUsers })
        } catch (error) {
            next(error)
        }
    }

    static async getByIdUser(req: Request, res: Response, next: NextFunction) {
        try {
            const requestParamSchema = z.object({
                id: z.coerce.number()
            })

            const params = requestParamSchema.parse(req.params)

            const getByIdUser = makeGetByIdUsers()

            const byIdUser = await getByIdUser.execute(params.id)

            return res.status(200).json({ data: byIdUser })
        } catch (error) {
            next(error)
        }
    }

    static async getByIdUserAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const requestParamSchema = z.object({
                id: z.coerce.number()
            })

            const authUser = getAuthUser(req)

            const params = requestParamSchema.parse(authUser)

            const getByIdUser = makeGetByIdUsers()

            const byIdUser = await getByIdUser.execute(params.id)

            return res.status(200).json({ data: byIdUser })
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const requestParamSchema = z.object({
                id: z.coerce.number()
            })

            const requestBodySchema = z.object({
                user: z.object({
                    name: z.string().min(3),
                    email: z.string().email(),
                    password: z.string().min(6)
                })
            })
            const params = requestParamSchema.parse(req.params)
            const body = requestBodySchema.parse(req.body)

            if (Object.keys(body).length === 0) {
                return res.status(400).json({ error: { message: 'No data to update!' } })
            }

            const updateUser = makeUpdateUser()

            const updated = await updateUser.execute(params.id, body.user)

            return res.status(200).json({ data: updated })
        } catch (error) {
            next(error)
        }
    }

    static async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const requestParamSchema = z.object({
                id: z.coerce.number()
            })

            const params = requestParamSchema.parse(req.params)

            const deleteUser = makeDeleteUser()

            const deleted = await deleteUser.execute(params.id)

            return res.status(200).json({ data: deleted })
        } catch (error) {
            next(error)
        }
    }
}
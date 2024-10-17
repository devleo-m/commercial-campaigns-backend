import { NextFunction, Request, Response } from 'express'
import { makeCreateAdvertiserCommercials } from '../../use-cases/advertiserCommercials/factories/makeCreateAdvertiserCommercials'
import { makeGetAllAdvertiserCommercials } from '../../use-cases/advertiserCommercials/factories/makeGetAllAdvertiserCommercials'
import { makeGetByIdAdvertiserCommercials } from '../../use-cases/advertiserCommercials/factories/makeGetByIdAdvertiserCommercials'
import { makeUpdateAdvertiserCommercials } from '../../use-cases/advertiserCommercials/factories/makeUpdateAdvertiserCommercials'
import { makeDeleteAdvertiserCommercials } from '../../use-cases/advertiserCommercials/factories/makeDeleteAdvertiserCommercials'
import { z } from 'zod'

export class AdvertiserCommercialsController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const requestBodySchema = z.object({
                name: z.string().min(3),
                color: z.string().min(3),
                userId: z.coerce.number()
            })

            const body = requestBodySchema.parse(req.body)

            const createAdvertiserCommercials = makeCreateAdvertiserCommercials()

            const advertiserCommercials = await createAdvertiserCommercials.execute(body)

            return res.status(201).json({ data: advertiserCommercials })
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const getAllAdvertiserCommercials = makeGetAllAdvertiserCommercials()

            const advertiserCommercials = await getAllAdvertiserCommercials.execute()

            return res.status(200).json({ data: advertiserCommercials })
        } catch (error) {
            next(error)
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const requestParamSchema = z.object({
                id: z.coerce.number()
            })

            const params = requestParamSchema.parse(req.params)

            const getByIdAdvertiserCommercials = makeGetByIdAdvertiserCommercials()

            const advertiserCommercials = await getByIdAdvertiserCommercials.execute(params.id)

            return res.status(200).json({ data: advertiserCommercials })
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const requestParamSchema = z.object({
                id: z.coerce.number()
            })

            const requestBodySchema = z.object({
                name: z.string().min(3).optional(),
                color: z.string().min(3).optional(),
                userId: z.coerce.number().optional()
            })

            const params = requestParamSchema.parse(req.params)
            const body = requestBodySchema.parse(req.body)

            if (Object.keys(body).length === 0) {
                return res.status(400).json({ error: { message: 'No data to update!' } })
            }

            const updateAdvertiserCommercials = makeUpdateAdvertiserCommercials()

            const updated = await updateAdvertiserCommercials.execute(params.id, body)

            return res.status(200).json({ data: updated })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const requestParamSchema = z.object({
                id: z.coerce.number()
            })

            const params = requestParamSchema.parse(req.params)

            const deleteAdvertiserCommercials = makeDeleteAdvertiserCommercials()

            await deleteAdvertiserCommercials.execute(params.id)

            return res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}
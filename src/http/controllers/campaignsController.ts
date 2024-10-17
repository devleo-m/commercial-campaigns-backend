import { NextFunction, Request, Response } from 'express'
import { makeCreateCampaigns } from '../../use-cases/campaigns/factories/makeCreateCampaigns'
import { makeGetAllCampaigns } from '../../use-cases/campaigns/factories/makeGetAllCampaigns'
import { makeGetByIdCampaigns } from '../../use-cases/campaigns/factories/makeGetByIdCampaigns'
import { makeUpdateCampaigns } from '../../use-cases/campaigns/factories/makeUpdateCampaigns'
import { makeDeleteCampaigns } from '../../use-cases/campaigns/factories/makeDeleteCampaigns'
import { z } from "zod"

export class CampaignsController {
    static async createCampaign(req: Request, res: Response, next: NextFunction) {
        try {
            const requestBodySchema = z.object({
                name: z.string().min(3),
                startDate: z.string().transform((val) => new Date(val)),
                endDate: z.string().transform((val) => new Date(val)),
                userId: z.coerce.number()
            })
            const body = requestBodySchema.parse(req.body)

            const createCampaign = makeCreateCampaigns()

            const campaign = await createCampaign.execute(body)

            return res.status(201).json({ data: campaign })
        } catch (error) {
            next(error)
        }
    }

    static async getAllCampaigns(req: Request, res: Response, next: NextFunction) {
        try {
            const getAllCampaigns = makeGetAllCampaigns()

            const allCampaigns = await getAllCampaigns.execute()

            return res.status(200).json({ data: allCampaigns })
        } catch (error) {
            next(error)
        }
    }

    static async getByIdCampaign(req: Request, res: Response, next: NextFunction) {
        try {
            const requestParamSchema = z.object({
                id: z.coerce.number()
            })

            const params = requestParamSchema.parse(req.params)

            const getByIdCampaign = makeGetByIdCampaigns()

            const byIdCampaign = await getByIdCampaign.execute(params.id)

            return res.status(200).json({ data: byIdCampaign })
        } catch (error) {
            next(error)
        }
    }

    static async updateCampaign(req: Request, res: Response, next: NextFunction) {
        try {
            const requestParamSchema = z.object({
                id: z.coerce.number()
            })

            const requestBodySchema = z.object({
                name: z.string().min(3).optional(),
                startDate: z.string().transform((val) => new Date(val)).optional(),
                endDate: z.string().transform((val) => new Date(val)).optional(),
                userId: z.coerce.number().optional()
            })

            const params = requestParamSchema.parse(req.params)
            const body = requestBodySchema.parse(req.body)

            console.log("ID capturado:", req.params.id);

            if (Object.keys(body).length === 0) {
                return res.status(400).json({ error: { message: 'No data to update!' } })
            }

            const updateCampaign = makeUpdateCampaigns()

            const updated = await updateCampaign.execute(params.id, body)            

            return res.status(200).json({ data: updated })
        } catch (error) {
            next(error)
        }
    }

    static async deleteCampaign(req: Request, res: Response, next: NextFunction) {
        try {
            const requestParamSchema = z.object({
                id: z.coerce.number()
            })

            const params = requestParamSchema.parse(req.params)

            const deleteCampaign = makeDeleteCampaigns()

            await deleteCampaign.execute(params.id)

            return res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}
import { NextFunction, Request, Response } from 'express'
import { makeCreateAdvertiserCommercialCampaignAssociations } from '../../use-cases/advertiserCommercialCampaignAssociations/factories/makeCreateAdvertiserCommercialCampaignAssociations'
import { makeDeleteAdvertiserCommercialCampaignAssociations } from '../../use-cases/advertiserCommercialCampaignAssociations/factories/makeDeleteAdvertiserCommercialCampaignAssociations'
import { makeGetAllAdvertiserCommercialCampaignAssociations } from '../../use-cases/advertiserCommercialCampaignAssociations/factories/makeGetAllAdvertiserCommercialCampaignAssociations'
import { makeGetByIdAdvertiserCommercialCampaignAssociations } from '../../use-cases/advertiserCommercialCampaignAssociations/factories/makeGetByIdAdvertiserCommercialCampaignAssociations'
import { makeUpdateAdvertiserCommercialCampaignAssociations } from '../../use-cases/advertiserCommercialCampaignAssociations/factories/makeUpdateAdvertiserCommercialCampaignAssociations'
import { z } from 'zod'

export class AdvertiserCommercialCampaignAssociationsController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const requestBodySchema = z.object({
                campaignId: z.coerce.number(),
                commercialId: z.coerce.number(),
                startDate: z.string().transform((val) => new Date(val)),
                endDate: z.string().transform((val) => new Date(val)),
            })

            const body = requestBodySchema.parse(req.body)

            const createAdvertiserCommercialCampaignAssociations = makeCreateAdvertiserCommercialCampaignAssociations()

            const association = await createAdvertiserCommercialCampaignAssociations.execute(body)

            return res.status(201).json({ data: association })
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const getAllAdvertiserCommercialCampaignAssociations = makeGetAllAdvertiserCommercialCampaignAssociations()

            const associations = await getAllAdvertiserCommercialCampaignAssociations.execute()

            return res.status(200).json({ data: associations })
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

            const getByIdAdvertiserCommercialCampaignAssociations = makeGetByIdAdvertiserCommercialCampaignAssociations()

            const association = await getByIdAdvertiserCommercialCampaignAssociations.execute(params.id)

            return res.status(200).json({ data: association })
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
                campaignId: z.coerce.number().optional(),
                commercialId: z.coerce.number().optional(),
                startDate: z.string().transform((val) => new Date(val)).optional(),
                endDate: z.string().transform((val) => new Date(val)).optional(),
            })

            const params = requestParamSchema.parse(req.params)
            const body = requestBodySchema.parse(req.body)

            if (Object.keys(body).length === 0) {
                return res.status(400).json({ error: { message: 'No data to update!' } })
            }

            const updateAdvertiserCommercialCampaignAssociations = makeUpdateAdvertiserCommercialCampaignAssociations()

            const updated = await updateAdvertiserCommercialCampaignAssociations.execute(params.id, body)

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

            const deleteAdvertiserCommercialCampaignAssociations = makeDeleteAdvertiserCommercialCampaignAssociations()

            await deleteAdvertiserCommercialCampaignAssociations.execute(params.id)

            return res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}
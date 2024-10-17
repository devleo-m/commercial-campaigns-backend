import { CreateAdvertiserCommercialsDto, IAdvertiserCommercialsRepository, UpdateAdvertiserCommercialsDto } from '../interfaces'
import { IAdvertiserCommercials } from 'commercial-campaigns-db/src/interface'
import { AdvertiserCommercials } from 'commercial-campaigns-db/src/models'

export class AdvertiserCommercialsRepositoryDatabase implements IAdvertiserCommercialsRepository {

    async create(advertiserCommercialData: CreateAdvertiserCommercialsDto): Promise<IAdvertiserCommercials> {
        return await AdvertiserCommercials.create({ ...advertiserCommercialData })
    }

    async getAll(where: object, orderBy: any[]): Promise<IAdvertiserCommercials[]> {
        return await AdvertiserCommercials.findAll({ raw: true, where: { ...where }, order: orderBy })
    }

    async getById(id: number): Promise<IAdvertiserCommercials | null> {
        return await AdvertiserCommercials.findOne({ raw: true, where: { id } })
    }

    async update(id: number, advertiserCommercial: UpdateAdvertiserCommercialsDto): Promise<IAdvertiserCommercials> {
        const [, [updateAdvertiserCommercials]] = await AdvertiserCommercials.update(advertiserCommercial,
            {
                where: { id },
                returning: true
            }
        )
        return updateAdvertiserCommercials
    }

    async delete(id: number): Promise<boolean> {
        return !!await AdvertiserCommercials.destroy({ where: { id } })
    }
}
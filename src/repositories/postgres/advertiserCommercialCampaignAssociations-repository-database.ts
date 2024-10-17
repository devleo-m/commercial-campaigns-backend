import { CreateAdvertiserCommercialCampaignAssociationsDto, IAdvertiserCommercialCampaignAssociationsRepository, UpdateAdvertiserCommercialCampaignAssociationsDto } from '../interfaces'
import { IAdvertiserCommercialCampaignAssociations } from 'commercial-campaigns-db/src/interface'
import { AdvertiserCommercialCampaignAssociations } from 'commercial-campaigns-db/src/models'

export class AdvertiserCommercialCampaignAssociationsRepositoryDatabase implements IAdvertiserCommercialCampaignAssociationsRepository {

    async create(advertiserCommercialCampaignAssociations: CreateAdvertiserCommercialCampaignAssociationsDto): Promise<IAdvertiserCommercialCampaignAssociations> {
        return await AdvertiserCommercialCampaignAssociations.create({ ...advertiserCommercialCampaignAssociations })
    }

    async getAll(where: object, orderBy: any[]): Promise<IAdvertiserCommercialCampaignAssociations[]> {
        return await AdvertiserCommercialCampaignAssociations.findAll({ raw: true, where: { ...where }, order: orderBy })
    }

    async getById(id: number): Promise<IAdvertiserCommercialCampaignAssociations | null> {
        return await AdvertiserCommercialCampaignAssociations.findOne({ raw: true, where: { id } })
    }

    async update(id: number, advertiserCommercialCampaignAssociations: UpdateAdvertiserCommercialCampaignAssociationsDto): Promise<IAdvertiserCommercialCampaignAssociations> {
        const [, [updatedAdvertiserCommercialCampaignAssociations]] = await AdvertiserCommercialCampaignAssociations.update(advertiserCommercialCampaignAssociations, {
            where: { id },
            returning: true
        })

        return updatedAdvertiserCommercialCampaignAssociations
    }

    async delete(id: number): Promise<boolean> {
        return !!await AdvertiserCommercialCampaignAssociations.destroy({ where: { id } })
    }
}
import { CreateAdvertiserCommercialCampaignAssociationsDto, IAdvertiserCommercialCampaignAssociationsRepository, UpdateAdvertiserCommercialCampaignAssociationsDto } from '../interfaces'
import { IAdvertiserCommercialCampaignAssociations } from 'commercial-campaigns-db/out/interface'
import { AdvertiserCommercialCampaignAssociations } from 'commercial-campaigns-db/out/models'
import { Transaction } from 'sequelize'

export class AdvertiserCommercialCampaignAssociationsRepositoryDatabase implements IAdvertiserCommercialCampaignAssociationsRepository {

    async create(advertiserCommercialCampaignAssociations: CreateAdvertiserCommercialCampaignAssociationsDto, transaction?: Transaction): Promise<IAdvertiserCommercialCampaignAssociations> {
        const transactionOptions = transaction ? { transaction } : {}
        return await AdvertiserCommercialCampaignAssociations.create({ ...advertiserCommercialCampaignAssociations }, { ...transactionOptions })
    }

    async getAll(where: object, orderBy: any[]): Promise<IAdvertiserCommercialCampaignAssociations[]> {
        return await AdvertiserCommercialCampaignAssociations.findAll({ raw: true, where: { ...where }, order: orderBy })
    }

    async getById(id: number): Promise<IAdvertiserCommercialCampaignAssociations | null> {
        return await AdvertiserCommercialCampaignAssociations.findOne({ raw: true, where: { id } })
    }

    async update(id: number, advertiserCommercialCampaignAssociations: UpdateAdvertiserCommercialCampaignAssociationsDto, transaction?: Transaction): Promise<IAdvertiserCommercialCampaignAssociations> {
        const [, [updatedAdvertiserCommercialCampaignAssociations]] = await AdvertiserCommercialCampaignAssociations.update(advertiserCommercialCampaignAssociations, {
            where: { id },
            returning: true,
            transaction
        })

        return updatedAdvertiserCommercialCampaignAssociations
    }

    async delete(id: number, transaction?: Transaction): Promise<boolean> {
        return !!await AdvertiserCommercialCampaignAssociations.destroy({ where: { id }, transaction })
    }
}
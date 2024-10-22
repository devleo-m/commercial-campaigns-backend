import { IAdvertiserCommercialCampaignAssociations } from "commercial-campaigns-db/out/interface"
import { Transaction } from 'sequelize'

export interface CreateAdvertiserCommercialCampaignAssociationsDto {
    campaignId: number
    commercialId: number
    startDate: Date
    endDate: Date
}

export interface UpdateAdvertiserCommercialCampaignAssociationsDto {
    campaignId?: number
    commercialId?: number
    startDate?: Date
    endDate?: Date
}

export interface IAdvertiserCommercialCampaignAssociationsRepository{
    create(advertiserCommercialCampaignAssociations: CreateAdvertiserCommercialCampaignAssociationsDto, transaction?: Transaction): Promise<IAdvertiserCommercialCampaignAssociations>
    getAll(where: object, orderBy: any[]): Promise<IAdvertiserCommercialCampaignAssociations[]>
    getById(id: number): Promise<IAdvertiserCommercialCampaignAssociations | null>
    update(id: number, advertiserCommercialCampaignAssociations: UpdateAdvertiserCommercialCampaignAssociationsDto, transaction?: Transaction): Promise<IAdvertiserCommercialCampaignAssociations>
    delete(id: number, transaction?: Transaction): Promise<boolean>
}
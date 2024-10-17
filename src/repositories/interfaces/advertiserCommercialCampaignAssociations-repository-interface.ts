import { IAdvertiserCommercialCampaignAssociations } from "commercial-campaigns-db/out/interface"

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
    create(advertiserCommercialCampaignAssociations: CreateAdvertiserCommercialCampaignAssociationsDto): Promise<IAdvertiserCommercialCampaignAssociations>
    getAll(where: object, orderBy: any[]): Promise<IAdvertiserCommercialCampaignAssociations[]>
    getById(id: number): Promise<IAdvertiserCommercialCampaignAssociations | null>
    update(id: number, advertiserCommercialCampaignAssociations: UpdateAdvertiserCommercialCampaignAssociationsDto): Promise<IAdvertiserCommercialCampaignAssociations>
    delete(id: number): Promise<boolean>
}
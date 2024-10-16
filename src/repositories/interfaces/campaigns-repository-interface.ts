import { ICampaigns } from 'commercial-campaigns-db/out/interface'

export interface CreateCampaignDto {
    name: string
    startDate: Date
    endDate: Date
    userId: number
}

export interface UpdateCampaignDto{
    name?: string
    startDate?: Date
    endDate?: Date
    userId?: number
}
export interface ICampaignsRepository {
    create(campaignData: CreateCampaignDto): Promise<ICampaigns>
    getAll(where: object, orderBy: any[]): Promise<ICampaigns[]>
    getById(id: number): Promise<ICampaigns | null>
    update(id: number, campaignData: UpdateCampaignDto): Promise<ICampaigns>
    delete(id: number): Promise<boolean>
}
import { CreateCampaignDto, ICampaignsRepository, UpdateCampaignDto } from "../interfaces";
import { ICampaigns } from "commercial-campaigns-db/src/interface";
import { Campaigns } from "commercial-campaigns-db/src/models";

export class CampaignsRepositoryDatabase implements ICampaignsRepository {
    async create(campaignData: CreateCampaignDto): Promise<ICampaigns> {
        return await Campaigns.create({ ...campaignData })
    }

    async getAll(where: object, orderBy: any[]): Promise<ICampaigns[]> {
        return await Campaigns.findAll({ raw: true, where: { ...where }, order: orderBy })
    }

    async getById(id: number): Promise<ICampaigns | null> {
        return await Campaigns.findOne({ raw: true, where: { id } })
    }

    async update(id: number, campaignData: UpdateCampaignDto): Promise<ICampaigns> {
        const [, [updateCampaign]] = await Campaigns.update(Campaigns,
            {
                where: { id },
                returning: true
            }
        )

        return updateCampaign    }

    async delete(id: number): Promise<boolean> {
        return !!await Campaigns.destroy({ where: { id } })
    }
}
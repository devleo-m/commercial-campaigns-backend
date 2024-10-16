import { CampaignsRepositoryDatabase } from "../../../repositories/postgres"
import { GetByIdCampaignUseCase } from "../getByIdCampaigns"

export const makeGetByIdCampaigns = () => {
    const campaignRepository = new CampaignsRepositoryDatabase()
    return new GetByIdCampaignUseCase(campaignRepository)
}
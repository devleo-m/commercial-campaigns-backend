import { CampaignsRepositoryDatabase } from "../../../repositories/postgres"
import { GetAllCampaignUseCase } from "../getAllCampaigns"

export const makeGetAllCampaigns = () => {
    const campaignRepository = new CampaignsRepositoryDatabase()
    return new GetAllCampaignUseCase(campaignRepository)
}
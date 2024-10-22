import { CampaignsRepositoryDatabase } from "../../../repositories/postgres"
import { DeleteCampaignUseCase } from "../deleteCampaigns"

export const makeDeleteCampaigns = () => {
    const campaignRepository = new CampaignsRepositoryDatabase()
    return new DeleteCampaignUseCase(campaignRepository)
}
import { CampaignsRepositoryDatabase } from "../../../repositories/postgres"
import { UserRepositoryDatabase } from "../../../repositories/postgres"
import { UpdateCampaignUseCase } from "../updateCampaigns"

export const makeUpdateCampaigns = () => {
    const userRepository = new UserRepositoryDatabase()
    const campaignRepository = new CampaignsRepositoryDatabase()
    return new UpdateCampaignUseCase(userRepository, campaignRepository)
}
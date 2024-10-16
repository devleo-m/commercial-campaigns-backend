import { UserRepositoryDatabase } from "../../../repositories/postgres";
import { CampaignsRepositoryDatabase } from "../../../repositories/postgres";
import { CreateCampaignUseCase } from "../createCampaigns";

export const makeCreateCampaigns = () => {
    const userRepository = new UserRepositoryDatabase();
    const campaignRepository = new CampaignsRepositoryDatabase()
    return new CreateCampaignUseCase(userRepository, campaignRepository)
}
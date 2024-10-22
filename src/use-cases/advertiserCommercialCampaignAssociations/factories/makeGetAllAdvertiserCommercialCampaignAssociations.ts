import { AdvertiserCommercialCampaignAssociationsRepositoryDatabase } from "../../../repositories/postgres";
import { GetAllAdvertiserCommercialCampaignAssociationsUseCase } from "../getAllAdvertiserCommercialCampaignAssociations";

export const makeGetAllAdvertiserCommercialCampaignAssociations = () => {
    const advertiserCommercialCampaignAssociationsRepository = new AdvertiserCommercialCampaignAssociationsRepositoryDatabase()
    return new GetAllAdvertiserCommercialCampaignAssociationsUseCase(advertiserCommercialCampaignAssociationsRepository)
}
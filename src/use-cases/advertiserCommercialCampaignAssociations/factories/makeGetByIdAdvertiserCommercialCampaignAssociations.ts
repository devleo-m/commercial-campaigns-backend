import { AdvertiserCommercialCampaignAssociationsRepositoryDatabase } from "../../../repositories/postgres";
import { GetByIdAdvertiserCommercialCampaignAssociationsUseCase } from "../getByIdAdvertiserCommercialCampaignAssociations";

export const makeGetByIdAdvertiserCommercialCampaignAssociations = () => {
    const advertiserCommercialCampaignAssociationsRepository = new AdvertiserCommercialCampaignAssociationsRepositoryDatabase()
    return new GetByIdAdvertiserCommercialCampaignAssociationsUseCase(advertiserCommercialCampaignAssociationsRepository)
}
import { AdvertiserCommercialCampaignAssociationsRepositoryDatabase } from "../../../repositories/postgres";
import { DeleteAdvertiserCommercialCampaignAssociations } from "../deleteAdvertiserCommercialCampaignAssociations";

export const makeDeleteAdvertiserCommercialCampaignAssociations = () => {
    const advertiserCommercialCampaignAssociationsRepository = new AdvertiserCommercialCampaignAssociationsRepositoryDatabase()
    return new DeleteAdvertiserCommercialCampaignAssociations(advertiserCommercialCampaignAssociationsRepository)
}
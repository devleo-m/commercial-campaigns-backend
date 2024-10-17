import { AdvertiserCommercialsRepositoryDatabase } from "../../../repositories/postgres";
import { AdvertiserCommercialCampaignAssociationsRepositoryDatabase } from "../../../repositories/postgres";
import { CampaignsRepositoryDatabase } from "../../../repositories/postgres";
import { UpdateAdvertiserCommercialCampaignAssociationsUseCase } from "../updateAdvertiserCommercialCampaignAssociations";

export const makeUpdateAdvertiserCommercialCampaignAssociations = () => {
    const advertiserCommercialsRepository = new AdvertiserCommercialsRepositoryDatabase()
    const campaignRepository = new CampaignsRepositoryDatabase()
    const advertiserCommercialCampaignAssociationsRepository = new AdvertiserCommercialCampaignAssociationsRepositoryDatabase()
    return new UpdateAdvertiserCommercialCampaignAssociationsUseCase(advertiserCommercialCampaignAssociationsRepository, campaignRepository, advertiserCommercialsRepository)
}
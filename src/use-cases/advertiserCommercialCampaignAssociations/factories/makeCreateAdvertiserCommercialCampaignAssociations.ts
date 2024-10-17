import { AdvertiserCommercialsRepositoryDatabase } from "../../../repositories/postgres";
import { AdvertiserCommercialCampaignAssociationsRepositoryDatabase } from "../../../repositories/postgres";
import { CampaignsRepositoryDatabase } from "../../../repositories/postgres";
import { CreateAdvertiserCommercialCampaignAssociationsUseCase } from "../createAdvertiserCommercialCampaignAssociations";

export const makeCreateAdvertiserCommercialCampaignAssociations = () => {
    const advertiserCommercialsRepository = new AdvertiserCommercialsRepositoryDatabase()
    const campaignRepository = new CampaignsRepositoryDatabase()
    const advertiserCommercialCampaignAssociationsRepository = new AdvertiserCommercialCampaignAssociationsRepositoryDatabase()
    return new CreateAdvertiserCommercialCampaignAssociationsUseCase(advertiserCommercialCampaignAssociationsRepository, campaignRepository, advertiserCommercialsRepository)
}
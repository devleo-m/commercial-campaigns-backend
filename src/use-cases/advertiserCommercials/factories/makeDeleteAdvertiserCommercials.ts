import { AdvertiserCommercialsRepositoryDatabase } from "../../../repositories/postgres";
import { DeleteAdvertiserCommercialsUseCase } from "../deleteAdvertiserCommercials";
export const makeDeleteAdvertiserCommercials = () => {
    const advertiserCommercialRepository = new AdvertiserCommercialsRepositoryDatabase()
    return new DeleteAdvertiserCommercialsUseCase(advertiserCommercialRepository)
}
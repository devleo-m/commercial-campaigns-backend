import { AdvertiserCommercialsRepositoryDatabase } from "../../../repositories/postgres";
import { GetAllAdvertiserCommercialsUseCase } from "../getAllAdvertiserCommercials";
export const makeGetAllAdvertiserCommercials = () => {
    const advertiserCommercialRepository = new AdvertiserCommercialsRepositoryDatabase()
    return new GetAllAdvertiserCommercialsUseCase(advertiserCommercialRepository)
}
import { AdvertiserCommercialsRepositoryDatabase } from "../../../repositories/postgres";
import { GetByIdAdvertiserCommercialsUseCase } from "../getByIdAdvertiserCommercials";
export const makeGetByIdAdvertiserCommercials = () => {
    const advertiserCommercialRepository = new AdvertiserCommercialsRepositoryDatabase()
    return new GetByIdAdvertiserCommercialsUseCase(advertiserCommercialRepository)
}
import { AdvertiserCommercialsRepositoryDatabase } from "../../../repositories/postgres";
import { UserRepositoryDatabase } from "../../../repositories/postgres"
import { UpdateAdvertiserCommercialsUseCase } from "../updateAdvertiserCommercials";
export const makeUpdateAdvertiserCommercials = () => {
    const userRepository = new UserRepositoryDatabase()
    const advertiserCommercialRepository = new AdvertiserCommercialsRepositoryDatabase()
    return new UpdateAdvertiserCommercialsUseCase(userRepository, advertiserCommercialRepository)
}
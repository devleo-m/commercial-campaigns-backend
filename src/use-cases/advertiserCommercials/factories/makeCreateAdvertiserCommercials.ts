import { UserRepositoryDatabase } from "../../../repositories/postgres";
import { AdvertiserCommercialsRepositoryDatabase } from "../../../repositories/postgres";
import { CreateAdvertiserCommercialsUseCase } from "../createAdvertiserCommercials";
export const makeCreateAdvertiserCommercials = () => {
    const userRepository = new UserRepositoryDatabase();
    const advertiserCommercialsRepository = new AdvertiserCommercialsRepositoryDatabase()
    return new CreateAdvertiserCommercialsUseCase(userRepository, advertiserCommercialsRepository)
}
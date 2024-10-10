import { UserRepositoryDatabase } from '../../../repositories/postgres'
import { GetByIdUserUseCase } from '../getByIdUser'

export const makeGetByIdUsers = () => {
    const userRepository = new UserRepositoryDatabase()
    return new GetByIdUserUseCase(userRepository)
}
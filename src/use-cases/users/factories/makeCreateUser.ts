import { UserRepositoryDatabase } from '../../../repositories/postgres'
import { CreateUserUseCase } from '../createUser'

export const makeCreateUser = () => {
    const userRepository = new UserRepositoryDatabase()
    return new CreateUserUseCase(userRepository)
}